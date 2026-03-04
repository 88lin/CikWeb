<!--
 * @Description: 精选项目轮播组件
 * @Author: Cik
 * @Date: 2026-02-27
-->

<template>
  <section class="featured-carousel section">
    <div class="container">
      <!-- 标题区域 -->
      <div class="section-header">
        <span class="section-tag">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
          Featured Projects
        </span>
        <h2 class="section-title">精选项目</h2>
        <p class="section-subtitle">探索精心打造的创意作品，每一个项目都承载着技术与美学的结合</p>
      </div>
      
      <!-- 幻灯片容器 -->
      <div class="carousel-wrapper">
        <!-- 左箭头（桌面端） -->
        <button class="carousel-btn carousel-btn-prev desktop-only" @click="prevSlide" :disabled="isAnimating">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
          </svg>
        </button>
        
        <!-- 卡片容器 -->
        <div 
          class="carousel-container"
          @touchstart="handleTouchStart"
          @touchmove="handleTouchMove"
          @touchend="handleTouchEnd"
        >
          <div 
            ref="trackRef"
            class="cards-track" 
            :style="trackStyle"
            @transitionend="handleTransitionEnd"
          >
            <!-- 克隆最后3张卡片到开头（用于无缝循环） -->
            <div 
              v-for="project in clonedLastCards" 
              :key="`clone-last-${project.id}`" 
              class="card-wrapper"
            >
              <div class="project-card">
                <div class="card-image">
                  <div class="image-wrapper">
                    <img :src="project.image" :alt="project.title" />
                  </div>
                </div>
                <div class="card-content">
                  <div class="card-meta">
                    <span v-for="tech in project.tech.slice(0, 3)" :key="tech" class="meta-tag">
                      {{ tech }}
                    </span>
                  </div>
                  <h3 class="card-title">{{ project.title }}</h3>
                  <p class="card-description">{{ project.description }}</p>
                  <a :href="project.link" target="_blank" rel="noopener noreferrer" class="card-link">
                    <span class="link-text">查看项目</span>
                    <span class="link-arrow">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"/>
                        <polyline points="12 5 19 12 12 19"/>
                      </svg>
                    </span>
                  </a>
                </div>
              </div>
            </div>
            
            <!-- 原始卡片 -->
            <div 
              v-for="project in featuredProjects" 
              :key="project.id" 
              class="card-wrapper"
            >
              <div class="project-card">
                <div class="card-image">
                  <div class="image-wrapper">
                    <img :src="project.image" :alt="project.title" />
                  </div>
                </div>
                <div class="card-content">
                  <div class="card-meta">
                    <span v-for="tech in project.tech.slice(0, 3)" :key="tech" class="meta-tag">
                      {{ tech }}
                    </span>
                  </div>
                  <h3 class="card-title">{{ project.title }}</h3>
                  <p class="card-description">{{ project.description }}</p>
                  <a :href="project.link" target="_blank" rel="noopener noreferrer" class="card-link">
                    <span class="link-text">查看项目</span>
                    <span class="link-arrow">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"/>
                        <polyline points="12 5 19 12 12 19"/>
                      </svg>
                    </span>
                  </a>
                </div>
              </div>
            </div>
            
            <!-- 克隆前3张卡片到末尾（用于无缝循环） -->
            <div 
              v-for="project in clonedFirstCards" 
              :key="`clone-first-${project.id}`" 
              class="card-wrapper"
            >
              <div class="project-card">
                <div class="card-image">
                  <div class="image-wrapper">
                    <img :src="project.image" :alt="project.title" />
                  </div>
                </div>
                <div class="card-content">
                  <div class="card-meta">
                    <span v-for="tech in project.tech.slice(0, 3)" :key="tech" class="meta-tag">
                      {{ tech }}
                    </span>
                  </div>
                  <h3 class="card-title">{{ project.title }}</h3>
                  <p class="card-description">{{ project.description }}</p>
                  <a :href="project.link" target="_blank" rel="noopener noreferrer" class="card-link">
                    <span class="link-text">查看项目</span>
                    <span class="link-arrow">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"/>
                        <polyline points="12 5 19 12 12 19"/>
                      </svg>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 右箭头（桌面端） -->
        <button class="carousel-btn carousel-btn-next desktop-only" @click="nextSlide" :disabled="isAnimating">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
          </svg>
        </button>
      </div>
      
      <!-- 手机端控制按钮 -->
      <div class="mobile-controls">
        <button class="mobile-btn" @click="prevSlide" :disabled="isAnimating">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
          </svg>
        </button>
        <button class="mobile-btn" @click="nextSlide" :disabled="isAnimating">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
          </svg>
        </button>
      </div>
      
      <!-- 指示器（桌面端） -->
      <div class="carousel-indicators desktop-only">
        <button 
          v-for="(_project, index) in featuredProjects" 
          :key="index" 
          :class="['indicator', { active: index === getActiveIndicatorIndex }]"
          @click="goToSlide(index)"
          :disabled="isAnimating"
        >
        </button>
      </div>
    </div>
    
    <!-- 背景装饰 -->
    <div class="bg-decoration">
      <div class="bg-blob bg-blob-1"></div>
      <div class="bg-blob bg-blob-2"></div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { featuredProjects } from '@/data/featuredcarousel'

