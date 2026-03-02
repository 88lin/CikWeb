/**
 * @Description: 滚动淡入动画组合式函数
 * @Author: Cik
 * @Date: 2026-02-27
 */

import { ref, onMounted, onUnmounted } from 'vue'

export interface ScrollRevealOptions {
  threshold?: number      // 触发阈值 (0-1)
  rootMargin?: string     // 触发边距
  once?: boolean          // 是否只触发一次
}

const defaultOptions: ScrollRevealOptions = {
  threshold: 0,
  rootMargin: '0px 0px 100px 0px',
  once: true
}

export function useScrollReveal(options: ScrollRevealOptions = {}) {
  const mergedOptions = { ...defaultOptions, ...options }
  const isVisible = ref(false)
  const elementRef = ref<HTMLElement | null>(null)
  let observer: IntersectionObserver | null = null

  const initObserver = () => {
    if (!elementRef.value) return

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isVisible.value = true
            if (mergedOptions.once && observer) {
              observer.unobserve(entry.target)
            }
          } else if (!mergedOptions.once) {
            isVisible.value = false
          }
        })
      },
      {
        threshold: mergedOptions.threshold,
        rootMargin: mergedOptions.rootMargin
      }
    )

    observer.observe(elementRef.value)
  }

  onMounted(() => {
    initObserver()
  })

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
    }
  })

  return {
    elementRef,
    isVisible
  }
}
