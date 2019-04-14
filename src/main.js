import Vue from 'vue'

import App from './App.vue'

//按需导入 mint-ui
/* import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button)
Vue.use(Lazyload) */

//按需导入 mintui 实现不了 图片的懒加载效果，需要全部导入
import MintUi from 'mint-ui'
Vue.use(MintUi)

//导入 vue-resource
import VueResource from 'vue-resource'
Vue.use(VueResource)
//获取请求的根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005/'
//全局设置 post 请求发送的表单格式
Vue.http.options.emulateJSON = true

//安装图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

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

//每次进入网站后，获取本地存储中的购物车中的数据，如果不存在则设置为 空数组
const car = JSON.parse(localStorage.getItem('car')) || []

//导入 vuex 并注册
import Vuex from 'vuex'
Vue.use(Vuex)
//创建一个状态管理对象实例
const store = new Vuex.Store({
    state: {
        // car 数组用于存储购物车中商品的数据，数组中为每个商品数据对象，对象的格式如下：
        // { id: 商品的id, count: 商品选中的数量, price: 商品的单价, selected: 商品在购物车中是否被选中 }
        car
    },
    mutations: {
        // 获取购物车中商品信息对象，添加到 car 中
        addToCar(state, goodsinfo) {
            //判断购物车中有没有当前要添加的 商品信息 对象，如果有，则只需要添加数量，如果没有，则将整个商品的信息添加进 car
            //定义一个标识符，查看 some 是否找了的相同的商品
            let flag = false
            state.car.some(item => {
                if (item.id == goodsinfo.id) {
                    item.count += parseInt(goodsinfo.count)
                    return flag = true
                }
            })
            /* for (let item of state.car) {
                if (item.id === goodsinfo.id) {
                    item.count += parseInt(goodsinfo.count)
                    flag = true
                    break
                }
            } */
            if (!flag) {
                //表示在 some 循环中没有查询到 相同的商品信息，则执行添加操作
                state.car.push(goodsinfo)
            }

            //当更新 car 后，把 car 中的数组，存储到本地的 localStorage 中，实现购物车中商品信息的永久存储
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        //购物车中修改商品信息，当商品 id 值匹配的时候，将修改后的 商品数量 直接赋值给 state 中的商品数量
        updateGoodsInfo(state, goodsinfo) {
            state.car.some(item => {
                if (item.id == goodsinfo.id) {
                    item.count = parseInt(goodsinfo.count)
                    return true
                }
            })
            //更新完 购物车 中的数据后，修改 本地存储 中的商品信息
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        //删除购物车中商品，当商品 id 值匹配的时候，通过索引删除该条数据
        removeFormCar(state, id) {
            state.car.some((item, i) => {
                if (item.id == id) {
                    state.car.splice(i, 1)
                    return true
                }
            })
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        //购物车中 修改商品的 选择状态，当商品 id 值匹配的时候，将其对应的 选择状态 取反
        updateGoodsSelected(state, id) {
            state.car.some(item => {
                if (item.id == id) {
                    item.selected = !item.selected
                }
            })
            localStorage.setItem('car', JSON.stringify(state.car))
        }
    },
    getters: {
        //计算 购物车上 徽标数值
        getAllCount(state) {
            let n = 0
            for (let item of state.car) {
                n += item.count
            }
            return n
        },
        //计算 购物车中所有商品的数值
        getGoodsCount(state) {
            //创建一个空对象，然后循环购物车中所有商品的数据，把当前循环这条商品的 id ，作为对象的属性名，count 值作为对象的属性值，这样把所有的商品循环一遍，就可以拼接出一个商品 id 和 count 值的一个映射
            const o = {}
            state.car.forEach(item => o[item.id] = item.count)
            return o
        },
        //设置商品的选中状态
        getGoodsSelected(state) {
            //与计算商品的数值一致，遍历购物车中所有的商品，拼接出一个 商品 id 和 商品选中属性的映射
            const o = {}
            state.car.forEach(item => o[item.id] = item.selected)
            return o
        },
        //动态计算 商品总价
        getGoodsCountAndAmount(state) {
            const o = {
                count: 0,  //商品数
                amount: 0  //总价
            }
            //循环遍历商品信息，当该商品被选中时，增加 商品数 和 总价
            state.car.forEach(item => {
                if (item.selected) {
                    o.count += item.count
                    o.amount += item.price * item.count
                }  
            })
            return o
        }
    }
})

const vm = new Vue({
    el: '#app',
    render: h => h(App),
    router,
    store
})