// 当前索引（实际索引，包含克隆卡片）
const currentIndex = ref(3) // 从第4个位置开始（跳过前3个克隆卡片）
// 动画状态
const isAnimating = ref(false)
// 自动播放定时器
let autoPlayTimer: number | null = null
// 同时显示的卡片数量 - 响应式
const visibleCards = ref(3)
// 自动播放间隔（毫秒）
const autoPlayInterval = 5000
// track DOM 引用
const trackRef = ref<HTMLElement | null>(null)

// 触摸滑动相关
let touchStartX = 0
let touchEndX = 0
const swipeThreshold = 50 // 滑动阈值

// 更新可见卡片数量
const updateVisibleCards = () => {
  const oldVal = visibleCards.value
  if (window.innerWidth <= 768) {
    visibleCards.value = 1
  } else if (window.innerWidth <= 1024) {
    visibleCards.value = 2
  } else {
    visibleCards.value = 3
  }
  
  // 如果数量改变，重置索引
  if (oldVal !== visibleCards.value) {
    currentIndex.value = visibleCards.value
  }
}

// 克隆前N张卡片（放到末尾）
const clonedFirstCards = computed(() => featuredProjects.slice(0, visibleCards.value))

// 克隆后N张卡片（放到开头）
const clonedLastCards = computed(() => featuredProjects.slice(-visibleCards.value))

// 原始卡片数
const originalCardsCount = computed(() => featuredProjects.length)

// 轨道样式
const trackStyle = computed(() => {
  // 根据可见卡片数量计算偏移
  // 卡片宽度 = (100% - (n-1)*gap) / n，每次移动距离 = 卡片宽度 + gap = 100%/n + gap/n
  let offset = ''
  if (visibleCards.value === 1) {
    offset = `${-currentIndex.value * 100}%`
  } else if (visibleCards.value === 2) {
    // 卡片宽度 = (100% - 24px) / 2，移动距离 = 卡片宽度 + 24px = 50% + 12px
    offset = `calc(-${currentIndex.value} * (50% + 12px))`
  } else {
    // 卡片宽度 = (100% - 48px) / 3，移动距离 = 卡片宽度 + 24px = 33.33% - 16px + 24px = 33.33% + 8px
    offset = `calc(-${currentIndex.value} * (33.3333% + 8px))`
  }
  return {
    transform: `translateX(${offset})`,
    transition: isAnimating.value ? 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'none'
  }
})

// 获取当前激活的指示器索引（映射到原始卡片）
const getActiveIndicatorIndex = computed(() => {
  const realIndex = currentIndex.value - visibleCards.value
  if (realIndex < 0) return originalCardsCount.value + realIndex
  if (realIndex >= originalCardsCount.value) return realIndex - originalCardsCount.value
  return realIndex
})

// 处理过渡结束事件（无缝跳转）
const handleTransitionEnd = () => {
  if (!isAnimating.value) return
  
  if (currentIndex.value >= originalCardsCount.value + visibleCards.value) {
    // 到达克隆的前N张，跳回真实的前N张
    isAnimating.value = false
    currentIndex.value = visibleCards.value
  } else if (currentIndex.value < visibleCards.value) {
    // 到达克隆的后N张，跳到真实的后N张
    const newIndex = originalCardsCount.value + currentIndex.value
    isAnimating.value = false
    currentIndex.value = newIndex
  } else {
    // 正常情况，直接结束动画
    isAnimating.value = false
  }
}

