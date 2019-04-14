<template>
    <div>
		<!-- 轮播图 -->
		<!-- 使用分离出去的 轮播图 组件 -->
		<swiper :lunbotuList="lunbotuList" :isfull="true"></swiper>

		<!-- 六宫格 -->
		<ul class="mui-table-view mui-grid-view mui-grid-9">
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
				<router-link to="/home/newslist">
					<img src="../../images/menu1.png" alt="">
					<div class="mui-media-body">新闻资讯</div>
				</router-link>
			</li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
				<router-link to="/home/photolist">
					<img src="../../images/menu2.png" alt="">
					<div class="mui-media-body">图片分享</div>
				</router-link>
			</li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
				<router-link to="/home/goodslist">
					<img src="../../images/menu3.png" alt="">
					<div class="mui-media-body">商品购物</div>
				</router-link>
			</li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
				<img src="../../images/menu4.png" alt="">
				<div class="mui-media-body">留言反馈</div></a>
			</li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
				<img src="../../images/menu5.png" alt="">
				<div class="mui-media-body">视频专区</div></a>
			</li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
				<img src="../../images/menu6.png" alt="">
				<div class="mui-media-body">联系我们</div></a>
			</li>
		</ul> 
    </div>
</template>
<script>
import { Toast } from 'mint-ui'
//导入抽离出去的 轮播图 组件
import Swiper from '../subcomponents/Swiper.vue'
export default {
	created () {
		this.getLunbotu()
	},
	data () {
		return {
			lunbotuList: []
		}
	},
	methods: {
		getLunbotu () {
			this.$http.get('api/getlunbo').then(res => {
				if (res.body.status === 0) {
					//Toast('加载轮播图成功')
					//console.log(res.body.message)
					this.lunbotuList = res.body.message
				} else {
					Toast('加载轮播图失败')
				}
			})
		}
	},
	components: {
		Swiper
	}
}
</script>
<style lang="scss" scoped>
	.mui-grid-view.mui-grid-9 {
		background-color: #fff;
		border: none;
		.mui-table-view-cell {
			border: none;
			img {
				width: 60px;
				height: 60px;
			}
		}
	}
</style>