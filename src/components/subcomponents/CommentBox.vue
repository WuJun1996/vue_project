<template>
    <div class="cmt-container">
        <hr>
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入要评论的内容(最多120字)" maxlength="120"></textarea>

        <mt-button type="primary" size="large">发表评论</mt-button>

        <div class="cmt-list">
            <div class="cmt-item">
                <div class="cmt-title">
                    第1楼&nbsp;&nbsp;用户：匿名用户&nbsp;&nbsp;发表时间：2019-04-07 16:57:12
                </div>
                <div class="cmt-body">
                    锄禾日当午
                </div>
            </div>
            <div class="cmt-item">
                <div class="cmt-title">
                    第2楼&nbsp;&nbsp;用户：匿名用户&nbsp;&nbsp;发表时间：2019-04-07 16:57:12
                </div>
                <div class="cmt-body">
                    汗滴禾下土
                </div>
            </div>
            <div class="cmt-item">
                <div class="cmt-title">
                    第3楼&nbsp;&nbsp;用户：匿名用户&nbsp;&nbsp;发表时间：2019-04-07 16:57:12
                </div>
                <div class="cmt-body">
                    谁知盘中餐
                </div>
            </div>
            <div class="cmt-item">
                <div class="cmt-title">
                    第4楼&nbsp;&nbsp;用户：匿名用户&nbsp;&nbsp;发表时间：2019-04-07 16:57:12
                </div>
                <div class="cmt-body">
                    粒粒皆辛苦
                </div>
            </div>
        </div>

        <mt-button type="danger" size="large" plain>加载更多</mt-button>
    </div>
</template>
<script>
export default {
    data () {
        return {
        }
    }
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