// 下一张（无缝循环）
const nextSlide = () => {
  if (isAnimating.value) return
  
  isAnimating.value = true
  currentIndex.value++
  
  resetAutoPlay()
}

// 上一张（无缝循环）
const prevSlide = () => {
  if (isAnimating.value) return
  
  isAnimating.value = true
  currentIndex.value--
  
  resetAutoPlay()
}

// 跳转到指定卡片
const goToSlide = (index: number) => {
  if (isAnimating.value) return
  
  isAnimating.value = true
  // 映射到实际索引（加上前面的克隆卡片偏移）
  currentIndex.value = index + visibleCards.value
  
  setTimeout(() => {
    isAnimating.value = false
  }, 500)
  
  resetAutoPlay()
}

// 启动自动播放
const startAutoPlay = () => {
  if (originalCardsCount.value <= visibleCards.value) return
  
  autoPlayTimer = window.setInterval(() => {
    nextSlide()
  }, autoPlayInterval)
}

// 停止自动播放
const stopAutoPlay = () => {
  if (autoPlayTimer) {
    clearInterval(autoPlayTimer)
    autoPlayTimer = null
  }
}

// 重置自动播放
const resetAutoPlay = () => {
  stopAutoPlay()
  startAutoPlay()
}

// 触摸事件处理
const handleTouchStart = (e: TouchEvent) => {
  touchStartX = e.touches[0].clientX
  touchEndX = touchStartX
  stopAutoPlay()
}

const handleTouchMove = (e: TouchEvent) => {
  touchEndX = e.touches[0].clientX
}

const handleTouchEnd = () => {
  const diff = touchStartX - touchEndX
  
  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      // 向左滑动 -> 下一张
      nextSlide()
    } else {
      // 向右滑动 -> 上一张
      prevSlide()
    }
  }
  
  startAutoPlay()
}

onMounted(() => {
  updateVisibleCards()
  startAutoPlay()
  window.addEventListener('resize', updateVisibleCards)
})

onUnmounted(() => {
  stopAutoPlay()
  window.removeEventListener('resize', updateVisibleCards)
})
</script>

<style scoped lang="scss">
.featured-carousel {
  position: relative;
  background: #f5f5f7;
  padding: 80px 0;
  overflow: hidden;
  
  @media (max-width: $breakpoint-md) {
    padding: 40px 0 32px 0;
  }
  
  // 兓写全局.container，与Heo区域对齐
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 $spacing-xl;
    
    @media (min-width: 2560px) {
      max-width: 1400px;
      padding: 0 $spacing-xl * 1.5;
    }
    
    @media (max-width: $breakpoint-md) {
      padding: 0 $spacing-lg;
    }
  }
}

// 背景装饰 - 移除或降低透明度
.bg-decoration {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  display: none;  // 暂时隐藏背景装饰
}

.bg-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.4;
  
  &.bg-blob-1 {
    width: 400px;
    height: 400px;
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(236, 72, 153, 0.2));
    top: -100px;
    left: -100px;
  }
  
  &.bg-blob-2 {
    width: 300px;
    height: 300px;
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.3));
    bottom: -50px;
    right: -50px;
  }
}

// 标题区域
.section-header {
  text-align: center;
  margin-bottom: 48px;
  position: relative;
  z-index: 1;
}

.section-tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1));
  border: 1px solid rgba(139, 92, 246, 0.2);
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #8b5cf6;
  margin-bottom: 16px;
  
  svg {
    width: 14px;
    height: 14px;
  }
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #1f2937 0%, #4b5563 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 12px;
  
  @media (max-width: $breakpoint-md) {
    font-size: 2rem;
  }
}

.section-subtitle {
  font-size: 1rem;
  color: #6b7280;
  max-width: 500px;
  margin: 0 auto;
  line-height: 1.6;
}

// 幻灯片外层容器
.carousel-wrapper {
  position: relative;
  padding: 0 60px;
  z-index: 1;
  
  @media (max-width: $breakpoint-md) {
    padding: 0 32px;
  }
  
  @media (max-width: $breakpoint-sm) {
    padding: 0;
  }
}

// 幻灯片容器
.carousel-container {
  overflow: hidden;
  border-radius: 16px;
}

