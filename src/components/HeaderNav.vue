<!--
 * @Description: 顶部导航栏组件
 * @Author: Cik
 * @Date: 2026-02-27
-->

<template>
  <!-- 桌面端：顶部导航栏 -->
  <header class="header-nav desktop-nav" :class="{ scrolled: isScrolled }">
    <div class="nav-capsule">
      <!-- 动态光晕背景 -->
      <div class="nav-glow"></div>
      
      <!-- Logo -->
      <router-link to="/" class="logo" @click="scrollToTop">
        <img :src="logoImage" alt="Logo" />
      </router-link>

      <!-- 导航菜单 -->
      <nav class="nav-menu">
        <template v-for="item in navItems" :key="item.name">
          <!-- 锚点导航 -->
          <a 
            v-if="item.anchor"
            class="nav-item"
            @click="scrollToSection(item.anchor)"
          >
            <span class="nav-text">{{ item.name }}</span>
          </a>
          <!-- 路由导航 -->
          <router-link
            v-else-if="item.path"
            :to="item.path"
            class="nav-item"
          >
            <span class="nav-text">{{ item.name }}</span>
          </router-link>
          <!-- 外部链接（如博客） -->
          <a 
            v-else-if="item.external"
            :href="item.url"
            target="_blank"
            rel="noopener noreferrer"
            class="nav-item always-active"
          >
            <span class="nav-text">{{ item.name }}</span>
          </a>
        </template>
      </nav>

      <!-- 操作区域（桌面端不显示） -->
      <div class="nav-actions"></div>
    </div>
  </header>

  <!-- 手机端：右下角浮动导航 -->
  <div class="mobile-nav-wrapper">
    <!-- 首次访问问候语 -->
    <Transition name="greeting-fade">
      <div v-if="showGreeting" class="mobile-greeting">
        <span class="greeting-text">Hello!</span>
        <div class="greeting-arrow"></div>
      </div>
    </Transition>
    
    <!-- 胶囊容器：头像 + 折叠按钮 -->
    <div class="mobile-nav-capsule">
      <!-- 头像按钮 -->
      <router-link to="/" class="mobile-avatar" @click="scrollToTop">
        <img :src="logoImage" alt="Avatar" />
      </router-link>

      <!-- 折叠菜单按钮（三条横线） -->
      <button class="mobile-menu-toggle" :class="{ active: menuActive }" @click="toggleMenu">
        <span class="line"></span>
        <span class="line"></span>
        <span class="line"></span>
      </button>
    </div>

    <!-- 展开的菜单 -->
    <nav class="mobile-menu" :class="{ active: menuActive }">
      <template v-for="item in navItems" :key="item.name">
        <!-- 锚点导航 -->
        <a 
          v-if="item.anchor"
          class="mobile-nav-item"
          @click="scrollToSection(item.anchor)"
        >
          <span class="nav-text">{{ item.name }}</span>
        </a>
        <!-- 路由导航 -->
        <router-link
          v-else-if="item.path"
          :to="item.path"
          class="mobile-nav-item"
          @click="menuActive = false"
        >
          <span class="nav-text">{{ item.name }}</span>
        </router-link>
        <!-- 外部链接（如博客）- 带分割线 -->
        <template v-else-if="item.external">
          <div class="mobile-menu-divider"></div>
          <a 
            :href="item.url"
            target="_blank"
            rel="noopener noreferrer"
            class="mobile-nav-item blog-capsule"
          >
            <span class="nav-text">{{ item.name }}</span>
          </a>
        </template>
      </template>
    </nav>

    <!-- 遮罩层 -->
    <div 
      class="mobile-menu-overlay" 
      :class="{ active: menuActive }"
      @click="menuActive = false"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import logoImage from '@/assets/img/Cik!cover.png'

const router = useRouter()
const route = useRoute()

const menuActive = ref(false)
const isScrolled = ref(false)
const activeAnchor = ref('')
const showGreeting = ref(false)

// 导航项类型定义
interface NavItem {
  name: string
  anchor?: string
  path?: string
  external?: boolean
  url?: string
}

