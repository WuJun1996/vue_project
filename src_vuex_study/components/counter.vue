<template>
  <div>
    <input type="button" value="减少" @click="remove">
    <input type="button" value="增加" @click="add">
    <br>
    <!-- 数据双向绑定到 vuex 中的数据 -->
    <input type="text" v-model="$store.state.count">
  </div>
</template>

<script>
//按需引入 mapMutations

export default {
  data() {
    return {
      //count: 0
    };
  },
  methods: {
    add() {
      //在组件中通过 commit 来调用 mutations 中的方法
      //commit 方法的第二个参数 为 传递到 vuex 中的参数，且只有一个，如要传多个参数，可以以数组或对象的形式
      this.$store.commit('increment')
    },
    remove(){
      this.$store.commit('decrement', {a: 1, b: 2})
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