// 卡片轨道
.cards-track {
  display: flex;
  gap: 24px;
  padding: 8px 0;
  
  @media (max-width: $breakpoint-md) {
    gap: 0; // 手机端无间距
  }
}

// 卡片包装器（强制一行显示3个）
.card-wrapper {
  min-width: calc((100% - 48px) / 3);  // (100% - 2×24px gap) / 3个卡片
  max-width: calc((100% - 48px) / 3);  // 同时设置最大宽度
  flex-shrink: 0;
  flex-grow: 0;
  
  @media (max-width: $breakpoint-lg) {
    min-width: calc((100% - 24px) / 2);
    max-width: calc((100% - 24px) / 2);
  }
  
  @media (max-width: $breakpoint-md) {
    min-width: 100%;
    max-width: 100%;
    padding: 0 8px;
  }
}

// 卡片样式（美化版）
.project-card {
  background: white;
  border-radius: 24px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 
    0 4px 20px rgba(0, 0, 0, 0.06),
    0 1px 3px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.05);
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 
      0 20px 40px rgba(139, 92, 246, 0.15),
      0 8px 16px rgba(0, 0, 0, 0.08);
  }
  
  // 手机端卡片美化
  @media (max-width: $breakpoint-md) {
    border-radius: 20px;
    background: linear-gradient(145deg, #ffffff 0%, #fafbfc 100%);
    border: 1px solid rgba(139, 92, 246, 0.08);
    box-shadow: 
      0 8px 32px rgba(139, 92, 246, 0.1),
      0 4px 16px rgba(0, 0, 0, 0.04),
      inset 0 1px 0 rgba(255, 255, 255, 0.9);
    
    &:hover {
      transform: none;
    }
    
    &:active {
      transform: scale(0.98);
    }
  }
  
  // 图片区域 - 白色边框包裹
  .card-image {
    padding: 16px 16px 0 16px;
    background: white;
    
    @media (max-width: $breakpoint-md) {
      padding: 12px 12px 0 12px;
      background: transparent;
    }
    
    .image-wrapper {
      width: 100%;
      height: 200px;
      border-radius: 16px;
      overflow: hidden;
      position: relative;
      background: #f8fafc;
      display: flex;
      align-items: center;
      justify-content: center;
      
      @media (max-width: $breakpoint-md) {
        height: 180px;
        border-radius: 14px;
        background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
      }
      
      // 渐变遮罩
      &::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(
          180deg,
          transparent 0%,
          transparent 60%,
          rgba(0, 0, 0, 0.4) 100%
        );
        z-index: 1;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.4s ease;
      }
      
      img {
        max-width: 100%;
        max-height: 100%;
        width: auto;
        height: auto;
        display: block;
        object-fit: contain;
        transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      }
    }
  }
  
  &:hover .card-image {
    .image-wrapper {
      &::before {
        opacity: 1;
      }
      
      img {
        transform: scale(1.08);
      }
    }
  }
  
  // 内容区域
  .card-content {
    padding: 20px 20px 24px;
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 14px;
    
    @media (max-width: $breakpoint-md) {
      padding: 16px 16px 20px;
      gap: 12px;
    }
  }
  
  // 标签
  .card-meta {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    
    @media (max-width: $breakpoint-md) {
      gap: 6px;
    }
  }
  
  .meta-tag {
    padding: 6px 12px;
    font-size: 0.75rem;
    font-weight: 600;
    border-radius: 8px;
    transition: all 0.3s ease;
    
    @media (max-width: $breakpoint-md) {
      padding: 5px 10px;
      font-size: 0.6875rem;
      border-radius: 6px;
    }
    
    &:nth-child(1) {
      background: linear-gradient(135deg, #dbeafe, #eff6ff);
      color: #2563eb;
    }
    
    &:nth-child(2) {
      background: linear-gradient(135deg, #f3e8ff, #faf5ff);
      color: #7c3aed;
    }
    
    &:nth-child(3) {
      background: linear-gradient(135deg, #fce7f3, #fdf2f8);
      color: #db2777;
    }
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
  }
  
  // 标题
  .card-title {
    font-size: 1.25rem;
    font-weight: 700;
    line-height: 1.4;
    margin: 0;
    color: #1e293b;
    transition: color 0.3s ease;
    
    @media (max-width: $breakpoint-md) {
      font-size: 1.125rem;
    }
  }
  
  &:hover .card-title {
    color: #7c3aed;
  }
  
  // 描述
  .card-description {
    font-size: 0.875rem;
    color: #64748b;
    line-height: 1.6;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    flex: 1;
    
    @media (max-width: $breakpoint-md) {
      font-size: 0.8125rem;
      line-height: 1.55;
      -webkit-line-clamp: 3;
    }
  }
  
  // 按钮
  .card-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 12px 24px;
    background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
    color: white;
    font-size: 0.875rem;
    font-weight: 600;
    text-decoration: none;
    border-radius: 12px;
    margin-top: auto;
    transition: all 0.3s ease;
    box-shadow: 0 4px 14px rgba(124, 58, 237, 0.3);
    
    @media (max-width: $breakpoint-md) {
      padding: 11px 20px;
      font-size: 0.8125rem;
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(124, 58, 237, 0.25);
    }
    
    .link-text {
      letter-spacing: 0.3px;
    }
    
    .link-arrow {
      display: flex;
      align-items: center;
      transition: transform 0.3s ease;
      
      svg {
        width: 16px;
        height: 16px;
        
        @media (max-width: $breakpoint-md) {
          width: 14px;
          height: 14px;
        }
      }
    }
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(124, 58, 237, 0.4);
      background: linear-gradient(135deg, #6d28d9 0%, #9333ea 100%);
      
      .link-arrow {
        transform: translateX(4px);
      }
    }
    
    &:active {
      transform: translateY(0);
      
      @media (max-width: $breakpoint-md) {
        transform: scale(0.97);
      }
    }
  }
}

// 箭头按钮
.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 10;
  box-shadow: 
    0 4px 12px rgba(0, 0, 0, 0.08),
    0 2px 4px rgba(0, 0, 0, 0.04);
  
  svg {
    width: 24px;
    height: 24px;
    color: #6b7280;
    transition: all 0.3s ease;
  }
  
  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #8b5cf6, #ec4899);
    transform: translateY(-50%) scale(1.1);
    box-shadow: 0 8px 24px rgba(139, 92, 246, 0.35);
    
    svg {
      color: white;
    }
  }
  
  &:active:not(:disabled) {
    transform: translateY(-50%) scale(1.05);
  }
  
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
  
  &.carousel-btn-prev {
    left: -24px;
  }
  
  &.carousel-btn-next {
    right: -24px;
  }
  
  @media (max-width: $breakpoint-md) {
    width: 40px;
    height: 40px;
    
    svg {
      width: 20px;
      height: 20px;
    }
    
    &.carousel-btn-prev {
      left: -16px;
    }
    
    &.carousel-btn-next {
      right: -16px;
    }
  }
  
  @media (max-width: $breakpoint-sm) {
    &.carousel-btn-prev {
      left: 8px;
    }
    
    &.carousel-btn-next {
      right: 8px;
    }
  }
}

