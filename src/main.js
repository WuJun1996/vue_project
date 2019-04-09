import Vue from 'vue'

import App from './App.vue'

//按需导入 mint-ui
import { Header, Swipe, SwipeItem, Button } from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button)

//导入 vue-resource
import VueResource from 'vue-resource'
Vue.use(VueResource)
//获取请求的根路径
//Vue.http.options.root = 'http://www.liulongbin.top:3005/'
Vue.http.options.root = 'http://192.168.18.57:3005/'

//导入 mui
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

//导入 路由 模块
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import router from './router.js'

import moment from 'moment'
//定义全局过滤器
Vue.filter('dateFormat', (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') => {
    return moment(dataStr).format(pattern)
}) 

const vm = new Vue({
    el: '#app',
    render: h => h(App),
    router
})