import Vue from 'vue'

import App from './App.vue'

//按需导入 mint-ui
import { Header, Swipe, SwipeItem } from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)

//导入 vue-resource
import VueResource from 'vue-resource'
Vue.use(VueResource)

//导入 mui
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

//导入 路由 模块
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import router from './router.js'

const vm = new Vue({
    el: '#app',
    render: h => h(App),
    router
})