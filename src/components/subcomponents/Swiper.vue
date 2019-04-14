<template>
    <mt-swipe :auto="4000">
        <mt-swipe-item v-for="item in lunbotuList" :key="item.id">
            <!-- 通过类名绑定的显示，依据 isfull 的真假，来给 img 标签添是否加 full 类 -->
            <img :src="item.img" alt="" :class="{full: isfull}">
        </mt-swipe-item>
    </mt-swipe>
</template>
<script>
export default {
    data () {
        return {
        }
    },
    // isfull 是以一个通过调用该 轮播图组件 的父组件传递过来的值，用于控制 轮播图 的宽度是 100%还是自适应
    // 如果是 HomeComtainer.vue 调用该组件，则 isfull 的值为真，如果是 GoodsInfo.vue 调用，则为假
    props: ['lunbotuList', 'isfull']
}
</script>
<style lang="scss" scoped>
    .mint-swipe {
		height: 200px;
		.mint-swipe-item {
            text-align: center;
			img {
                //width: 100%;
                height: 100%;
		    }
		}
	}
    //控制宽度值的类名
    .full {
        width: 100%;
    }
</style>