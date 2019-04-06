import VueRouter from 'vue-router'

//导入 组件
import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'

//创建路由对象并注册路由和修改默认高亮类
var router = new VueRouter({
    routes: [
        {path: '/home', component: HomeContainer},
        {path: '/member', component: MemberContainer},
        {path: '/shopcar', component: ShopcarContainer},
        {path: '/search', component: SearchContainer}
    ],
    linkActiveClass: 'mui-active'  //覆盖默认的高亮类为 mui 的高亮类
})

export default router