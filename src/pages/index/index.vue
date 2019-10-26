<template>
  <div class="body-container">
    <swiper :topStories="topStories"></swiper>
    <div class="article-container">
      <article-list :id="'articleList-' + index" v-for="(item, index) in articles" :key="index" :stories="item.stories" :date="item.formatDate"></article-list>
    </div>
    <div class="list-bottomLoad" v-if="articles.length > 0 && LoadingFlag">
        <div class="loading" v-if="LoadingFlag === 'loading'">加载中...</div>
        <div class="nothing" v-if="LoadingFlag === 'nothing'">刷完了，休息一下吧</div>
    </div>
  </div>
</template>

<script>
import api from '@/api/index'
import { formatDate } from '@/utils/index'
import articleList from '@/components/articleList'
import swiper from '@/components/swiper'

export default {
  components: {
    articleList,
    swiper
  },
  data () {
    return {
      articles: [],
      topStories: [],
      LoadingFlag: true
    }
  },
  mounted () {
    this.getLatestArticle()
  },
  methods: {
    getLatestArticle(){
      api.getLatestArticle().then(res => {
        if (res) {
          res.formatDate = formatDate(res.date)
          this.topStories = res.top_stories
          this.articles = []
          this.articles.push(res)
        }
      })
    },
    getBeforeArticle(){
      if (this.LoadingFlag !== 'nothing') {
        this.LoadingFlag = 'loading'
        let lastDate = this.articles[this.articles.length - 1].date
        api.getBeforeArticle(lastDate).then(res => {
          if (res) {
            this.LoadingFlag = true
            res.formatDate = formatDate(res.date)
            this.articles.push(res)
          }else{
            this.LoadingFlag = 'nothing'
          }
        })
      }
    }
  },
  // 下拉刷新
  async onPullDownRefresh() {
    await this.getLatestArticle()

    wx.stopPullDownRefresh()
  },
  // 上拉加载
  onReachBottom() {
    this.getBeforeArticle()
  },
}
</script>

<style lang="scss" scoped>
  .article-container{
    padding: 10px;
  }
</style>
