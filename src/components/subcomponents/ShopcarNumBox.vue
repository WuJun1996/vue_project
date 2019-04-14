<template>
    <div class="mui-numbox" data-numbox-min='1'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" :value="initcount" @change="countChanged" ref="numBox" readonly/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>
<script>
import mui from '../../lib/mui/js/mui.min.js'
export default {
    name: 'ShopcarNumBox',
    mounted () {
        //初始化数字选择框组件
        mui('.mui-numbox').numbox()
    },
    data () {
        return {
        }
    },
    methods: {
        countChanged() {
            //每当数量值改变，立即把最新的数量同步到购物车中，调用 store 中的 undateGoodsInfo 方法，并传递一个 对象 作为参数
            //console.log(this.$refs.numBox.value)
            this.$store.commit('updateGoodsInfo', {
                id: this.goodsid,
                count: this.$refs.numBox.value
            })
        }
    },
    //获取父组件传递过来的 商品当前 id 值对应的 商品数量
    props: ['initcount', 'goodsid']
}
</script>
<style lang="scss" scoped>
</style>