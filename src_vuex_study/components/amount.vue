<template>
  <div>
    <!-- <h3> 当前数量为：{{ $store.state.count }}</h3> -->
    <!-- 使用 getter 中的方法输出数据 -->
    <h3> 当前数量为：{{ $store.getters.optCount }}</h3>
  </div>
</template>

<script>

</script>

<style lang="scss" scoped>
</style>