// 导航项配置：anchor 表示锚点导航，external 表示外部链接，path 表示路由导航
const navItems: NavItem[] = [
  { name: '推荐', anchor: 'featured' },
  { name: '工具', anchor: 'tools' },
  { name: '媒体', anchor: 'media' },
  { name: '文章', anchor: 'posts' },
  { name: '博客', external: true, url: 'https://blog.cikcc.com' },
]

// 滚动到指定区域
const scrollToSection = async (anchor: string) => {
  // 如果不在首页，先跳转到首页
  if (route.path !== '/') {
    await router.push('/')
    // 等待元素出现
    await waitForElement(anchor)
  }
  
  const element = document.getElementById(anchor)
  if (element) {
    const headerHeight = 90 // 导航栏高度
    const elementPosition = element.getBoundingClientRect().top + window.scrollY
    const offsetPosition = elementPosition - headerHeight
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
    
    activeAnchor.value = anchor
    menuActive.value = false // 关闭移动端菜单
  }
}

// 等待元素出现
const waitForElement = (id: string, timeout = 2000): Promise<void> => {
  return new Promise((resolve) => {
    const startTime = Date.now()
    const checkElement = () => {
      const element = document.getElementById(id)
      if (element) {
        resolve()
      } else if (Date.now() - startTime < timeout) {
        requestAnimationFrame(checkElement)
      } else {
        resolve() // 超时后也继续执行
      }
    }
    checkElement()
  })
}

const toggleMenu = () => {
  menuActive.value = !menuActive.value
}

// 滚动到页面顶部
const scrollToTop = async () => {
  // 如果不在首页，先跳转到首页
  if (route.path !== '/') {
    await router.push('/')
    await new Promise(resolve => setTimeout(resolve, 100))
  }
  
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
  
  activeAnchor.value = ''
  menuActive.value = false
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
  
  // 更新当前激活的锚点
  if (route.path === '/') {
    const anchors = ['featured', 'tools', 'media', 'posts']
    for (const anchor of anchors.reverse()) {
      const element = document.getElementById(anchor)
      if (element) {
        const rect = element.getBoundingClientRect()
        if (rect.top <= 150) {
          activeAnchor.value = anchor
          return
        }
      }
    }
    activeAnchor.value = ''
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll()
  
  // 每次刷新页面显示问候语（仅手机端）
  if (window.innerWidth <= 768) {
    // 延迟显示问候语
    setTimeout(() => {
      showGreeting.value = true
      // 3秒后自动隐藏
      setTimeout(() => {
        showGreeting.value = false
      }, 3000)
    }, 800)
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped lang="scss">
.header-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 16px 0;
  pointer-events: none;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  &.scrolled {
    padding: 10px 0;
  }

  // 手机端隐藏桌面导航
  @media (max-width: $breakpoint-md) {
    display: none;
  }
}

// 胶囊导航框 - 简洁白色风格
.nav-capsule {
  max-width: 520px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px;
  position: relative;
  
  // 纯白背景
  background: white;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  
  // 淡灰边框
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 100px;
  
  // 柔和阴影
  box-shadow: 
    0 4px 24px rgba(0, 0, 0, 0.06),
    0 2px 8px rgba(0, 0, 0, 0.04);
  
  pointer-events: all;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);

  &:hover {
    transform: scale(1.02);
    box-shadow: 
      0 8px 32px rgba(139, 92, 246, 0.15),
      0 4px 12px rgba(0, 0, 0, 0.08);
    border-color: rgba(139, 92, 246, 0.2);
  }

  .scrolled & {
    max-width: 480px;
    padding: 6px;
  }

  @media (max-width: $breakpoint-md) {
    max-width: calc(100% - 32px);
    padding: 8px 10px 8px 8px;
  }
}

// 动态光晕 - 隐藏
.nav-glow {
  display: none;
}

// Logo - 简约圆形
.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #f8fafc;
  border: 1px solid rgba(0, 0, 0, 0.06);
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  
  .scrolled & {
    width: 44px;
    height: 44px;
  }

  &:hover {
    transform: scale(1.1) rotate(5deg);
    box-shadow: 0 4px 16px rgba(139, 92, 246, 0.25);
    border-color: rgba(139, 92, 246, 0.3);
  }
  
  img {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    object-fit: cover;
    transition: all 0.3s ease;
    
    .scrolled & {
      width: 34px;
      height: 34px;
    }
  }
}

