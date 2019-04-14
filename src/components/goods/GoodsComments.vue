<template>
    <div>
        <comment-box :id="$route.params.id"></comment-box>
    </div>
</template>
<script>
import CommentBox from '../subcomponents/CommentBox.vue'
export default {
    data () {
        return {
        }
    },
    components: {
        CommentBox
    }
}
</script>
<style lang="scss" scoped>
</style>