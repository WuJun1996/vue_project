<template>
    <!-- 由于我们不知道什么时候 maxCount 可用(因为这个值是父组件通过 Ajax 请求异步获取的)，所以我们只能通过 watch 监听这个值什么时候可用，然后通过 mintui 的 numbox 插件 的 js 代码来给 当前数值选择框 设置 max 属性 -->
    <div class="mui-numbox" data-numbox-min='1'> <!-- :data-numbox-max='maxCount' -->
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged" ref="numBox"/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>
<script>
import mui from '../../lib/mui/js/mui.min.js'
export default {
    name: 'GoodsInfoNumBox',
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
            //console.log(this.$refs.numBox.value)
            this.$emit('getCount', parseInt(this.$refs.numBox.value))
        }
    },
    //获取父组件传递过来的 最大选择数量
    props: ['maxCount'],
    watch: {
        //监视 父组件 传递过来的 maxCount 值，什么时候可用
        maxCount (newVal) {
            //通过 js 代码的方式给数值选择框添加 max 属性
            mui('.mui-numbox').numbox().setOption('max', newVal)
        }
    }
}
</script>
<style lang="scss" scoped>
</style>