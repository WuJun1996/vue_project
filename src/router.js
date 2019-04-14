import VueRouter from 'vue-router'

//导入 组件
import HomeContainer from './components/tabbar/HomeContainer.vue'
// import MemberContainer from './components/tabbar/MemberContainer.vue'
// import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
// import SearchContainer from './components/tabbar/SearchContainer.vue'
// import NewsList from './components/news/NewsList.vue'
// import NewsInfo from './components/news/NewsInfo.vue'
// import PhotoList from './components/photo/PhotoList.vue'
// import PhotoInfo from './components/photo/PhotoInfo.vue'
// import GoodsList from './components/goods/GoodsList.vue'
// import GoodsInfo from './components/goods/GoodsInfo.vue'
// import GoodsDesc from './components/goods/GoodsDesc.vue'
// import GoodsComments from './components/goods/GoodsComments.vue'

//实现路由懒加载
//创建路由对象并注册路由和修改默认高亮类
var router = new VueRouter({
    routes: [
        {path: '/', redirect: '/home'},
        {path: '/home', component: HomeContainer},
        {path: '/member', component: () => import('./components/tabbar/MemberContainer.vue')},
        {path: '/shopcar', component: () => import('./components/tabbar/ShopcarContainer.vue')},
        {path: '/search', component: () => import('./components/tabbar/SearchContainer.vue')},
        {path: '/home/newslist', component: () => import('./components/news/NewsList.vue')},
        {path: '/home/newsinfo/:id', component: () => import('./components/news/NewsInfo.vue')},
        {path: '/home/photolist', component: () => import('./components/photo/PhotoList.vue')},
        {path: '/home/photoinfo/:id', component: () => import('./components/photo/PhotoInfo.vue')},
        {path: '/home/goodslist', component: () => import('./components/goods/GoodsList.vue')},
        // 实现 命名路由 跳转 
        {path: '/home/goodsinfo/:id', component: () => import('./components/goods/GoodsInfo.vue')},
        {path: '/home/goodsdesc/:id', component: () => import('./components/goods/GoodsDesc.vue')},
        {path: '/home/goodscomments/:id', component: () => import('./components/goods/GoodsComments.vue')}
    ],
    linkActiveClass: 'mui-active'  //覆盖默认的高亮类为 mui 的高亮类
})

export default router