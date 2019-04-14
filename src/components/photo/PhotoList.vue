<template>
    <div>
        <!-- 顶部滑动控件 -->
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a class="mui-control-item" :class="{'mui-active': item.id === 0}" data-wid="tab-top-subpage-1.html" v-for="item in cates" :key="item.id" @tap="getPhotoListByCateId(item.id)">
                        {{ item.title }}
                    </a>
                </div>
            </div>
        </div>

        <!-- 图片列表区域 -->
        <ul class="photo-list">
            <router-link tag="li" :to="'/home/photoinfo/' + item.id" v-for="item in list" :key="item.id">
                <img v-lazy="item.img_url">
                <div class="info">
                    <h4 class="info-title">{{ item.title }}</h4>
                    <div class="info-body">{{ item.zhaiyao }}</div>
                </div>
            </router-link>
        </ul>
    </div>
</template>
<script>
import mui from '../../lib/mui/js/mui.min.js'
export default {
    created () {
        this.getAllCategory()
        //默认进入页面就主动请求图片列表数据
        this.getPhotoListByCateId(0)
    },
    mounted () {
        //初始化顶部滑动控件
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005
        })
    },
    data () {
        return {
            cates: [],  //分类列表数据
            list: []  //图片列表数据
        }
    },
    methods: {
        getAllCategory() {
            this.$http.get('api/getimgcategory').then(res => {
                if (res.body.status === 0) {
                    res.body.message.unshift({title: '全部', id: 0})
                    this.cates = res.body.message
                }
            })
        },
        getPhotoListByCateId(cateId) {
            this.$http.get('api/getimages/' + cateId).then(res => {
                //console.log(res.body)
                if (res.body.status === 0) {
                    this.list = res.body.message
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
    .photo-list {
        list-style: none;
        padding: 10px;
        padding-bottom: 0;
        margin: 0;
        li {
            position: relative;
            margin-bottom: 10px;
            background-color: #ccc;
            text-align: center;
            box-shadow: 0 0 10px #999;
            img {
                display: block;
                width: 100%;
            }
            img[lazy=loading] {
                width: 40px;
                height: 300px;
                margin: auto;
            }
            .info {
                position: absolute;
                bottom: 0;
                max-height: 84px;
                text-align: left;
                background-color: rgba(0, 0, 0, .4);
                color: #fff;
                .info-title {
                    font-size: 14px;
                }
                .info-body {
                    font-size: 12px;
                }
            }
        }
    }
</style>