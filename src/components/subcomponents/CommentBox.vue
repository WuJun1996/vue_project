<template>
    <div class="cmt-container">
        <hr>
        <h3>发表评论</h3>
        <hr>
        <!-- .trim 自动过滤用户输入的首尾空白字符 -->
        <textarea placeholder="请输入要评论的内容(最多120字)" maxlength="120" v-model.trim="msg"></textarea>

        <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>

        <div class="cmt-list">
            <div class="cmt-item" v-for="(item, i) in comments" :key="i">
                <div class="cmt-title">
                    第{{ i+1 }}楼&nbsp;&nbsp;用户：{{ item.user_name }}&nbsp;&nbsp;发表时间：{{ item.add_time | dateFormat }}
                </div>
                <div class="cmt-body">
                    {{ item.content === 'undefined' ? '此用户很懒，什么都没说' : item.content }}
                </div>
            </div>
        </div>

        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
    </div>
</template>
<script>
import { Toast } from 'mint-ui'
export default {
    created () {
        this.getComments()
    },
    data () {
        return {
            pageindex: 1,
            comments: [],  //存储获取到的评论数据
            msg: ''  //添加评论输入的内容
        }
    },
    methods: {
        getComments() {
            this.$http.get(`api/getcomments/${this.id}?pageindex=${this.pageindex}`).then(res => {
                //console.log(res.body)
                if (res.body.status === 0) {
                    //this.comments = res.body.message
                    //每当获取新评论数据的时候，将新获取的数据拼接到老数据上
                    this.comments = [...this.comments, ...res.body.message]
                } else {
                    Toast('获取评论失败！')
                }
            })
        },
        getMore() {
            this.pageindex++
            this.getComments()
        },
        postComment() {
            //验证数据是否为空
            if (this.msg.length === 0) {
                Toast('请输入评论内容后再发表！')
                return
            }
            //获取数据并发送ajax请求
            this.$http.post('api/postcomment/' + this.id, {
                content: this.msg
            }).then(res => {
                if (res.body.status === 0) {
                    //将数据手动组装成一个评论对象，添加到 评论 数组的第一项
                    const cmt = {
                        user_name: '匿名用户',
                        add_time: Date.now(),
                        content: this.msg
                    }
                    this.comments.unshift(cmt)
                    this.msg = ''
                }
            })
        }
    },
    //获取父组件传递过来的文章 id
    props: ['id']
}
</script>
<style lang="scss" scoped>
.cmt-container {
    h3 {
        font-size: 18px;
    }
    textarea {
        height: 85px;
        margin: 0;
        font-size: 14px;
    }
    .cmt-list {
        margin: 5px 0;
        .cmt-item {
            font-size: 13px;
            .cmt-title {
                line-height: 30px;
                background-color: #ccc;
            }
            .cmt-body {
                line-height: 35px;
                text-indent: 2em;
            }
        }
    }
}
</style>