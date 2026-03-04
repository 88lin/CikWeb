<!--
 * @Description: 第三个项目展示组件（放在最新文章下方）
 * @Author: Cik
 * @Date: 2026-02-27
-->

<template>
  <section class="project-show-third" v-if="project">
    <div class="project-section theme-cyber">
      <!-- 装饰元素 -->
      <div class="decoration-elements">
        <div class="floating-icon icon-1">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0110 0v4"/>
          </svg>
        </div>
        <div class="floating-icon icon-2">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        </div>
        <div class="floating-icon icon-3">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
          </svg>
        </div>
      </div>
      
      <div class="project-container">
        <!-- 内容区 -->
        <div class="project-content">
          <div class="content-inner">
            <span class="project-tag">
              <svg class="tag-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              {{ project.tag }}
            </span>
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
                <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0110 0v4"/>
                </svg>
                <span>{{ project.primaryBtn.text }}</span>
              </a>
              <a 
                v-if="project.secondaryBtn.enabled"
                :href="project.secondaryBtn.link" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="btn-secondary"
              >
                <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83M16.62 12l-5.74 9.94"/>
                </svg>
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
        
        <!-- 图片区 - 扇形叠层卡片 -->
        <div class="project-image">
          <div class="fan-stack">
            <!-- 所有图片卡片 -->
            <div 
              v-for="(img, index) in project.images" 
              :key="index"
              :class="['fan-card', getCardPosition(index)]"
              @click="setMainImage(index)"
            >
              <div class="card-inner">
                <img :src="img" :alt="project.title" />
                <div class="card-shine"></div>
              </div>
              <!-- 点击提示 -->
              <div v-if="index !== mainImageIndex" class="click-hint">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 8v8M8 12h8"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="bg-gradient"></div>
      <div class="grid-pattern"></div>
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

// 获取卡片位置类名
const getCardPosition = (index: number) => {
  if (!project.value) return ''
  const total = project.value.images.length
  const current = mainImageIndex.value
  
  if (index === current) {
    return 'position-center' // 主图居中
  }
  
  // 计算相对位置
  let diff = index - current
  if (diff > total / 2) diff -= total
  if (diff < -total / 2) diff += total
  
  if (diff === -1 || (diff === total - 1)) {
    return 'position-left' // 左侧
  } else {
    return 'position-right' // 右侧
  }
}

// 切换主图
const setMainImage = (index: number) => {
  mainImageIndex.value = index
}
</script>

<style scoped lang="scss">
.project-show-third {
  width: 100%;
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
  padding: 48px 40px 60px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 48px;
  position: relative;
  z-index: 2;
  
  @media (max-width: 1024px) {
    padding: 40px 32px 50px 32px;
    gap: 40px;
  }
  
  @media (max-width: 768px) {
    padding: 32px 20px 40px 20px;
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
  padding: 5px 14px;
  font-size: 0.7rem;
  font-weight: 500;
  border-radius: 20px;
  margin-bottom: 12px;
  backdrop-filter: blur(10px);
  letter-spacing: 0.02em;
}

.project-title {
  font-size: 2.75rem;
  font-weight: 800;
  line-height: 1.15;
  margin: 0 0 14px 0;
  letter-spacing: -0.03em;
  white-space: nowrap;
  
  @media (max-width: 1024px) {
    font-size: 2.25rem;
  }
  
  @media (max-width: 768px) {
    font-size: 1.75rem;
    white-space: normal;
  }
}

.project-desc {
  font-size: 1rem;
  line-height: 1.7;
  margin: 0 0 20px 0;
  opacity: 0.85;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 768px) {
    font-size: 0.9375rem;
    line-height: 1.6;
    margin-bottom: 16px;
  }
}

