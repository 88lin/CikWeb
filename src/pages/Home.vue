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
    
    <!-- 项目展示（内含工具推荐和媒体推荐） - 向上淡入 -->
    <ScrollReveal animation="fade-up">
      <ProjectShow />
    </ScrollReveal>
    
    <!-- 友情链接 - 向上淡入 -->
    <ScrollReveal animation="fade-up">
      <LinksSection />
    </ScrollReveal>
    
    <!-- 赞助支持 - 缩放淡入 -->
    <ScrollReveal animation="zoom">
      <SponsorsSection />
    </ScrollReveal>
  </div>
</template>

<script setup lang="ts">
import Heo from '@/components/Heo.vue'
import FeaturedCarousel from '@/components/FeaturedCarousel.vue'
import ProjectShow from '@/components/ProjectShow.vue'
import LinksSection from '@/components/LinksSection.vue'
import SponsorsSection from '@/components/SponsorsSection.vue'
import ScrollReveal from '@/components/ScrollReveal.vue'
</script>

<style scoped lang="scss">
.home-page {
  min-height: 100vh;
  overflow-x: hidden;
}
</style>
