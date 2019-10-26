<template>
  <div id="detail">
    <div class="detail-container" v-if="detailData">
      <div class="detail-header" v-if="detailData.image">
        <img class="detail-image" :src="detailData.image" mode="widthFix">
        <div class="detail-title">{{detailData.title}}</div>
      </div>
      <div class="detail-content">
          <rich-text :nodes="detailData.body"></rich-text>
      </div>
    </div>
    <div class="detail-tool" v-if="extra">
      <div class="tool-item like">
          <div class="item-value">赞同 {{extra.popularity || 0}}</div>
      </div>
      <div class="tool-item comments" @click="url('comment')">
          <div class="item-value">评论 {{extra.comments || 0}}</div>
      </div>
      <button class="tool-item share" open-type="share">
          <div class="item-value">分享</div>
      </button>
      <div class="tool-item home" @click="url('index')">
          <div class="item-value">首页</div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api/index'
import { formatHTML } from '@/utils'

export default {
  data () {
    return {
      id: '',
      detailData: '',
      extra: ''
    }
  },
  mounted () {
     this.id = this.$root.$mp.query.id
     this.getArticleDetail()
     this.getArticleExtra()
  },
  methods: {
    getArticleDetail(){
      api.getArticleDetail(this.id).then(res => {
        if (res) {
          res.body = formatHTML(res.body)
          this.detailData = res
        }
      })
    },
    getArticleExtra(){
      api.getArticleExtra(this.id).then(res => {
        if (res) {
          this.extra = res
        }
      })
    },
    // 跳转至评论页
    url(type) {
      if (type === 'index') {
        wx.navigateTo({
            url: '/pages/index/main'
        })
      } else if (type === 'comment') {
        wx.navigateTo({
            url: `/pages/comment/main?id=${this.id}`
        })
      }
    }
  },
  // 分享
  onShareAppMessage() {
      return {
          'title': this.detailData.title,
          'path': `/pages/detail/main?id=${this.id}`
      }
  }
}
</script>

<style lang="scss">
  #detail{
    .detail-container{
      padding-bottom: 60px;
      .detail-header{
        position: relative;
        width: 100%;
        height: 160px;
        overflow: hidden;
        .detail-image{
          width: 100%;
        }
        .detail-title{
          position: absolute;
          left: 5%;
          bottom: 20px;
          width: 90%;
          font-size: 16px;
          color: #fff;
          text-shadow: 1px 1px 2px #000;
        }
      }
      .detail-content {
        box-sizing: border-box;
        position: relative;
        width: 100%;
        word-wrap: break-word;
        padding: 10px;
        .content-inner{
          .headline-background, .view-more {
            display: none;
          }
          .question-title {
            color: #333;
            font-size: 18px;
            user-select: all
          }
          .meta{
            display: flex;
            align-items: center;
            font-size: 13px;
            margin: 8px 0;
            .avatar{
              width: 24px;
              height: 24px;
              border-radius: 100%;
              margin-right: 8px;
            }
            .author{
              color: #298df7;
            }
          }
          .content{
            width: 100%;
            color: #666;
            font-size: 14px;
            text-align: justify;
            line-height: 24px;
            .content-image{
              display: block;
              width: 100%;
              height: auto;
              margin-top: 8px;
            }
            .info-text {
              display: block;
              width: 100%;
              color: #666;
              font-size: 14px;
              margin: 8px 0;
              line-height: initial;
            }
          }
        }
      }
    }
    .detail-tool{
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      padding: 10px;
      display: flex;
      align-items: center;
      border-top: solid 1px #ddd;
      background-color: #fff;
      .tool-item{
        width: 0;
        flex: 1;
        padding: 5px;
        font-size: 14px;
        text-align: center;
        line-height: 1.2;
        color:#8590a6;
      }
      .like{
        border-radius: 3px;
        color:#0084ff;
        background-color:rgba(0,132,255,.1);
      }
      .share{
        background: none;
        border: none;
        background: transparent;
        &:after {
            border: none;
        }
      }
    }
  }
</style>
