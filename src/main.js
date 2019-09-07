// 入口文件
import Vue from 'vue'
//导入路由
import VueRouter from 'vue-router'
// 1.2 安装路由
Vue.use(VueRouter)

// 注册Vuex
import Vuex from 'vuex'
Vue.use(Vuex)

//每次刚进入网站，调用main.js ，在刚调用的时候，从本地存储中，读取购物车的数据
let car = JSON.parse(localStorage.getItem('car') || '[]');

let store = new Vuex.Store({
  state: {
    car: car  //保存购物车的商品数据,在car中存储商品对象 {id:    ,  count:  , price:   ,selected: true or false}
  },
  mutations: {
    addToCar(state, goods) {
      //点击加入购物车，将商品信息保存到store中的car数组中
      //1. 如果购物车中，有选择的对应的商品，只需要更新数量
      //2. 如果没有，直接把商品数据push到car中

      let flag = false;
      state.car.some(item => {   //判断是否存在商品id
        if (item.id == goods.id) {
          item.count += parseInt(goods.count);
          flag = true;
          return true;
        }
      });

      //判断flag的值，确定是否push  goods
      if (flag == false) {
        state.car.push(goods);
      }
      //当更新car之后，把car数组，存储到本地的localStorage中
      localStorage.setItem('car', JSON.stringify(state.car));
    },
    updateGoodsInfo(state, goods) {
      state.car.some(item => {
        if (item.id == goods.id) {
          item.count = parseInt(goods.count);
          return true;
        }
      });
      //当更新car之后，把car数组，存储到本地的localStorage中
      localStorage.setItem('car', JSON.stringify(state.car));
    },
    removeFromCar(state, id) {
      //根据id，从store中删除对应商品
      state.car.some((item, index) => {
        if (item.id == id) {
          state.car.splice(index, 1);
          return true;
        }
      });
      // 将删除完毕后的数据进行同步
      localStorage.setItem('car', JSON.stringify(state.car));
    },
    updateGoodsSelected(state, info) {
      state.car.some(item => {
        if (item.id == info.id) {
          item.selected = info.selected;
        }
      });
      // 把最新的购物车商品的状态保存到store中
      localStorage.setItem('car', JSON.stringify(state.car));
    }
  },
  getters: {
    //相当于计算属性 
    getAllCount(state) {
      let c = 0;
      state.car.forEach(item => {
        c += item.count;
      });
      return c;
    },
    getGoodsCount(state) {
      // 返回对象，得到相应的商品数量
      let o = {};
      state.car.forEach(item => {
        o[item.id] = item.count;
      });
      return o;
    },
    getGoodsSelected(state) {
      let o = {};
      state.car.forEach(item => {
        o[item.id] = item.selected;
      });
      return o;
    },
    getGoodsCountAndAmount(state) {
      let o = {
        count: 0,  //勾选数量
        amount: 0 //勾选总价
      };
      state.car.forEach(item => {
        if (item.selected) {
          o.count += item.count;
          o.amount += item.price * item.count;
        }
      });
      return o;
    }
  }
})


// 导入格式化时间的插件
import moment from 'moment'
// 定义全局的过滤器
Vue.filter('dateFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(dataStr).format(pattern)
})

// 导入Mint-UI
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)
//导入MUI样式
import './lib/mui/css/mui.min.css'
// 导入扩展图标样式
import './lib/mui/css/icons-extra.css'

//导入路由
import router from './router.js'
//导入vue-resource
import vueResource from 'vue-resource'
Vue.use(vueResource)

//设置请求根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005';
//设置全局post时候，表单数据格式组织形式
Vue.http.options.emulateJSON = true;

//安装图片预览插件
import VuePreview from 'vue-preview'

// defalut install
Vue.use(VuePreview)

//导入App.vue
import app from './App.vue'

let vm = new Vue({
  el: '#app',
  data: {},
  render: c => c(app),
  router,
  store  //挂在store状态管理对象
})