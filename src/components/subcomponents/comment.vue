<template>
  <div class="cmt-container">
    <h3>发表评论</h3>
    <hr />
    <textarea placeholder="请输入要BB的内容(最多120字)" maxlength="120" v-model="msg"></textarea>
    <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>

    <div class="cmt-list">
      <div class="cmt-item" v-for="(item,index) in comments" :key="index">
        <div
          class="cmt-title"
        >第{{index+1}}楼 用户：{{item.user_name}} 发表时间: {{item.add_time| dateFormat}}</div>
        <div class="cmt-body">{{item.content ==='undefined'? '此用户很懒':item.content }}</div>
      </div>
    </div>
    <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      pageIndex: 1, //默认展示第一页数据
      comments: [], //所有的评论数据
      msg: ""  //评论输入的内容
    };
  },
  created() {
    this.getComments();
  },
  methods: {
    getComments() {
      this.$http
        .get("api/getcomments/" + this.id + "?pageindex=" + this.pageIndex)
        .then(result => {
          if (result.body.status === 0) {
            this.comments = this.comments.concat(result.body.message); //每当获取新评论时，不会覆盖之前数据
          } else {
            Toast("获取评论失败");
          }
        });
    },
    getMore() {
      this.pageIndex++;
      this.getComments();
    },
    postComment() {
      if (this.msg.trim().length === 0) {
        return Toast("评论内容不能为空!");
      }
      this.$http
        .post("api/postcomment/" + this.$route.params.id , { content: this.msg.trim() })
        .then(result => {
          if (result.body.status === 0) {
            //拼接一个评论对象
            let cmt = {
              user_name: "匿名用户",
              add_time: Date.now(),
              content: this.msg.trim()
            };
            this.comments.unshift(cmt);
            this.msg = "";
          } else {
            Toast("评论失败");
          }
        });
    },
  },
  props: ["id"]
};
</script>

<style lang="scss">
.cmt-container {
  h3 {
    font-size: 18px;
  }
  textarea {
    font-size: 14px;
    height: 85px;
    margin: 0;
  }
  .cmt-list {
    margin: 5px 0;
    .cmt-item {
      font-size: 13px;
      .cmt-title {
        line-height: 30px;
        background-color: #ccc;
      }
      .cmt-body {
        line-height: 35px;
        text-indent: 2em;
      }
    }
  }
}
</style>