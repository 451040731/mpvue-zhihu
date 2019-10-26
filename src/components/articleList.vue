<template>
  <div class="article-list">
    <div class="list-date" v-if="date">{{date}}</div>
    <div class="list-item" v-for="(item, index) in stories" :key="item.id" @click="url(item)">
      <div class="item-box" v-if="item.images">
          <div class="item-title">{{item.title}}</div>
          <div class="item-images">
              <img :src="item.images[0] || item.images" mode="widthFix" :lazy-load="true">
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        date: {
            type: String,
            default: ''
        },
        stories: {
            type: Array,
            default: []
        }
    },
    methods: {
        url(item) {
            wx.navigateTo({
                url: `/pages/detail/main?id=${item.id}`
            })
        }
    }
}
</script>
<style lang="scss" scoped>
  .article-list{
    margin-bottom: 10px;
    .list-date{
      display: flex;
      align-items: center;
      justify-content: center;
      color:#fff;
      font-size: 14px;
      letter-spacing: 2px;
      width: 40%;
      height: 30px;
      border-radius: 30rpx;
      background: #0084ff;
      background: -webkit-linear-gradient(left right,#389fff,#007bee);
      background: -moz-linear-gradient(left right,#389fff,#ff007beea106);
      background: -o-linear-gradient(left right,#389fff,#007bee);
      background: -webkit-gradient(linear,100% 0,0 0,from(#389fff),to(#007bee));
      background: linear-gradient(left right,#389fff,#007bee);
    }
    .item-box{
      display: flex;
      padding: 10px;
      background-color: #fff;
      margin-top: 10px;
      border-radius: 6px;
      box-shadow: 0px 0px 6px 4px rgba(0, 0, 0, 0.04);
      .item-images{
        width: 30%;
        height: 80px;
        overflow: hidden;
        ._img{
          width: 100%;
        }
      }
      .item-title{
        width: 70%;
        padding-right: 20px;
        font-size: 16px;
      }
    }
  }
</style>

