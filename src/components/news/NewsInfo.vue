<template>
    <div class="newsinfo-container">
        <!-- 标题 -->
        <h3 class="title">{{ newsInfo.title }}</h3>
        <p class="subtitle">
            <span>发表时间：{{ newsInfo.add_time | dateFormat }}</span>
            <span>点击：{{ newsInfo.click }}次</span>
        </p>
        <!-- 内容 -->
        <hr>
        <div class="content" v-html="newsInfo.content"></div>
        <!-- 评论组件 -->
        <comment-box></comment-box>
    </div>
</template>
<script>
//导入 评论 子组件
import CommentBox from '../subcomponents/CommentBox.vue'
export default {
    created () {
        this.getNewsInfo()
    },
    data () {
        return {
            id: this.$route.params.id,  //获取 url 中传递过来的 id 值
            newsInfo: {}  //存储当前文章的数据
        }
    },
    methods: {
        getNewsInfo() {
            this.$http.get('api/getnew/' + this.id).then(res => {
                //console.log(res.body)
                this.newsInfo = res.body.message[0]
            })
        }
    },
    components: {
        CommentBox
    }
}
</script>
<style lang="scss">
.newsinfo-container {
    padding: 0 4px;
    h3 {
        margin: 15px 0;
        font-size: 16px;
        text-align: center;
        color: red;
    }
    .subtitle {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
        color: #226aff;
    }
    /* 该样式不生效，需要 将 scoped 去掉，或者另起一个 style 标签 */
    /* .content {
        img {
            width: 100%;
        }
    } */
}
</style>
<style lang="scss">
    .content {
        img {
            width: 100%;
        }
    }
</style>