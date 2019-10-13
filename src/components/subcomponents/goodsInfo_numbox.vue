<template>
    <div class="mui-numbox" data-numbox-min="1" data-numbox-max="9">
      <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
      <input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged" ref="numbox"/>
      <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>
<script>
import mui from '../../lib/mui/js/mui.min.js'
export default {
    mounted(){
        //初始化数字选择框
        mui(".mui-numbox").numbox();
    },
    methods:{
        //每当文本框的数据被修改的时候，立即把最新的数据传递给父组件
        countChanged() {
           // $emit 子组件发生改变，则会调用父组件的相应方法
            this.$emit('getcount',parseInt(this.$refs.numbox.value));
       }
    },
    props: ["max"],
        watch: {
        // 监听事件
        'max': function (newVal, oldVal) {
            //初始化mui，并设置最大值为商品库存量
            mui(".mui-numbox").numbox().setOption('max',newVal);
        }
    }
};
</script>
<style lang="scss">
</style>