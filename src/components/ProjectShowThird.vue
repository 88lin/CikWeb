<!--
 * @Description: 第三个项目展示组件（放在最新文章下方）
 * @Author: Cik
 * @Date: 2026-02-27
-->

<template>
  <section class="project-show-third" v-if="project">
    <div class="project-section theme-3">
      <div class="project-container">
        <!-- 内容区 -->
        <div class="project-content">
          <div class="content-inner">
            <span class="project-tag">{{ project.tag }}</span>
            <h2 class="project-title">{{ project.title }}</h2>
            <p class="project-desc">{{ project.description }}</p>
            
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
        
        <!-- 图片区 -->
        <div class="project-image">
          <div class="image-stack">
            <div 
              v-for="(img, imgIndex) in stackedImages" 
              :key="imgIndex"
              :class="['stack-card', `stack-${3 - imgIndex}`]"
              @click="setMainImage(img.originalIndex)"
            >
              <img :src="img.src" :alt="project.title" />
            </div>
            <div class="image-wrapper">
              <img :src="mainImage" :alt="project.title" />
            </div>
          </div>
        </div>
      </div>
      
      <div class="bg-gradient"></div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { projectShowData } from '@/data/projectshow'

// 获取第三个项目（index=2）
const project = computed(() => {
  const featured = projectShowData.filter((p) => p.featured)
  return featured.length > 2 ? featured[2] : null
})

// 当前主图索引
const mainImageIndex = ref(0)

// 获取主图
const mainImage = computed(() => {
  if (!project.value) return ''
  return project.value.images[mainImageIndex.value] || project.value.images[0]
})

// 获取堆叠图片
const stackedImages = computed(() => {
  if (!project.value) return []
  return project.value.images
    .map((src, originalIndex) => ({ src, originalIndex }))
    .filter((_, idx) => idx !== mainImageIndex.value)
    .slice(0, 2)
})

// 切换主图
const setMainImage = (index: number) => {
  mainImageIndex.value = index
}
</script>

<style scoped lang="scss">
.project-show-third {
  width: 100%;
  padding: 0 40px;
  
  @media (max-width: 1024px) {
    padding: 0 24px;
  }
  
  @media (max-width: 768px) {
    padding: 0 16px;
  }
}

.project-section {
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  border-radius: 32px;
  
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
    padding: 40px 20px 60px 20px;
    gap: 32px;
  }
}

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
    font-size: 2rem;
    white-space: normal;
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
    font-size: 1rem;
    line-height: 1.7;
  }
}

.project-actions {
  display: flex;
  gap: 14px;
  flex-wrap: nowrap;
  justify-content: center;
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
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
}

// 图片区
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
    padding: 0 8px;
    padding-bottom: 16px;
  }
}

// 图片堆叠容器 - 左下扇形布局
.image-stack {
  position: relative;
  width: 100%;
  max-width: 850px;
  margin: 0 auto;
  padding-left: 80px;
  padding-bottom: 60px;
  
  @media (max-width: 768px) {
    max-width: 100%;
    padding-left: 40px;
    padding-bottom: 30px;
  }
}

.stack-card {
  position: absolute;
  top: 0;
  right: 0;
  width: calc(100% - 80px);
  padding: 10px;
  background: white;
  border-radius: 24px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  
  img {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 16px;
    transition: transform 0.3s ease;
  }
  
  &:hover {
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.18);
    
    img {
      transform: scale(1.02);
    }
  }
  
  @media (max-width: 768px) {
    width: calc(100% - 40px);
    padding: 8px;
    border-radius: 20px;
    
    img {
      border-radius: 14px;
    }
  }
}

// 第3层 - 最后面，向左下偏移最大
.stack-3 {
  transform: translateX(-80px) translateY(50px) rotate(-8deg);
  z-index: 1;
  
  &:hover {
    transform: translateX(-78px) translateY(46px) rotate(-6deg);
  }
  
  @media (max-width: 768px) {
    transform: translateX(-40px) translateY(30px) rotate(-8deg);
    
    &:hover {
      transform: translateX(-38px) translateY(26px) rotate(-6deg);
    }
  }
}

// 第2层 - 中间，向左下偏移
.stack-2 {
  transform: translateX(-40px) translateY(25px) rotate(-4deg);
  z-index: 2;
  
  &:hover {
    transform: translateX(-38px) translateY(21px) rotate(-3deg);
  }
  
  @media (max-width: 768px) {
    transform: translateX(-20px) translateY(15px) rotate(-4deg);
    
    &:hover {
      transform: translateX(-18px) translateY(11px) rotate(-3deg);
    }
  }
}

// 第1层 - 最前面（主图片）- 右上位置
.image-wrapper {
  position: relative;
  width: calc(100% - 80px);
  margin-left: auto;
  padding: 10px;
  background: white;
  border-radius: 24px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.18);
  z-index: 3;
  transition: all 0.4s ease;
  
  img {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 16px;
  }
  
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 28px 60px rgba(0, 0, 0, 0.22);
  }
  
  @media (max-width: 768px) {
    width: calc(100% - 40px);
    padding: 8px;
    border-radius: 20px;
    
    img {
      border-radius: 14px;
    }
  }
}

.bg-gradient {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}

// 薄荷绿色系主题
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
    box-shadow: 0 25px 60px rgba(34, 197, 94, 0.18);
  }
  
  .stack-card {
    box-shadow: 0 12px 40px rgba(34, 197, 94, 0.12);
  }
  
  .bg-gradient {
    background: 
      radial-gradient(ellipse 80% 50% at 30% 40%, rgba(34, 197, 94, 0.08) 0%, transparent 60%),
      radial-gradient(ellipse 60% 40% at 70% 60%, rgba(74, 222, 128, 0.06) 0%, transparent 50%);
  }
}
</style>
