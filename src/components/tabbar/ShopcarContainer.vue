<template>
    <div class="shopcar-container">
		<!-- 商品列表区域 -->
		<div class="goods-list">
   			<div class="mui-card" v-for="(item, i) in goodslist" :key="item.id">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<!-- 将 store 中商品的选中属性 和 switch 标签的选中属性进行绑定，并给 switch 设置 change 事件 -->
						<mt-switch v-model="$store.getters.getGoodsSelected[item.id]" @change="selectedChanged(item.id)"></mt-switch>
						<img :src="item.thumb_path" alt="">
						<div class="info">
							<h3>{{ item.title }}</h3>
							<p>
								<span class="price">&yen;{{ item.sell_price }}</span>
								<!-- 将在 vuex 中获取到的商品 id 和对应的商品数量的映射根据当前商品的 id 值传递给子组件 -->
								<!-- 传递当前 商品的 id 传递给子组件，用于修改商品的数量 -->
								<num-box :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></num-box>
								<a href="#" @click.prevent="remove(item.id, i)">删除</a>
							</p>
						</div>
					</div>
				</div>
			</div>
    	</div>
		<!-- 结算区域 -->
        <div class="mui-card">
			<div class="mui-card-content">
				<div class="mui-card-content-inner account">
					<div class="left">
						<p>总计(不含运费)</p>
						<p>
							已勾选商品{{ $store.getters.getGoodsCountAndAmount.count }}件
							<span class="red">总价&yen;{{ $store.getters.getGoodsCountAndAmount.amount }}</span>
						</p>
					</div>
					<mt-button type="danger">去结算</mt-button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import NumBox from '../subcomponents/ShopcarNumBox.vue'
export default {
	created () {
		this.getGoodsList()
	},
	data () {
		return {
			goodslist: []
		}
	},
	methods: {
		getGoodsList() {
			//获取购物车中所有的商品信息，拼接出一个 ids 传递给 后台接口
			const idArr = []
			this.$store.state.car.forEach(item => idArr.push(item.id))
			//判断 是否为空，如为空，则不发送 请求，否则会报错
			if (idArr.length <= 0) {
				return
			}
			this.$http.get('api/goods/getshopcarlist/' + idArr.join(',')).then(res => {
				if (res.body.status === 0) {
					this.goodslist = res.body.message
				}
			})
		},
		//删除商品，删除 goodslist 中对应的数据 和 store 中对应的数据
		remove(id, index) {
			this.goodslist.splice(index, 1)
			this.$store.commit('removeFormCar', id)
		},
		//switch 选中框改变 的事件，参数为当前商品的 id，然后调用 mutations 中的方法，将对应 id 的商品信息的选中状态取反
		selectedChanged(id) {
			//console.log(id --- status)
			this.$store.commit('updateGoodsSelected', id)
		}
	},
	components: {
		NumBox
	}
}
</script>
<style lang="scss" scoped>
	.shopcar-container {
		background-color: #eee;
		overflow: hidden;
		.goods-list {
			.mui-card-content-inner {
				display: flex;
				align-items: center;
			}
			img {
				width: 60px;
				margin: 0 5px;
			}
			h3 {
				font-size: 13px;
			}
			.info {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.price {
					color: red;
					font-weight: bold;
				}
			}
		}
	}
	.account {
		display: flex;
		justify-content: space-between;
		align-items: center;
		.red {
			color: red;
			font-weight: bold;
			font-size: 16px;
		}
	}
</style>