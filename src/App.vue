<template>
  <div class="app-container">
    <!-- header  -->
    <mt-header fixed title="小小小界面">
      <span slot="left" @click="goBack" v-show="flag">
        <mt-button icon="back">返回</mt-button>
      </span>
    </mt-header>

    <!-- router-view区域 -->
    <transition>
      <router-view></router-view>
    </transition>

    <!-- tabber -->
    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item-new" to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-item-new" to="/member">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link class="mui-tab-item-new" to="/shopcar">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge" id="badge">{{ $store.getters.getAllCount }}</span>
        </span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-item-new" to="/search">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>
    <!-- <h1>这是 App 组件</h1> -->
  </div>
</template>

<script>
export default {
  data(){
    return {
      flag: false
    }
  },
  created(){
    this.falg = this.$route.path ==='/home'?false:true;
  },
  methods:{
    goBack(){
      this.$router.go(-1);
    }
  },
  watch:{
    '$route.path':function(newVal){
      if(newVal=='/home'){
        this.flag = false;
      }else{
        this.flag = true;
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.mint-header {
  z-index: 999;
}
.app-container {
  padding-top: 40px;
  padding-bottom: 50px;
  overflow-x: hidden;
}
.v-enter {
  opacity: 0;
  transform: translateX(100%);
}
.v-leave-to {
  opacity: 0;
  position: absolute;
  transform: translateX(-100%);
}
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}
</style>
