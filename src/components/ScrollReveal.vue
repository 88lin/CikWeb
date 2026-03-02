<!--
 * @Description: 滚动淡入动画包装组件
 * @Author: Cik
 * @Date: 2026-02-27
-->

<template>
  <div 
    ref="elementRef" 
    class="scroll-reveal"
    :class="[
      isVisible ? 'is-visible' : '',
      `animation-${animation}`,
      `delay-${delay}`
    ]"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useScrollReveal } from '@/composables/useScrollReveal'

// ==================== Props ====================

interface Props {
  animation?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom' | 'fade'
  delay?: 0 | 1 | 2 | 3 | 4 | 5
  threshold?: number
}

const props = withDefaults(defineProps<Props>(), {
  animation: 'fade-up',
  delay: 0,
  threshold: 0.1
})

// ==================== 滚动监听 ====================

const { elementRef, isVisible } = useScrollReveal({
  threshold: props.threshold
})
</script>

<style scoped lang="scss">
.scroll-reveal {
  will-change: transform, opacity;
  transition: 
    opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

// ==================== 动画类型 ====================

// 向上淡入
.animation-fade-up {
  opacity: 0;
  transform: translateY(24px);
  
  &.is-visible {
    opacity: 1;
    transform: translateY(0);
  }
}

// 向下淡入
.animation-fade-down {
  opacity: 0;
  transform: translateY(-24px);
  
  &.is-visible {
    opacity: 1;
    transform: translateY(0);
  }
}

// 向左淡入
.animation-fade-left {
  opacity: 0;
  transform: translateX(24px);
  
  &.is-visible {
    opacity: 1;
    transform: translateX(0);
  }
}

// 向右淡入
.animation-fade-right {
  opacity: 0;
  transform: translateX(-24px);
  
  &.is-visible {
    opacity: 1;
    transform: translateX(0);
  }
}

// 缩放淡入
.animation-zoom {
  opacity: 0;
  transform: scale(0.95);
  
  &.is-visible {
    opacity: 1;
    transform: scale(1);
  }
}

// 纯淡入
.animation-fade {
  opacity: 0;
  
  &.is-visible {
    opacity: 1;
  }
}

// ==================== 延迟 ====================

.delay-0 { transition-delay: 0ms; }
.delay-1 { transition-delay: 50ms; }
.delay-2 { transition-delay: 100ms; }
.delay-3 { transition-delay: 150ms; }
.delay-4 { transition-delay: 200ms; }
.delay-5 { transition-delay: 250ms; }
</style>
