<template>
  <div class="mui-numbox" data-numbox-min="1" data-numbox-max="9" style="height: 25px;">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input
      id="test"
      class="mui-input-numbox"
      type="number"
      :value="initcount"
      @change="countChanged"
      ref="numbox"
      readonly
    />
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>
<script>
import mui from "../../lib/mui/js/mui.min.js";
export default {
  mounted() {
    //初始化数字选择框
    mui(".mui-numbox").numbox();
  },
  methods: {
    //每当文本框的数据被修改的时候，立即把最新的数据传递给父组件
    // 数量改变了，每当数值改变，则立即把最新的数量同步到购物车store中， 覆盖之前的数量值
    countChanged() {
      this.$store.commit("updateGoodsInfo", {
        id: this.goodsid,
        count: this.$refs.numbox.value
      });   
    }
  },
  props: ["initcount", "goodsid"]
};
</script>
<style lang="scss">
</style>