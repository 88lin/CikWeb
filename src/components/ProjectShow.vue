<!--
 * @Description: 项目展示组件
 * @Author: Cik
 * @Date: 2026-02-27
-->

<template>
  <section class="project-show">
    <!-- 项目列表 - 每个项目独占一屏 -->
    <template v-for="(project, index) in displayProjects" :key="project.id">
      <div 
        :class="['project-section', `theme-${index + 1}`]"
      >
        <div class="project-container">
          <!-- 左侧内容区 -->
          <div class="project-content">
            <div class="content-inner">
              <!-- 标签 -->
              <span class="project-tag">{{ project.tag }}</span>
              
              <!-- 标题 -->
              <h2 class="project-title">{{ project.title }}</h2>
              
              <!-- 描述 -->
              <p class="project-desc">{{ project.description }}</p>
              
              <!-- 按钮组 - 3个按钮同行显示 -->
              <div class="project-actions">
                <a 
                  v-if="project.primaryBtn.enabled"
                  :href="project.primaryBtn.link" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="btn-primary"
                >
                  <span>{{ project.primaryBtn.text }}</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
                <a 
                  v-if="project.secondaryBtn.enabled"
                  :href="project.secondaryBtn.link" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="btn-secondary"
                >
                  {{ project.secondaryBtn.text }}
                </a>
                <a 
                  v-if="project.thirdBtn.enabled"
                  :href="project.thirdBtn.link" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="btn-tertiary"
                >
                  {{ project.thirdBtn.text }}
                </a>
              </div>
            </div>
          </div>
          
          <!-- 右侧图片区 -->
          <div class="project-image">
            <div class="image-stack">
              <!-- 堆叠图片 - 动态渲染根据当前主图索引 -->
              <div 
                v-for="(img, imgIndex) in getStackedImages(project.id, project.images)" 
                :key="imgIndex"
                :class="['stack-card', `stack-${3 - imgIndex}`]"
                @click="setMainImage(project.id, img.originalIndex)"
              >
                <img :src="img.src" :alt="project.title" />
              </div>
              <!-- 主图片 -->
              <div class="image-wrapper">
                <img :src="getMainImage(project.id, project.images)" :alt="project.title" />
              </div>
            </div>
          </div>
        </div>
        
        <!-- 背景装饰 -->
        <div class="bg-gradient"></div>
      </div>
      
      <!-- 在第一个项目之后插入工具推荐组件 -->
      <div v-if="index === 0" id="tools">
        <ToolsSection />
      </div>
      <!-- 在工具推荐之后插入媒体推荐组件 -->
      <div v-if="index === 0" id="media">
        <MediaSection />
      </div>
      <!-- 在第二个项目之后插入最新文章组件 -->
      <div v-if="index === 1" id="posts">
        <LatestPosts />
      </div>
    </template>
  </section>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import { projectShowData } from '@/data/projectshow'
import ToolsSection from '@/components/ToolsSection.vue'
import MediaSection from '@/components/MediaSection.vue'
import LatestPosts from '@/components/LatestPosts.vue'

const displayProjects = computed(() => projectShowData.filter((p) => p.featured).slice(0, 2))

// 存储每个项目当前的主图索引
const mainImageIndex = reactive<Record<string, number>>({})

// 获取主图
const getMainImage = (projectId: string, images: string[]) => {
  const index = mainImageIndex[projectId] ?? 0
  return images[index] || images[0]
}

// 获取堆叠图片（排除主图）
const getStackedImages = (projectId: string, images: string[]) => {
  const mainIndex = mainImageIndex[projectId] ?? 0
  return images
    .map((src, originalIndex) => ({ src, originalIndex }))
    .filter((_, idx) => idx !== mainIndex)
    .slice(0, 2)  // 最多显示2张堆叠图片
}

// 点击切换主图
const setMainImage = (projectId: string, imageIndex: number) => {
  mainImageIndex[projectId] = imageIndex
}
</script>

