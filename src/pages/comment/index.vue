<template>
  <div id="comment">
    <comment-list :comments="comments"></comment-list>
    <div class="list-bottomLoad" v-if="comments.length > 0 && LoadingFlag">
        <div class="loading" v-if="LoadingFlag === 'loading'">加载中...</div>
        <div class="nothing" v-if="LoadingFlag === 'nothing'">刷完了，休息一下吧！</div>
    </div>
  </div>
</template>

<script>
import api from '@/api/index'
import { formatTime } from '@/utils'
import commentList from '@/components/commentList'

export default {
  components: {
    commentList,
  },
  data () {
    return {
      id: '',
      comments: [],
      LoadingFlag: false
    }
  },
  mounted () {
    this.id = this.$root.$mp.query.id
    this.getShortComment()
  },
  methods: {
    getShortComment(){
      this.LoadingFlag = 'loading'
      api.getShortComment(this.id).then(res => {
        if (res) {
          res.comments.forEach(item => {
              item.time = formatTime(item.time,'yyyy-MM-dd hh:mm')
          })
          this.comments = res.comments
        }
      })
    },
    getShortCommentMore(){
      if (this.LoadingFlag !== 'nothing') {
        this.LoadingFlag = 'loading'
        let lastId = this.comments[this.comments.length - 1].id
        api.getShortCommentMore(this.id,lastId).then(res => {
          if (res && res.comments.length > 0) {
            this.LoadingFlag = true
            this.comments.push(...res.comments)
          }else{
            this.LoadingFlag = 'nothing'
          }
        })
      }
    }
  },
  // 下拉刷新
  async onPullDownRefresh() {
    await this.getShortComment()

    wx.stopPullDownRefresh()
  },
  // 上拉加载
  onReachBottom() {
    this.getShortCommentMore()
  },
}
</script>

<style lang="scss" scoped>

</style>
