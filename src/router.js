import VueRouter from 'vue-router'
//导入路由组件
import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import ShopCar from './components/tabbar/ShopCar.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import newsList from './components/news/newsList.vue'
import newsInfo from './components/news/newsInfo.vue'
import photoList from './components/photos/photoList.vue'
import photoInfo from './components/photos/photoInfo.vue'
import goodsList from './components/goods/goodsList.vue'
import goodsInfo from './components/goods/goodsInfo.vue'
import goodsDesc from './components/goods/goodsDesc.vue'
import goodsComment from './components/goods/goodsComment.vue'

// 3. 创建路由对象
var router = new VueRouter({
  routes: [ //配置路由规则
    { path: '/', redirect: '/home' },
    { path: '/home', component: HomeContainer },
    { path: '/member', component: MemberContainer },
    { path: '/shopcar', component: ShopCar },
    { path: '/search', component: SearchContainer },
    { path: '/home/newsList', component: newsList },
    { path: '/home/newsinfo/:id', component: newsInfo },
    { path: '/home/photoList', component: photoList },
    { path: '/home/photoInfo/:id', component: photoInfo },
    { path: '/home/goodslist', component: goodsList },
    { path: '/home/goodsinfo/:id', component: goodsInfo },
    {path: '/hoem/goodsdesc/:id',component: goodsDesc,name:"goodsdesc"},
    {path: '/home/goodsComment/:id',component: goodsComment,name: "goodscomment"}
  ],
  linkActiveClass: 'mui-active' //覆盖默认的路由高亮类
})

// 把路由对象暴露出去
export default router