<style scoped lang="scss">
.project-show {
  width: 100%;
  padding: 40px 40px 0 40px;
  display: flex;
  flex-direction: column;
  gap: 0;
  
  @media (max-width: 1024px) {
    padding: 24px 24px 0 24px;
  }
  
  @media (max-width: 768px) {
    padding: 16px 16px 0 16px;
  }
  
  // 工具和媒体区域全宽
  #tools,
  #media {
    @media (max-width: 768px) {
      margin-left: -16px;
      margin-right: -16px;
    }
  }
  
  #tools {
    @media (max-width: 768px) {
      margin-top: 16px;
    }
  }
  
  #media {
    @media (max-width: 768px) {
      margin-bottom: 16px;
    }
  }
}

// 单个项目区域 - 上下布局
.project-section {
  position: relative;
  min-height: auto;
  display: flex;
  align-items: center;
  overflow: hidden;
  border-radius: 32px;
  margin-bottom: 0;
  
  @media (max-width: 1024px) {
    border-radius: 24px;
  }
  
  @media (max-width: 768px) {
    border-radius: 20px;
  }
}

.project-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 40px 80px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 48px;
  position: relative;
  z-index: 2;
  
  @media (max-width: 1024px) {
    padding: 48px 32px 70px 32px;
    gap: 40px;
  }
  
  @media (max-width: 768px) {
    padding: 32px 16px 40px 16px;
    gap: 24px;
  }
}

// 内容区 - 居中显示
.project-content {
  width: 100%;
  max-width: 800px;
  text-align: center;
}

.content-inner {
  width: 100%;
}

.project-tag {
  display: inline-block;
  padding: 6px 16px;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 20px;
  margin-bottom: 16px;
  backdrop-filter: blur(10px);
  letter-spacing: 0.02em;
  
  @media (max-width: 768px) {
    padding: 5px 12px;
    font-size: 0.6875rem;
    margin-bottom: 12px;
  }
}

.project-title {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.15;
  margin: 0 0 20px 0;
  letter-spacing: -0.03em;
  white-space: nowrap;
  
  @media (max-width: 1024px) {
    font-size: 2.75rem;
  }
  
  @media (max-width: 768px) {
    font-size: 1.75rem;
    white-space: normal;
    margin-bottom: 14px;
    line-height: 1.25;
  }
}

.project-desc {
  font-size: 1.125rem;
  line-height: 1.8;
  margin: 0 0 28px 0;
  opacity: 0.85;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 768px) {
    font-size: 0.9375rem;
    line-height: 1.65;
    margin-bottom: 20px;
    opacity: 0.8;
  }
}

.project-actions {
  display: flex;
  gap: 14px;
  flex-wrap: nowrap;
  justify-content: center;
  
  @media (max-width: 768px) {
    gap: 8px;
    flex-wrap: nowrap;
    width: 100%;
  }
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 28px;
  color: white;
  font-size: 0.9375rem;
  font-weight: 600;
  border-radius: 999px;
  text-decoration: none;
  transition: all 0.3s ease;
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  
  svg {
    width: 16px;
    height: 16px;
    transition: transform 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
    
    svg {
      transform: translateX(4px);
    }
  }
  
  @media (max-width: 768px) {
    padding: 12px 16px;
    font-size: 0.8125rem;
    gap: 6px;
    flex: 1;
    justify-content: center;
    min-width: 0;
    
    svg {
      width: 14px;
      height: 14px;
    }
  }
}

.btn-secondary,
.btn-tertiary {
  display: inline-flex;
  align-items: center;
  padding: 14px 28px;
  font-size: 0.9375rem;
  font-weight: 600;
  border-radius: 999px;
  text-decoration: none;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  white-space: nowrap;
  
  &:hover {
    transform: translateY(-3px);
  }
  
  @media (max-width: 768px) {
    padding: 12px 16px;
    font-size: 0.8125rem;
    flex: 1;
    justify-content: center;
    min-width: 0;
  }
}

// 图片区 - 全宽居中
.project-image {
  width: 100%;
  max-width: 1000px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  padding-bottom: 20px;
  
  @media (max-width: 768px) {
    max-width: 100%;
    padding: 0 4px;
    padding-bottom: 12px;
  }
}

// 图片堆叠容器 - 垂直阶梯布局
.image-stack {
  position: relative;
  width: 100%;
  max-width: 850px;
  margin: 0 auto;
  padding-right: 60px;
  padding-bottom: 40px;
  
  @media (max-width: 768px) {
    max-width: 100%;
    padding-right: 20px;
    padding-bottom: 14px;
  }
}

