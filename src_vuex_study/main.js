// 入口文件
import Vue from 'vue'
// 配置vuex的步骤
// 1. 运行 cnpm i vuex -S 
// 2. 导入包

// 总结：
// 1. state中的数据，不能直接修改，如果想要修改，必须通过 mutations
// 2. 如果组件想要直接 从 state 上获取数据： 需要 this.$store.state.***
// 3. 如果 组件，想要修改数据，必须使用 mutations 提供的方法，需要通过 this.$store.commit('方法的名称'， 唯一的一个参数)
// 4. 如果 store 中 state 上的数据， 在对外提供的时候，需要做一层包装，那么 ，推荐使用 getters, 如果需要使用 getters ,则用 this.$store.getters.***

//导入 Vuex 
import Vuex from 'vuex'
Vue.use(Vuex)

//创建一个 veux 实例
const store = new Vuex.Store({
  state: {
    count: 0
  },
  //注意：如果要操作 state 中的值，需要通过调用 mutations 中定义的方法，来操作 state 中的数据，而不要直接操作 state 中的数据，这样可以防止万一数据紊乱了，无法快速定位到错误的原因
  mutations: {
    //mutations 中的定义的方法的第一个形参则为 state
    //在组件中要通过 commit 来调用该方法
    increment(state) {
      state.count++
    },
    // 第二个参数可以接受传递过来的参数，依照需求可以为一个参数，一个数组或一个对象
    decrement(state, options) {
      state.count -= (options.a + options.b)
    }
  },
  getters: {
    // getters 只负责对外提供数据，而不负责修改数据
    // getters 的作用有点类似于 过滤器 ，只负责把数据进行一层封装，提供给调用者
    // getters 的作用也和 computed 比较像，内部为函数，函数内返回值的形式，函数的第一个参数始终为 state，如果该函数内使用的 state 中的数据改变了，会立即触发当前函数，重新求值
    optCount (state) {
      return '当前最新的 count 值是：' + state.count
    }
  }
})



import App from './App.vue'

const vm = new Vue({
  el: '#app',
  render: c => c(App),
  //在 当前 vue 实例上注册 vuex 的 store 实例
  store
})