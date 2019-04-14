<template>
    <div class="goodsinfo-container">
		<!-- 商品轮播图区域 -->
		<swiper :lunbotuList="lunbotuList" :isfull="false"></swiper>


		<!-- 商品购买区域 -->
		<div class="mui-card">
			<div class="mui-card-header">{{ goodsinfo.title }}</div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<p class="price">
						市场价：<del>&yen;{{ goodsinfo.market_price }}</del>&nbsp;&nbsp;
						销售价：<span class="now_price">&yen;{{ goodsinfo.sell_price }}</span>
					</p>
					<!-- 获取子组件传递过来的 当前选择数量
					向子组件传递值 最大选择数量 -->
					<p>购买数量：<num-box @getCount="getSelectedCount" :maxCount="goodsinfo.stock_quantity"></num-box></p>
					<p>
						<mt-button type="primary" size="small">立即购买</mt-button>
						<mt-button type="danger" size="small" @click="addToShopcar">加入购物车</mt-button>
					</p>
				</div>
			</div>
		</div>


		<!-- 商品参数区域 -->
		<div class="mui-card">
			<div class="mui-card-header">商品参数</div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<p>商品货号：{{ goodsinfo.goods_no }}</p>
					<p>库存情况：{{ goodsinfo.stock_quantity }}</p>
					<p>上架时间：{{ goodsinfo.add_time | dateFormat }}</p>
				</div>
			</div>
			<div class="mui-card-footer">
				<mt-button type="primary" size="large" plain @click="goDesc(goodsinfo.id)">图文介绍</mt-button>
          		<mt-button type="danger" size="large" plain @click="goComment(goodsinfo.id)">商品评论</mt-button>
			</div>
		</div>

		<!-- 加入购物车的小球动画 -->
		<transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
			<div class="ball" v-show="ballFlag" ref="ball"></div>
		</transition>
   </div>
</template>
<script>
//导入 轮播图 组件
import Swiper from '../subcomponents/Swiper.vue'
//导入 数字选择框 组件
import NumBox from '../subcomponents/GoodsInfoNumBox.vue'
export default {
	name: 'GoodsInfo',
	created () {
		this.getLunbotu()
		this.getGoodsInfo()
	},
	data () {
		return {
			id: this.$route.params.id,
			lunbotuList: [],  //轮播图数据
			goodsinfo: {},  //商品的数据
			ballFlag: false,  //控制小球显示和隐藏的标识符
			selectedCount: 1  //保存用户选中的商品数量
		}
	},
	methods: {
		getLunbotu() {
			this.$http.get('api/getthumimages/' + this.id).then(res => {
				if (res.body.status === 0) {
					//包装一下获取到是数据
					res.body.message.forEach(item => {
						item.img = item.src
					})
					this.lunbotuList = res.body.message
				}
			})
		},
		getGoodsInfo() {
			this.$http.get('api/goods/getinfo/' + this.id).then(res => {
				if (res.body.status === 0) {
					this.goodsinfo = res.body.message[0]
				}
			})
		},
		goDesc(id) {
			this.$router.push({name: 'goodsdesc', params: {id}})
		},
		goComment(id) {
			this.$router.push({name: 'goodscomments', params: {id}})
		},
		addToShopcar() {
			this.ballFlag = !this.ballFlag
			
			//点击加入购物车后，拼接出一个对象，保存到 store 中，对象的格式如下：
        	// { id: 商品的id, count: 商品选中的数量, price: 商品的单价, selected: 商品在购物车中是否被选中 }
			const goodsinfo = {
				id: this.id,
				count: this.selectedCount,
				price: this.goodsinfo.sell_price,
				selected: true
			}
			this.$store.commit('addToCar', goodsinfo)
		},
		beforeEnter(el) {
			el.style.transform = 'translate(0, 0)'
		},
		enter(el, done) {
			// 动态获取各个分辨率下 小球的位置 和 购物车小图标 的位置
			const ballPosition = this.$refs.ball.getBoundingClientRect()
			const badgePosition = document.querySelector('#badge').getBoundingClientRect()
			// 通过两个位置的横纵坐标的差值，计算出 小球动画 应该移动的距离
			const x = badgePosition.left - ballPosition.left
			const y = badgePosition.top - ballPosition.top
			el.offsetWidth
			el.style.transform = `translate(${x}px, ${y}px)`
			el.style.transition = 'all .8s cubic-bezier(.05, .52, .44, 1.03)'
			done()
		},
		afterEnter(el) {
			this.ballFlag = !this.ballFlag
		},
		getSelectedCount(count) {
			this.selectedCount = count
			//console.log(this.selectedCount)
		}
	},
	components: {
		Swiper,
		NumBox
	}
}
</script>
<style lang="scss" scoped>
	.goodsinfo-container {
		background-color: #eee;
		overflow: hidden;
		.now_price {
			color: red;
			font-size: 16px;
			font-weight: bold;
		}
	}
	.mui-card-footer {
		display: block;
		button {
			margin: 15px 0;
		}
	}
	.ball {
		position: absolute;
		top: 351px;
		left: 148px;
		width: 15px;
		height: 15px;
		background-color: red;
		border-radius: 50%;
		z-index: 99;
	}
</style>
<style lang="scss">
	//处理 可能的 轮播图播放时 ，下面盒子的抖动问题
	/* .mint-swipe-item{
		-webkit-backface-visibility: hidden;
		backface-visibility: hidden;
	}
	div{
		-webkit-transform: translate3d(0, 0, 0);
		transform: translate3d(0, 0, 0);
	} */
</style>