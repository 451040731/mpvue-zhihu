<template>
  <div class="comments-list">
    <div class="list-item" v-for="(item, index) in comments" :key="item.id">
      <div class="item-top">
        <div class="item-user">
          <img class="item-avatar" :src="item.avatar">
          <div class="item-author">{{item.author}}</div>
        </div>
        <div class="item-time">{{item.time}}</div>
      </div>
      <div class="item-content">{{item.content}}</div>
      <div class="item-bottom">
        <div class="item-value ">赞{{item.likes}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        comments: {
            type: Array,
            default: []
        }
    },
}
</script>
<style lang="scss" scoped>
  .comments-list{
    padding: 10px;
    .list-item{
      padding: 10px 0;
      border-bottom: solid 1px #ddd;
      .item-top{
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        .item-user{
          display: flex;
          align-items: center;
          .item-avatar{
            display: block;
            width: 20px;
            height: 20px;
            margin-right: 8px;
            border-radius: 100%;
            overflow: hidden;
          }
          .item-author{
            font-size: 13px;
            color: #666;
          }
        }
        .item-time{
          margin-left: auto;
          font-size: 12px;
          color: #999;
        }
      }
      .item-content{
        margin-bottom: 10px;
        font-size: 14px;
        color: #333;
      }
      .item-bottom{
        .item-value{
          font-size: 13px;
          color: #999;
        }
      }
    }
  }
</style>

