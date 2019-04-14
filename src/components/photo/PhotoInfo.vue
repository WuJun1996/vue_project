<template>
    <div class="photoinfo-container">
        <h3>{{ photoinfo.title }}</h3>
        <p class="subtitle">
            <span>发表时间：{{ photoinfo.add_time | dateFormat }}</span>
            <span>点击：{{ photoinfo.click }}次</span>
        </p>
        <hr>
        <!-- 缩略图区域 使用 vue-preview 插件插件实现 -->
        <div class="thumbs">
            <vue-preview :slides="list"></vue-preview>
        </div>

        <!-- 图片内容区域 -->
        <div class="content" v-html="photoinfo.content"></div>

        <!-- 评论区域 放置一个评论组件 -->
        <comment-box :id="id"></comment-box>
    </div>
</template>
<script>
import CommentBox from '../subcomponents/CommentBox.vue'
export default {
    created () {
        this.getPhotoInfo()
        this.getThumbs()
    },
    data () {
        return {
            id: this.$route.params.id,  //从路由中获取图片的id
            photoinfo: {},  //图片详情
            list: []  //存储缩略图数组
        }
    },
    methods: {
        getPhotoInfo() {
            this.$http.get('api/getimageInfo/' + this.id).then(res => {
                if (res.body.status === 0) {
                    this.photoinfo = res.body.message[0]
                }
            })
        },
        //获取缩略图
        getThumbs() {
            this.$http.get('api/getthumimages/' + this.id).then(res => {
                if (res.body.status === 0) {
                    //循环每个图片数据，补全大图的宽高属性
                    res.body.message.forEach(item => {
                        item.w = 600
                        item.h = 400
                        item.msrc = item.src
                    })
                    this.list = res.body.message
                }
            })
        }
    },
    components: {
        CommentBox
    }
}
</script>
<style lang="scss" scoped>
    .photoinfo-container {
        padding: 3px 10px;
        h3 {
            margin: 15px 0;
            color: #26a2ff;
            font-size: 16px;
            text-align: center;
        }
        .subtitle {
            display: flex;
            justify-content: space-between;
            font-size: 14px;
        }
        .content {
            font-size: 14px;
            line-height: 30px;
        }
    }
</style>
<style lang="scss">
    .my-gallery {
        display: flex;
        figure {
            flex: 1;
            margin: 10px;
            img {
                width: 100%;
            }
        }
    }
</style>