// 导航菜单
.nav-menu {
  display: flex;
  gap: 4px;
  flex: 1;
  justify-content: center;
  align-items: center;

  @media (max-width: $breakpoint-md) {
    position: fixed;
    top: 80px;
    left: 50%;
    transform: translateX(-50%) translateY(-10px);
    width: calc(100% - 32px);
    max-width: 320px;
    flex-direction: column;
    gap: 4px;
    background: white;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    padding: 12px;
    border-radius: 20px;
    border: 1px solid rgba(0, 0, 0, 0.06);
    box-shadow: 
      0 16px 48px rgba(0, 0, 0, 0.12),
      0 4px 16px rgba(0, 0, 0, 0.08);
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &.active {
      opacity: 1;
      visibility: visible;
      pointer-events: all;
      transform: translateX(-50%) translateY(0);
    }
  }
}

// 导航项 - 简洁文字风格
.nav-item {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: 500;
  color: #374151;
  padding: 10px 20px;
  border-radius: 100px;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  white-space: nowrap;
  cursor: pointer;
  text-decoration: none;
  
  .nav-text {
    position: relative;
  }
  
  // 滚动时缩小 padding
  .scrolled & {
    padding: 8px 14px;
    font-size: 14px;
  }

  &:hover {
    color: #8b5cf6;
    background: rgba(139, 92, 246, 0.08);
    transform: translateY(-2px);
  }

  // 锚点选中态高亮
  &.is-active {
    color: white;
    background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%);
    box-shadow: 0 4px 16px rgba(139, 92, 246, 0.35);
  }

  // 博客始终高亮
  &.always-active {
    color: white;
    background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%);
    box-shadow: 0 4px 16px rgba(139, 92, 246, 0.35);
    
    &:hover {
      background: linear-gradient(135deg, #7c3aed 0%, #9333ea 100%);
      box-shadow: 0 6px 20px rgba(139, 92, 246, 0.45);
      transform: translateY(-2px) scale(1.02);
    }
  }

  @media (max-width: $breakpoint-md) {
    width: 100%;
    padding: 14px 18px;
    font-size: 15px;
    border-radius: 12px;
  }
}

// 操作区域
.nav-actions {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
}

