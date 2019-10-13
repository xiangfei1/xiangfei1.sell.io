<template>
  <div>
    <!-- 顶部滑动条区域 -->
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            v-for="(item,index) in cates"
            :class="['mui-control-item', item.id==0?'mui-active':'']"
            :key="index"
            @tap="getPhotoList(item.id)"
          >{{item.title}}</a>
        </div>
      </div>
    </div>
    <!-- 图片列表区域 -->
    <ul class="photo-list">
      <router-link v-for="item in list" :key="item.id" :to="'/home/photoInfo/'+item.id" tag="li"> 
        <img v-lazy="item.img_url" />
        <div class="info">
            <div class="info-title">{{item.title}}</div>
            <div class="info-body">{{item.zhaiyao}}</div>
        </div>
      </router-link>
    </ul>
  </div>
</template>
<script>
// 导入mui js文件
import mui from "../../lib/mui/js/mui.min.js";
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      cates: [], //所有分类的列表数组
      list: [] //图片列表数组
    };
  },
  mounted() {
    //当组件中的DOM结构被渲染好，并放到页面中时，会执行该函数
    //   初始化滑动控件
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值 0.0006
    });
  },
  created() {
    this.getAllCategory();
    this.getPhotoList(0); //默认请求所有图片数据
  },
  methods: {
    getAllCategory() {
      //获取所有图片分类
      this.$http.get("api/getimgcategory").then(result => {
        if (result.body.status === 0) {
          result.body.message.unshift({ title: "全部", id: 0 }); //手动拼接完整分类列表
          this.cates = result.body.message;
        } else {
          Toast("获取数据失败");
        }
      });
    },
    getPhotoList(cateId) {
      // 获取图片列表
      this.$http.get("api/getimages/" + cateId).then(result => {
        if (result.body.status === 0) {
          this.list = result.body.message;
        } else {
          Toast("获取数据失败");
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
* {
  touch-action: pan-y;
}

.photo-list {
    list-style: none;
    margin: 0;
    padding: 10px;
    padding-bottom: 0;
  li {
    position: relative;
    background-color: #ccc;
    text-align: center;
    margin-bottom: 10px;
    box-shadow: 0 0 10px #ccc;
    img{
        width: 100%;
        vertical-align: middle
    }
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }
    .info {
        position: absolute;
        bottom: 0px;
        background-color: rgba(0,0,0,.5);
        color: #fff;
        max-height: 84px;
        .info-title{
            font-size: 14px;
        }
        .info-body{
            font-size: 13px;
            text-align: left;
        }
    }
  }
}
</style>