// 指示器
.carousel-indicators {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 32px;
  position: relative;
  z-index: 1;
  
  .indicator {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: rgba(139, 92, 246, 0.2);
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    padding: 0;
    
    &:hover:not(:disabled):not(.active) {
      background: rgba(139, 92, 246, 0.4);
      transform: scale(1.2);
    }
    
    &.active {
      width: 32px;
      border-radius: 5px;
      background: linear-gradient(135deg, #8b5cf6, #ec4899);
      box-shadow: 0 2px 8px rgba(139, 92, 246, 0.4);
    }
    
    &:disabled {
      cursor: not-allowed;
    }
  }
}

// 桌面端显示/隐藏
.desktop-only {
  @media (max-width: $breakpoint-md) {
    display: none !important;
  }
}

// 手机端控制按钮
.mobile-controls {
  display: none;
  
  @media (max-width: $breakpoint-md) {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
    margin-top: 20px;
    padding: 0 16px;
  }
}

.mobile-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: white;
  border: 1px solid rgba(139, 92, 246, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  
  svg {
    width: 18px;
    height: 18px;
    color: #8b5cf6;
    transition: all 0.3s ease;
  }
  
  &:active:not(:disabled) {
    transform: scale(0.92);
    background: linear-gradient(135deg, #8b5cf6, #a855f7);
    border-color: transparent;
    box-shadow: 0 6px 20px rgba(139, 92, 246, 0.3);
    
    svg {
      color: white;
    }
  }
  
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
}
</style>