// 菜单切换按钮 - 简洁风格
.menu-toggle {
  display: none;
  position: relative;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
  padding: 0;
  transition: all 0.3s ease;
  
  background: #f8fafc;
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: none;

  &:hover {
    background: rgba(139, 92, 246, 0.08);
    border-color: rgba(139, 92, 246, 0.2);
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: $breakpoint-md) {
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
    gap: 5px;
    padding: 12px;
  }

  // 四个圆点
  .dot {
    width: 5px;
    height: 5px;
    background: #6b7280;
    border-radius: 50%;
    transition: all 0.3s ease;
  }
  
  // 激活状态
  &.active {
    background: linear-gradient(135deg, #8b5cf6, #a855f7);
    border-color: transparent;
    
    .dot {
      background: white;
      
      &:nth-child(1) { transform: translate(2px, 2px); }
      &:nth-child(2) { transform: translate(-2px, 2px); }
      &:nth-child(3) { transform: translate(2px, -2px); }
      &:nth-child(4) { transform: translate(-2px, -2px); }
    }
  }
}

// 页面上方留白（已移除，导航栏悬浮在内容上方）
:global(body) {
  padding-top: 0;
}

// ===== 手机端导航栏 =====
.mobile-nav-wrapper {
  display: none;
  
  @media (max-width: $breakpoint-md) {
    display: block;
    position: fixed;
    bottom: 24px;
    right: 20px;
    z-index: 1000;
  }
}

// 首次访问问候语
.mobile-greeting {
  position: absolute;
  bottom: 70px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  box-shadow: 
    0 4px 16px rgba(139, 92, 246, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  animation: greetingBounce 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  
  .greeting-text {
    display: block;
  }
  
  // 小箭头
  .greeting-arrow {
    position: absolute;
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-top: 7px solid #a855f7;
  }
}

@keyframes greetingBounce {
  0% {
    opacity: 0;
    transform: translateX(-50%) translateY(10px) scale(0.8);
  }
  100% {
    opacity: 1;
    transform: translateX(-50%) translateY(0) scale(1);
  }
}

// 问候语过渡动画
.greeting-fade-enter-active {
  animation: greetingBounce 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.greeting-fade-leave-active {
  transition: all 0.3s ease;
}

.greeting-fade-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-10px) scale(0.9);
}

// 手机端胶囊容器
.mobile-nav-capsule {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 5px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 100px;
  box-shadow: 
    0 4px 24px rgba(0, 0, 0, 0.08),
    0 8px 32px rgba(139, 92, 246, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

// 手机端头像
.mobile-avatar {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border: 2px solid white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  
  &:active {
    transform: scale(0.92);
  }

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }
}

// 手机端折叠菜单按钮（三条横线）
.mobile-menu-toggle {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border: 2px solid white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  flex-shrink: 0;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  
  &:active {
    transform: scale(0.92);
  }

  // 三条横线
  .line {
    width: 18px;
    height: 2px;
    background: #64748b;
    border-radius: 2px;
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  
  // 激活状态：变成 X
  &.active {
    background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%);
    border-color: rgba(139, 92, 246, 0.3);
    box-shadow: 0 4px 16px rgba(139, 92, 246, 0.3);
    
    .line {
      background: white;
      
      &:nth-child(1) {
        transform: translateY(6px) rotate(45deg);
      }
      
      &:nth-child(2) {
        opacity: 0;
        transform: scaleX(0);
      }
      
      &:nth-child(3) {
        transform: translateY(-6px) rotate(-45deg);
      }
    }
  }
}

// 手机端展开菜单
.mobile-menu {
  position: absolute;
  bottom: 66px;
  right: 0;
  left: 0;
  width: 100%;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    0 16px 48px rgba(139, 92, 246, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
  padding: 6px;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transform: translateY(8px) scale(0.96);
  transform-origin: bottom center;
  transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);

  &.active {
    opacity: 1;
    visibility: visible;
    pointer-events: all;
    transform: translateY(0) scale(1);
  }
}

// 手机端菜单项
.mobile-nav-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 14px 16px;
  font-size: 15px;
  font-weight: 600;
  color: #475569;
  border-radius: 14px;
  transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
  cursor: pointer;
  text-decoration: none;
  margin-bottom: 4px;
  background: transparent;
  position: relative;
  overflow: hidden;

  &:last-child {
    margin-bottom: 0;
  }

  // 悬停效果
  &:hover {
    color: #8b5cf6;
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(168, 85, 247, 0.05) 100%);
    transform: translateX(4px);
  }

  &:active {
    transform: scale(0.97) translateX(2px);
  }

  // 博客始终高亮
  &.always-active {
    color: white;
    background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%);
    box-shadow: 
      0 4px 16px rgba(139, 92, 246, 0.35),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
    
    &:hover {
      background: linear-gradient(135deg, #7c3aed 0%, #9333ea 100%);
      box-shadow: 0 6px 20px rgba(139, 92, 246, 0.45);
      transform: translateX(4px);
    }
  }
}

// 手机端菜单分割线
.mobile-menu-divider {
  height: 1px;
  margin: 8px 12px 12px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(139, 92, 246, 0.2) 20%,
    rgba(139, 92, 246, 0.2) 80%,
    transparent 100%
  );
}

// 博客胶囊按钮
.blog-capsule {
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content !important;
  margin: 0 auto;
  padding: 10px 22px !important;
  font-size: 14px !important;
  border-radius: 100px !important;
  color: white;
  background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%);
  box-shadow: 
    0 3px 12px rgba(139, 92, 246, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  
  &:hover {
    background: linear-gradient(135deg, #7c3aed 0%, #9333ea 100%);
    box-shadow: 0 4px 16px rgba(139, 92, 246, 0.4);
    transform: scale(1.03) !important;
  }
  
  &:active {
    transform: scale(0.97) !important;
  }
}

// 手机端遮罩层
.mobile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.2);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: all 0.35s ease;
  z-index: -1;

  &.active {
    opacity: 1;
    visibility: visible;
    pointer-events: all;
  }
}

</style>
