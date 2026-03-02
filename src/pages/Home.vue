<!--
 * @Description: 首页组件 - 滚动淡入效果
 * @Author: Cik
 * @Date: 2026-02-27
-->

<template>
  <div class="home-page">
    <!-- Hero 区域无需动画，直接显示 -->
    <Heo />
    
    <!-- 精选轮播 - 向上淡入 -->
    <ScrollReveal animation="fade-up">
      <div id="featured">
        <FeaturedCarousel />
      </div>
    </ScrollReveal>
    
    <!-- 推荐文章 - 向上淡入 -->
    <ScrollReveal animation="fade-up">
      <div id="recommend">
        <RecommendPosts />
      </div>
    </ScrollReveal>
    
    <!-- 项目展示（内含工具推荐和媒体推荐） - 向上淡入 -->
    <ScrollReveal animation="fade-up">
      <ProjectShow />
    </ScrollReveal>
  </div>
</template>

<script setup lang="ts">
import Heo from '@/components/Heo.vue'
import FeaturedCarousel from '@/components/FeaturedCarousel.vue'
import RecommendPosts from '@/components/RecommendPosts.vue'
import ProjectShow from '@/components/ProjectShow.vue'
import ScrollReveal from '@/components/ScrollReveal.vue'
</script>

<style scoped lang="scss">
.home-page {
  min-height: 100vh;
}
</style>
