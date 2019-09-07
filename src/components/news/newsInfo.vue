<template>
  <div class="newsinfo-container">
      <!-- 大标题 -->
    <h3 class="title">{{newsinfo.title}}</h3>
    <p class="subtitle">
      <span>{{newsinfo.add_time | dateFormat}}</span>
      <span>点击: {{newsinfo.click}}次</span>
    </p>
    <hr />
    <!-- 内容 -->
    <div class="content" v-html="newsinfo.content"></div>
    <!-- 评论区域 -->
    <comment-box :id="this.id"></comment-box>
  </div>
</template>
<script>
//导入评论子组件
import comment from '../subcomponents/comment.vue'

import { Toast } from "mint-ui";
export default {
  data() {
    return {
      id: this.$route.params.id, //将url传递过来的id值传到data中
      newsinfo: {}
    };
  },
  created() {
    this.getNewsInfo();
  },
  methods: {
    getNewsInfo() {
      //获取新闻详情
      this.$http.get("api/getnew/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.newsinfo = result.body.message[0];
        } else {
          Toast("获取数据失败");
        }
      });
    }
  },
  components:{
      'comment-box': comment
  }
};
</script>
<style lang="scss">
.newsinfo-container {
  padding: 0 4px;
  .title {
    font-size: 16px;
    text-align: center;
    margin: 15px 0;
    color: red;
  }
  .subtitle {
    font-size: 13px;
    color: blue;
    display: flex;
    justify-content: space-between;
  }
}
</style>