// 堆叠卡片样式 - 可点击切换
.stack-card {
  position: absolute;
  top: 0;
  left: 0;
  width: calc(100% - 60px);
  padding: 6px;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  
  img {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 12px;
    transition: all 0.3s ease;
  }
  
  &:hover img {
    transform: scale(1.015);
  }
  
  @media (max-width: 768px) {
    width: calc(100% - 20px);
    padding: 4px;
    border-radius: 12px;
    
    img {
      border-radius: 9px;
    }
    
    &:hover img {
      transform: none;
    }
  }
}

// 第3层 - 最后面
.stack-3 {
  transform: translateX(60px) translateY(40px);
  z-index: 1;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  opacity: 0.5;
  
  &:hover {
    opacity: 0.75;
    transform: translateX(60px) translateY(36px);
    box-shadow: 0 8px 28px rgba(0, 0, 0, 0.1);
  }
  
  @media (max-width: 768px) {
    transform: translateX(20px) translateY(14px);
    
    &:hover {
      transform: translateX(20px) translateY(14px);
    }
  }
}

// 第2层 - 中间
.stack-2 {
  transform: translateX(30px) translateY(20px);
  z-index: 2;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.08);
  opacity: 0.7;
  
  &:hover {
    opacity: 0.9;
    transform: translateX(30px) translateY(16px);
    box-shadow: 0 12px 36px rgba(0, 0, 0, 0.12);
  }
  
  @media (max-width: 768px) {
    transform: translateX(10px) translateY(7px);
    
    &:hover {
      transform: translateX(10px) translateY(7px);
    }
  }
}

// 第1层 - 最前面（主图片）
.image-wrapper {
  position: relative;
  width: calc(100% - 60px);
  padding: 6px;
  background: white;
  border-radius: 16px;
  z-index: 3;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  
  img {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 12px;
    transition: all 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-6px);
    
    img {
      transform: scale(1.01);
    }
  }
  
  @media (max-width: 768px) {
    width: calc(100% - 20px);
    padding: 4px;
    border-radius: 12px;
    
    img {
      border-radius: 9px;
    }
    
    &:hover {
      transform: none;
      
      img {
        transform: none;
      }
    }
  }
}

// 背景渐变
.bg-gradient {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}