.project-actions {
  display: flex;
  gap: 12px;
  flex-wrap: nowrap;
  justify-content: center;
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 10px;
  }
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  color: white;
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: 999px;
  text-decoration: none;
  transition: all 0.3s ease;
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  
  svg {
    width: 15px;
    height: 15px;
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
  padding: 12px 24px;
  font-size: 0.875rem;
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

// 图片区 - 阶梯堆叠容器
.project-image {
  width: 100%;
  max-width: 900px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 20px 30px;
  
  @media (max-width: 768px) {
    padding: 16px 10px 24px;
  }
}

// 卡片堆叠容器 - 阶梯布局
.fan-stack {
  position: relative;
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
  padding-right: 50px;
  padding-bottom: 40px;
  
  @media (max-width: 768px) {
    max-width: 100%;
    padding-right: 20px;
    padding-bottom: 16px;
  }
}

// 单张卡片
.fan-card {
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:not(.position-center) {
    position: absolute;
    top: 0;
    left: 0;
    width: calc(100% - 50px);
    
    @media (max-width: 768px) {
      width: calc(100% - 20px);
    }
  }
}

// 卡片内容
.card-inner {
  position: relative;
  padding: 5px;
  background: white;
  border-radius: 14px;
  overflow: hidden;
  transition: all 0.4s ease;
  
  img {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 10px;
    transition: all 0.3s ease;
  }
  
  @media (max-width: 768px) {
    padding: 4px;
    border-radius: 11px;
    
    img {
      border-radius: 8px;
    }
  }
}

// 卡片光泽效果
.card-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.35), transparent);
  transform: skewX(-25deg);
  transition: left 0.5s ease;
  pointer-events: none;
}

.fan-card:hover .card-shine {
  left: 150%;
}

// 点击提示
.click-hint {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 44px;
  height: 44px;
  background: rgba(245, 158, 11, 0.95);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.3s ease;
  box-shadow: 0 6px 18px rgba(245, 158, 11, 0.4);
  
  svg {
    width: 22px;
    height: 22px;
    color: white;
  }
  
  @media (max-width: 768px) {
    width: 34px;
    height: 34px;
    
    svg {
      width: 16px;
      height: 16px;
    }
  }
}

.fan-card:hover .click-hint {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1.1);
}

// 主图位置 - 最前面
.position-center {
  position: relative;
  width: calc(100% - 50px);
  z-index: 10;
  
  .card-inner {
    box-shadow: 0 20px 45px rgba(245, 158, 11, 0.18);
  }
  
  &:hover {
    transform: translateY(-6px);
    
    .card-inner {
      box-shadow: 0 28px 55px rgba(245, 158, 11, 0.22);
      
      img {
        transform: scale(1.01);
      }
    }
  }
  
  .click-hint {
    display: none;
  }
  
  @media (max-width: 768px) {
    width: calc(100% - 20px);
    
    &:hover {
      transform: translateY(-3px);
      
      .card-inner img {
        transform: none;
      }
    }
  }
}

// 第二层 - 中间
.position-left {
  z-index: 5;
  transform: translateX(25px) translateY(20px);
  opacity: 0.75;
  
  .card-inner {
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    
    img {
      filter: brightness(0.92);
    }
  }
  
  &:hover {
    opacity: 0.95;
    transform: translateX(25px) translateY(16px);
    
    .card-inner {
      box-shadow: 0 14px 38px rgba(245, 158, 11, 0.15);
      
      img {
        filter: brightness(1);
      }
    }
  }
  
  @media (max-width: 768px) {
    transform: translateX(10px) translateY(8px);
    
    &:hover {
      transform: translateX(10px) translateY(6px);
    }
  }
}

// 第三层 - 最后面
.position-right {
  z-index: 2;
  transform: translateX(50px) translateY(40px);
  opacity: 0.5;
  
  .card-inner {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
    
    img {
      filter: brightness(0.88);
    }
  }
  
  &:hover {
    opacity: 0.8;
    transform: translateX(50px) translateY(36px);
    
    .card-inner {
      box-shadow: 0 10px 28px rgba(245, 158, 11, 0.12);
      
      img {
        filter: brightness(0.96);
      }
    }
  }
  
  @media (max-width: 768px) {
    transform: translateX(20px) translateY(16px);
    
    &:hover {
      transform: translateX(20px) translateY(14px);
    }
  }
}

