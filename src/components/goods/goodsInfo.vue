<template>
  <div class="goodsinfo-container">
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>
    <!-- 商品轮播图区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :lunbotuList="lunbotu" :isfull="false"></swiper>
        </div>
      </div>
    </div>

    <!-- 商品购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">{{goodsinfo.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="pri">
            市场价：
            <del>￥ {{goodsinfo.market_price}}</del>&nbsp;&nbsp;销售价：
            <span class="now_price">￥ {{goodsinfo.sell_price}}</span>
          </p>
          <p>
            购买数量：
            <numbox @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox>
          </p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>

            <!-- 如何实现加入购物车之后，拿到选择的数量
                    1. 按钮属于goodsinfo页面， 数字属于numbox组件
                    2. 由于涉及到了父子组件的嵌套，无法直接在goodsinfo页面中，获取选择框里面的值
                    3. 涉及到了子组件想父组件传值（事件调用机制）
            4. 事件调用的本质：父向子传递方法，子调用这个方法-->
          </p>
        </div>
      </div>
    </div>

    <!-- 商品参数区域 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{goodsinfo.goods_no}}</p>
          <p>库存情况：{{goodsinfo.stock_quantity}} 件</p>
          <p>上架时间：{{goodsinfo.add_time | dateFormat}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="goComments(id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import swiper from "../subcomponents/swiper.vue";
import numbox from "../subcomponents/goodsInfo_numbox.vue";

export default {
  data() {
    return {
      id: this.$route.params.id, //路由参数对象id
      lunbotu: [],
      goodsinfo: {}, //获取到的商品信息
      ballFlag: false, //控制小球隐藏和显示
      selectedCount: 1 //保存用户选中的商品数量，默认为1
    };
  },
  created() {
    this.getLunbotu();
    this.getGoodsInfo();
  },
  methods: {
    getLunbotu() {
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        if (result.body.status === 0) {
          //先循环轮播图数组中每一项，Wieitem添加img属性，轮播图组件只认识item.img
          result.body.message.forEach(item => {
            item.img = item.src;
          });

          this.lunbotu = result.body.message;
        }
      });
    },
    getGoodsInfo() {
      this.$http.get("api/goods/getinfo/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.goodsinfo = result.body.message[0];
        }
      });
    },
    goDesc(id) {
      //点击使用编程式导航跳转图文介绍页面
      this.$router.push({ name: "goodsdesc", params: { id } });
    },
    goComments(id) {
      //点击跳转评论页面
      this.$router.push({ name: "goodscomment", params: { id } });
    },
    addToShopCar() {
      //添加到购物车
      this.ballFlag = !this.ballFlag;
      //拼接出一个保存到store中car数组的商品信息对象
      let goods = {
        id: this.id,
        count: this.selectedCount,
        price: this.goodsinfo.sell_price,
        selected: true
      };
      //调用store中 mutations 中的方法，将商品加入购物车
      this.$store.commit("addToCar", goods);
    },
    beforeEnter(el) {
      el.style.transform = "translate(0,0)";
    },
    enter(el, done) {
      el.offsetWidth;

      // 小球动画优化思路
      // 1. 分析动画不准确的原因，小球最终位移的位置固定，已经局限在了某一分辨率滚动条
      // 未动的情况下
      // 2. 分辨率和测试的不一样，问题就会出现
      // 3. 不能把位移的距离(横纵坐标)写死,应该根据不同情况，计算这个坐标值

      // 解题思路：
      // 先得到徽标的横纵坐标，字啊得到小球的横纵坐标，分别让x、y值求差，得到的结果
      // 即为移动的距离
      //   domObject.getBoudingClientRect()

      // 获取小球在页面的位置
      const ballPosition = this.$refs.ball.getBoundingClientRect();
      // 获取徽标在页面的位置
      const badgePosition = document
        .getElementById("badge")
        .getBoundingClientRect();

      const xDist = badgePosition.left - ballPosition.left;
      const yDist = badgePosition.top - ballPosition.top;

      el.style.transform = `translate(${xDist}px,${yDist}px)`;
      el.style.transition = "all .3s cubic-bezier(.17,.67,.83,.67)";
      done();
    },
    afterEnter(el) {
      this.ballFlag = !this.ballFlag;
    },
    getSelectedCount(count) {
      this.selectedCount = count;
    }
  },
  components: {
    swiper,
    numbox
  }
};
</script>

<style lang="scss" scoped>
.goodsinfo-container {
  background-color: #eee;
  overflow: hidden;
  .now_price {
    color: red;
  }
  .mui-card-footer {
    display: block;
    button {
      margin: 10px 0;
    }
  }
  .ball {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    z-index: 99;
    left: 146px;
    top: 390px;
  }
}
</style>