// ========================================
// 主题配色 1 - 珊瑩粉色系
// ========================================
.theme-1 {
  background: linear-gradient(145deg, #fff5f5 0%, #ffe4e6 40%, #fecdd3 100%);
  
  .project-tag {
    background: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(244, 63, 94, 0.2);
    color: #e11d48;
    box-shadow: 0 2px 8px rgba(244, 63, 94, 0.1);
  }
  
  .project-title {
    background: linear-gradient(135deg, #881337 0%, #be123c 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .project-desc {
    color: #64748b;
  }
  
  .btn-primary {
    background: linear-gradient(135deg, #f43f5e 0%, #fb7185 100%);
    box-shadow: 0 8px 24px rgba(244, 63, 94, 0.35);
    
    &:hover {
      box-shadow: 0 12px 32px rgba(244, 63, 94, 0.45);
      background: linear-gradient(135deg, #e11d48 0%, #f43f5e 100%);
    }
  }
  
  .btn-secondary,
  .btn-tertiary {
    background: rgba(255, 255, 255, 0.9);
    border: 1.5px solid rgba(244, 63, 94, 0.25);
    color: #e11d48;
    box-shadow: 0 2px 8px rgba(244, 63, 94, 0.08);
    
    &:hover {
      background: white;
      border-color: rgba(244, 63, 94, 0.5);
      box-shadow: 0 4px 16px rgba(244, 63, 94, 0.15);
    }
  }
  
  .image-wrapper {
    box-shadow: 0 16px 48px rgba(244, 63, 94, 0.18);
  }
  
  .stack-2 {
    box-shadow: 0 8px 28px rgba(244, 63, 94, 0.1);
  }
  
  .stack-3 {
    box-shadow: 0 4px 20px rgba(244, 63, 94, 0.06);
  }
  
  .bg-gradient {
    background: 
      radial-gradient(ellipse 80% 50% at 20% 40%, rgba(244, 63, 94, 0.08) 0%, transparent 60%),
      radial-gradient(ellipse 60% 40% at 80% 60%, rgba(251, 113, 133, 0.06) 0%, transparent 50%);
  }
}

// ========================================
// 主题配色 2 - 天空蓝色系
// ========================================
.theme-2 {
  background: linear-gradient(145deg, #f0f9ff 0%, #e0f2fe 40%, #bae6fd 100%);
  
  .project-tag {
    background: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(14, 165, 233, 0.2);
    color: #0284c7;
    box-shadow: 0 2px 8px rgba(14, 165, 233, 0.1);
  }
  
  .project-title {
    background: linear-gradient(135deg, #0c4a6e 0%, #0369a1 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .project-desc {
    color: #64748b;
  }
  
  .btn-primary {
    background: linear-gradient(135deg, #0ea5e9 0%, #38bdf8 100%);
    box-shadow: 0 8px 24px rgba(14, 165, 233, 0.35);
    
    &:hover {
      box-shadow: 0 12px 32px rgba(14, 165, 233, 0.45);
      background: linear-gradient(135deg, #0284c7 0%, #0ea5e9 100%);
    }
  }
  
  .btn-secondary,
  .btn-tertiary {
    background: rgba(255, 255, 255, 0.9);
    border: 1.5px solid rgba(14, 165, 233, 0.25);
    color: #0284c7;
    box-shadow: 0 2px 8px rgba(14, 165, 233, 0.08);
    
    &:hover {
      background: white;
      border-color: rgba(14, 165, 233, 0.5);
      box-shadow: 0 4px 16px rgba(14, 165, 233, 0.15);
    }
  }
  
  .image-wrapper {
    box-shadow: 0 16px 48px rgba(14, 165, 233, 0.18);
  }
  
  .stack-2 {
    box-shadow: 0 8px 28px rgba(14, 165, 233, 0.1);
  }
  
  .stack-3 {
    box-shadow: 0 4px 20px rgba(14, 165, 233, 0.06);
  }
  
  .bg-gradient {
    background: 
      radial-gradient(ellipse 80% 50% at 80% 30%, rgba(14, 165, 233, 0.08) 0%, transparent 60%),
      radial-gradient(ellipse 60% 40% at 20% 70%, rgba(56, 189, 248, 0.06) 0%, transparent 50%);
  }
}

// ========================================
// 主题配色 3 - 薄荷绿色系
// ========================================
.theme-3 {
  background: linear-gradient(145deg, #f0fdf4 0%, #dcfce7 40%, #bbf7d0 100%);
  
  .project-tag {
    background: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(34, 197, 94, 0.2);
    color: #16a34a;
    box-shadow: 0 2px 8px rgba(34, 197, 94, 0.1);
  }
  
  .project-title {
    background: linear-gradient(135deg, #14532d 0%, #166534 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .project-desc {
    color: #64748b;
  }
  
  .btn-primary {
    background: linear-gradient(135deg, #22c55e 0%, #4ade80 100%);
    box-shadow: 0 8px 24px rgba(34, 197, 94, 0.35);
    
    &:hover {
      box-shadow: 0 12px 32px rgba(34, 197, 94, 0.45);
      background: linear-gradient(135deg, #16a34a 0%, #22c55e 100%);
    }
  }
  
  .btn-secondary,
  .btn-tertiary {
    background: rgba(255, 255, 255, 0.9);
    border: 1.5px solid rgba(34, 197, 94, 0.25);
    color: #16a34a;
    box-shadow: 0 2px 8px rgba(34, 197, 94, 0.08);
    
    &:hover {
      background: white;
      border-color: rgba(34, 197, 94, 0.5);
      box-shadow: 0 4px 16px rgba(34, 197, 94, 0.15);
    }
  }
  
  .image-wrapper {
    box-shadow: 0 16px 48px rgba(34, 197, 94, 0.18);
  }
  
  .stack-2 {
    box-shadow: 0 8px 28px rgba(34, 197, 94, 0.1);
  }
  
  .stack-3 {
    box-shadow: 0 4px 20px rgba(34, 197, 94, 0.06);
  }
  
  .bg-gradient {
    background: 
      radial-gradient(ellipse 80% 50% at 30% 40%, rgba(34, 197, 94, 0.08) 0%, transparent 60%),
      radial-gradient(ellipse 60% 40% at 70% 60%, rgba(74, 222, 128, 0.06) 0%, transparent 50%);
  }
}

// ========================================
// 主题配色 4 - 薰衣草紫色系
// ========================================
.theme-4 {
  background: linear-gradient(145deg, #faf5ff 0%, #f3e8ff 40%, #e9d5ff 100%);
  
  .project-tag {
    background: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(168, 85, 247, 0.2);
    color: #9333ea;
    box-shadow: 0 2px 8px rgba(168, 85, 247, 0.1);
  }
  
  .project-title {
    background: linear-gradient(135deg, #581c87 0%, #7e22ce 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .project-desc {
    color: #64748b;
  }
  
  .btn-primary {
    background: linear-gradient(135deg, #a855f7 0%, #c084fc 100%);
    box-shadow: 0 8px 24px rgba(168, 85, 247, 0.35);
    
    &:hover {
      box-shadow: 0 12px 32px rgba(168, 85, 247, 0.45);
      background: linear-gradient(135deg, #9333ea 0%, #a855f7 100%);
    }
  }
  
  .btn-secondary,
  .btn-tertiary {
    background: rgba(255, 255, 255, 0.9);
    border: 1.5px solid rgba(168, 85, 247, 0.25);
    color: #9333ea;
    box-shadow: 0 2px 8px rgba(168, 85, 247, 0.08);
    
    &:hover {
      background: white;
      border-color: rgba(168, 85, 247, 0.5);
      box-shadow: 0 4px 16px rgba(168, 85, 247, 0.15);
    }
  }
  
  .image-wrapper {
    box-shadow: 0 16px 48px rgba(168, 85, 247, 0.18);
  }
  
  .stack-2 {
    box-shadow: 0 8px 28px rgba(168, 85, 247, 0.1);
  }
  
  .stack-3 {
    box-shadow: 0 4px 20px rgba(168, 85, 247, 0.06);
  }
  
  .bg-gradient {
    background: 
      radial-gradient(ellipse 80% 50% at 70% 30%, rgba(168, 85, 247, 0.08) 0%, transparent 60%),
      radial-gradient(ellipse 60% 40% at 30% 70%, rgba(192, 132, 252, 0.06) 0%, transparent 50%);
  }
}

// ========================================
// 主题配色 5 - 蜜桃橙色系
// ========================================
.theme-5 {
  background: linear-gradient(145deg, #fffbeb 0%, #fef3c7 40%, #fde68a 100%);
  
  .project-tag {
    background: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(245, 158, 11, 0.2);
    color: #d97706;
    box-shadow: 0 2px 8px rgba(245, 158, 11, 0.1);
  }
  
  .project-title {
    background: linear-gradient(135deg, #78350f 0%, #92400e 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .project-desc {
    color: #64748b;
  }
  
  .btn-primary {
    background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%);
    box-shadow: 0 8px 24px rgba(245, 158, 11, 0.35);
    
    &:hover {
      box-shadow: 0 12px 32px rgba(245, 158, 11, 0.45);
      background: linear-gradient(135deg, #d97706 0%, #f59e0b 100%);
    }
  }
  
  .btn-secondary,
  .btn-tertiary {
    background: rgba(255, 255, 255, 0.9);
    border: 1.5px solid rgba(245, 158, 11, 0.25);
    color: #d97706;
    box-shadow: 0 2px 8px rgba(245, 158, 11, 0.08);
    
    &:hover {
      background: white;
      border-color: rgba(245, 158, 11, 0.5);
      box-shadow: 0 4px 16px rgba(245, 158, 11, 0.15);
    }
  }
  
  .image-wrapper {
    box-shadow: 0 16px 48px rgba(245, 158, 11, 0.18);
  }
  
  .stack-2 {
    box-shadow: 0 8px 28px rgba(245, 158, 11, 0.1);
  }
  
  .stack-3 {
    box-shadow: 0 4px 20px rgba(245, 158, 11, 0.06);
  }
  
  .bg-gradient {
    background: 
      radial-gradient(ellipse 80% 50% at 50% 30%, rgba(245, 158, 11, 0.08) 0%, transparent 60%),
      radial-gradient(ellipse 60% 40% at 50% 70%, rgba(251, 191, 36, 0.06) 0%, transparent 50%);
  }
}
</style>
