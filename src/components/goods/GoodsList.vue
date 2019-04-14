<template>
    <div class="goods-list">
        <!-- 
            在网页中，有两种跳转的方式
            方式一：使用 a 标签的形式叫做 标签跳转
            方式二：使用 window.location.href 的形式，叫做 编程式导航
         -->
        <div class="goods-item" v-for="item in goodlist" :key="item.id" @click="goDetail(item.id)">
            <img :src="item.img_url" alt>
            <h1 class="title">{{ item.title }}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">&yen;{{ item.sell_price }}</span>
                    <span class="old">&yen;{{ item.market_price }}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{ item.stock_quantity }}件</span>
                </p>
            </div>
        </div>

        <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
    </div>
</template>
<script>
import { Toast } from 'mint-ui'
export default {
    //给组件命名，方便调试
    name: 'Goodlist',
    created () {
        this.getGoodsList()
    },
    data() {
        return {
            pageindex: 1,  //分页的页数
            goodlist: []  //存储商品列表
        };
    },
    methods: {
        getGoodsList() {
            this.$http.get('api/getgoods?pageindex=' + this.pageindex).then(res => {
                //console.log(res.body)
                if (res.body.status === 0) {
                    //this.goodlist = res.body.message
                    if (res.body.message.length === 0) {
                        Toast('没有更多数据了！')
                        return
                    }
                    this.goodlist = [...this.goodlist, ...res.body.message]
                } else {
                    Toast('加载商品列表信息失败！')
                }
            })
        },
        getMore() {
            this.pageindex++
            this.getGoodsList()
        },
        //进行 编程式导航
        goDetail(id) {
            //console.log(this)
            //使用 js 的形式实现路由跳转

            //有以下三种方法：
            //传递 字符串
            this.$router.push('/home/goodsinfo/' + id)
            //传递 对象
            //this.$router.push({path: '/home/goodsinfo/' + id})
            //传递 命名路由 需要在 router.js 给对应的路由规则指定 name 属性进行命名
            //this.$router.push({name: 'goodsinfo', pramas: {id}})
        }
    }
};
</script>
<style lang="scss" scoped>
    .goods-list{
        display:flex;
        flex-wrap:wrap;
        padding:7px;
        justify-content: space-between;
    }
    .goods-item{
        width:49%;
        border:1px solid #ccc;
        box-shadow: 0 0 8px #ccc;
        margin:4px 0;
        padding:2px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height:229px;
        img{
            width:100%;
        }
        .title{
            font-size: 14px;
        }
        .info{
            background: #eee;
            p{
                margin:0;
                padding:5px;
                .now{
                    color: red;
                    font-weight: bold;
                    font-size: 16px;
                }
                .old{
                    text-decoration: line-through;
                }
            }
        }
    }
</style>