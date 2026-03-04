<!--
 * @Description: 返回顶部按钮组件
 * @Author: Cik
 * @Date: 2026-02-27
-->

<template>
  <transition name="back-top">
    <button 
      v-show="visible" 
      class="back-to-top" 
      @click="scrollToTop" 
      title="返回顶部"
    >
      <!-- 进度圆环 -->
      <svg class="progress-ring" viewBox="0 0 48 48">
        <circle 
          class="progress-ring-bg" 
          cx="24" cy="24" r="20" 
          fill="none" 
          stroke-width="3"
        />
        <circle 
          class="progress-ring-bar" 
          cx="24" cy="24" r="20" 
          fill="none" 
          stroke-width="3"
          :style="{ strokeDashoffset: progressOffset }"
        />
      </svg>
      <!-- 箭头图标 -->
      <span class="arrow-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 19V5M5 12l7-7 7 7"/>
        </svg>
      </span>
    </button>
  </transition>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const visible = ref(false)
const scrollProgress = ref(0)

// 进度圆环的偏移量
const progressOffset = computed(() => {
  const circumference = 2 * Math.PI * 20 // r=20
  return circumference - (scrollProgress.value / 100) * circumference
})

const handleScroll = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
  
  visible.value = scrollTop > 300
  scrollProgress.value = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll() // 初始化
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped lang="scss">
.back-to-top {
  position: fixed;
  bottom: 32px;
  right: 32px;
  width: 52px;
  height: 52px;
  background: rgba(255, 255, 255, 0.95);
  border: none;
  border-radius: 16px;
  cursor: pointer;
  box-shadow: 
    0 4px 20px rgba(0, 0, 0, 0.08),
    0 8px 32px rgba(0, 0, 0, 0.06);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(12px);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, 
      rgba(99, 102, 241, 0.08) 0%, 
      rgba(168, 85, 247, 0.08) 100%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
    border-radius: inherit;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 
      0 8px 28px rgba(99, 102, 241, 0.2),
      0 12px 40px rgba(0, 0, 0, 0.1);
    
    &::before {
      opacity: 1;
    }
    
    .arrow-icon {
      transform: translateY(-2px);
      color: #6366f1;
    }
    
    .progress-ring-bar {
      stroke: #6366f1;
    }
  }

  &:active {
    transform: translateY(-2px) scale(0.98);
  }

  // 手机端隐藏返回顶部按钮
  @media (max-width: 768px) {
    display: none;
  }
}

// 进度圆环
.progress-ring {
  position: absolute;
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
  pointer-events: none;
}

.progress-ring-bg {
  stroke: rgba(99, 102, 241, 0.12);
}

.progress-ring-bar {
  stroke: rgba(99, 102, 241, 0.6);
  stroke-dasharray: 125.66; // 2 * PI * 20
  stroke-linecap: round;
  transition: stroke-dashoffset 0.2s ease, stroke 0.3s ease;
}

// 箭头图标
.arrow-icon {
  position: relative;
  z-index: 2;
  width: 22px;
  height: 22px;
  color: #64748b;
  transition: all 0.3s ease;
  
  svg {
    width: 100%;
    height: 100%;
  }
}

// 进入/离开动画
.back-top-enter-active {
  animation: back-top-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.back-top-leave-active {
  animation: back-top-out 0.3s cubic-bezier(0.4, 0, 1, 1);
}

@keyframes back-top-in {
  0% {
    opacity: 0;
    transform: translateY(20px) scale(0.8);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes back-top-out {
  0% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateY(20px) scale(0.8);
  }
}
</style>
