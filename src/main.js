import Vue from 'vue'

import App from './App.vue'

//按需导入 mint-ui
import { Header } from 'mint-ui'
Vue.component(Header.name, Header)

//导入 mui
import './lib/mui/css/mui.min.css'

const vm = new Vue({
    el: '#app',
    render: h => h(App)
})