// 边框流光动画
@keyframes borderGlow {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.bg-gradient {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}

// 琦珀橙色系主题 - 温暖安全风格
.theme-cyber {
  background: linear-gradient(145deg, #fffbeb 0%, #fef3c7 35%, #fde68a 70%, #fcd34d 100%);
  position: relative;
  overflow: hidden;
  
  // 装饰图标
  .decoration-elements {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 1;
  }
  
  .floating-icon {
    position: absolute;
    opacity: 0.15;
    animation: float 6s ease-in-out infinite;
    
    svg {
      stroke: #d97706;
    }
  }
  
  .icon-1 {
    width: 80px;
    height: 80px;
    top: 15%;
    left: 8%;
    animation-delay: 0s;
    
    @media (max-width: 768px) {
      width: 50px;
      height: 50px;
      top: 10%;
      left: 5%;
    }
  }
  
  .icon-2 {
    width: 60px;
    height: 60px;
    top: 25%;
    right: 10%;
    animation-delay: -2s;
    
    @media (max-width: 768px) {
      width: 40px;
      height: 40px;
      top: 8%;
      right: 8%;
    }
  }
  
  .icon-3 {
    width: 50px;
    height: 50px;
    bottom: 20%;
    left: 12%;
    animation-delay: -4s;
    
    @media (max-width: 768px) {
      display: none;
    }
  }
  
  @keyframes float {
    0%, 100% {
      transform: translateY(0) rotate(0deg);
    }
    50% {
      transform: translateY(-15px) rotate(5deg);
    }
  }
  
  // 网格背景
  .grid-pattern {
    position: absolute;
    inset: 0;
    background-image: 
      linear-gradient(rgba(217, 119, 6, 0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(217, 119, 6, 0.04) 1px, transparent 1px);
    background-size: 40px 40px;
    pointer-events: none;
    z-index: 0;
  }
  
  .project-tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(255, 255, 255, 0.95);
    border: 1px solid rgba(217, 119, 6, 0.25);
    color: #b45309;
    box-shadow: 0 4px 12px rgba(217, 119, 6, 0.15);
    
    .tag-icon {
      width: 14px;
      height: 14px;
      stroke: #d97706;
    }
  }
  
  .project-title {
    background: linear-gradient(135deg, #92400e 0%, #b45309 50%, #d97706 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 3px;
      background: linear-gradient(90deg, transparent, #f59e0b, transparent);
      border-radius: 2px;
    }
  }
  
  .project-desc {
    color: #78716c;
    margin-top: 8px;
  }
  
  .btn-primary {
    background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 50%, #fcd34d 100%);
    box-shadow: 
      0 8px 24px rgba(245, 158, 11, 0.4),
      0 0 0 1px rgba(255, 255, 255, 0.2) inset;
    position: relative;
    overflow: hidden;
    color: #78350f;
    
    .btn-icon {
      width: 18px;
      height: 18px;
      opacity: 0.9;
      stroke: #78350f;
    }
    
    .arrow-icon {
      width: 16px;
      height: 16px;
      transition: transform 0.3s ease;
      stroke: #78350f;
    }
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
      transition: left 0.5s ease;
    }
    
    &:hover {
      box-shadow: 
        0 12px 32px rgba(245, 158, 11, 0.5),
        0 0 0 1px rgba(255, 255, 255, 0.3) inset;
      background: linear-gradient(135deg, #d97706 0%, #f59e0b 50%, #fbbf24 100%);
      
      &::before {
        left: 100%;
      }
      
      .arrow-icon {
        transform: translateX(4px);
      }
    }
  }
  
  .btn-secondary {
    background: rgba(255, 255, 255, 0.95);
    border: 1.5px solid rgba(217, 119, 6, 0.3);
    color: #b45309;
    box-shadow: 0 4px 12px rgba(217, 119, 6, 0.1);
    
    .btn-icon {
      width: 16px;
      height: 16px;
      margin-right: 6px;
      stroke: #d97706;
    }
    
    &:hover {
      background: white;
      border-color: rgba(217, 119, 6, 0.5);
      box-shadow: 0 8px 24px rgba(217, 119, 6, 0.2);
      color: #92400e;
    }
  }
  
  .btn-tertiary {
    background: rgba(255, 255, 255, 0.9);
    border: 1.5px solid rgba(217, 119, 6, 0.2);
    color: #d97706;
    box-shadow: 0 2px 8px rgba(217, 119, 6, 0.06);
    
    &:hover {
      background: white;
      border-color: rgba(217, 119, 6, 0.4);
      box-shadow: 0 4px 16px rgba(217, 119, 6, 0.12);
    }
  }
  
  .bg-gradient {
    background: 
      radial-gradient(ellipse 100% 80% at 50% 20%, rgba(245, 158, 11, 0.1) 0%, transparent 50%),
      radial-gradient(ellipse 60% 50% at 20% 80%, rgba(251, 191, 36, 0.08) 0%, transparent 40%),
      radial-gradient(ellipse 50% 40% at 80% 60%, rgba(252, 211, 77, 0.06) 0%, transparent 35%);
  }
}
</style>
