<template>
  <div class="shopcar-container">
    <!-- 商品列表区域 -->
    <div class="goods-list">
      <div class="mui-card" v-for="(item,index) in goodslist" :key="index">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch v-model="$store.getters.getGoodsSelected[item.id]"
            @change="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
            <img :src="item.thumb_path" alt />
            <div class="info">
              <h1>{{ item.title }}</h1>
              <p>
                <span class="price">￥{{ item.sell_price }}</span>
                <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
                <!-- 如何从购物车总获取商品的数量
                1. 县创建一个空对象，然后循环购物车中所有商品的数据，把当前循环该商品的id，
                作为对象的属性名，count值作为对象的属性值，把所有商品循环一遍，就会得到一个对象
                {id: count}-->
                <a href @click.prevent="remove(item.id,index)">删除</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 结算区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner jiesuan">
          <div class="left">
            <p>总计（不含运费）</p>
            <p>
              已勾选商品
              <span class="red">{{$store.getters.getGoodsCountAndAmount.count}}</span> 件，总价 ￥
              <span class="red">{{$store.getters.getGoodsCountAndAmount.amount}}</span>
            </p>
          </div>
          <mt-button type="danger">去结算</mt-button>
        </div>
      </div>
    </div>
    
  </div>
</template>
<script>
import numbox from "../subcomponents/shopcar_numberbox.vue";

export default {
  data() {
    return {
      goodslist: [] //所有商品的数组
    };
  },
  created() {
    this.getAllGoodsList();
  },
  methods: {
    getAllGoodsList() {
      //   获取store中所有商品的id，拼接处一个，用逗号分隔的字符串
      let idArr = [];
      this.$store.state.car.forEach(item => idArr.push(item.id));
      // 如果购物车中没有商品，则不需要请求数据接口
      if (idArr.length <= 0) {
        return;
      }
      //获取商品列表
      this.$http.get("api/goods/getshopcarlist/" + idArr.join(",")).then(rs => {
        if (rs.body.status === 0) {
          this.goodslist = rs.body.message;
        }
      });
    },
    remove(id, index) {
      // 点击删除，把商品从store中删除，同时把当前组件goodslist中，对应的商品通过index删除
      this.goodslist.splice(index);
      this.$store.commit("removeFromCar", id);
    },
    selectedChanged(id,val){
        //每当点击开关，把最新的开关状态，同步到store中
        // console.log(id+"----"+val)
        this.$store.commit('updateGoodsSelected',{id,selected: val});
    }
  },

  components: {
    numbox
  }
};
</script>
<style lang="scss">
.shopcar-container {
  background-color: #eee;
  overflow: hidden;
  .goods-list {
    .mui-card-content-inner {
      display: flex;
      align-items: center;
      padding: 10px;
    }
    img {
      width: 60px;
      height: 60px;
    }
    h1 {
      font-size: 13px;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-left: 5px;
      .price {
        color: red;
        font-weight: bold;
      }
    }
  }
  .jiesuan {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .red {
      color: red;
      font-weight: bold;
      font-size: 16px;
    }
  }
}
</style>