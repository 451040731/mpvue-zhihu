<template>
  <div class="article-swiper">
    <swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="500" :circular="true" indicator-color="#fff" indicator-active-color="#0084ff">
        <block v-for="(item, index) in topStories" :key="index">
            <swiper-item>
                <image :src="item.image" class="slide-image" mode="aspectFill"/>
                <span class="swiper-text">{{item.title}}</span>
            </swiper-item>
        </block>
    </swiper>
  </div>
</template>

<script>
export default {
  props: {
      topStories: {
          type: Array,
          default: []
      }
  },
}
</script>

<style lang="scss" scoped>
  .article-swiper{
    .swiper{
      height: 200px;
    }
    ._swiper-item{
      position: relative;
      .slide-image{
        display: block;
        width: 100%;
      }
      .swiper-text{
        position: absolute;
        left: 5%;
        bottom: 20px;
        width: 90%;
        font-size: 16px;
        color: #fff;
        text-shadow: 1px 1px 2px #000;
      }
    }
  }
</style>

