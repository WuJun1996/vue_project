<template>
    <div>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
                <router-link :to="'/home/newsinfo/' + item.id">
                    <img class="mui-media-object mui-pull-left" src="../../images/menu1.png">
                    <div class="mui-media-body">
                        <h3>{{ item.title }}</h3>
                        <p class="mui-ellipsis">
                            <span>发表时间：{{ item.add_time | dateFormat }}</span>
                            <span>点击：{{ item.click }}次</span>
                        </p>
                    </div>
                </router-link>
            </li>
		</ul>
    </div>
</template>
<script>
import { Toast } from 'mint-ui'
export default {
    created () {
        this.getNewsList()
    },
    data () {
        return {
            newsList: []
        }
    },
    methods: {
        getNewsList() {
            this.$http.get('api/getnewslist').then(res => {
                if (res.body.status === 0) {
                    //获取数据成功，将数据存储到 newList 中
                    //console.log(res.body)
                    this.newsList = res.body.message
                } else {
                    Toast('获取新闻列表失败')
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.mui-table-view {
    li {
        h3 {
            font-size: 14px;
        }
        .mui-ellipsis {
            display: flex;
            justify-content: space-between;
            font-size: 12px;
            color: #226aff;
        }
    }
}
</style>