<!--
 * @Description: Heo 视觉引导区组件
 * @Author: Cik
 * @Date: 2026-02-27
-->

<template>
  <section class="heo">
    <div class="heo-container">
      <!-- 左侧文字内容区 -->
      <div class="heo-left">
        <!-- 主标题 -->
        <h1 class="main-title">
          <span class="title-dark">{{ data.title.line1 }}</span>
          <span class="title-gradient">{{ data.title.line2 }}</span>
        </h1>

        <!-- 副标题 -->
        <p class="description">{{ data.subtitle }}</p>

        <!-- 社交媒体链接组（桌面端在左侧显示） -->
        <div class="social-group desktop-social">
          <router-link :to="data.buttons.about.link" class="btn btn-about">
            <svg class="btn-icon" viewBox="0 0 24 24" fill="currentColor">
              <path :d="data.buttons.about.iconPath"/>
            </svg>
            <span class="btn-text">{{ data.buttons.about.text }}</span>
          </router-link>
          <div class="social-links">
            <a :href="data.socialLinks.github.url" target="_blank" rel="noopener noreferrer" class="social-link github" :title="data.socialLinks.github.name">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path :d="data.socialLinks.github.iconPath"/>
              </svg>
            </a>
            <a :href="data.socialLinks.bilibili.url" target="_blank" rel="noopener noreferrer" class="social-link bilibili" :title="data.socialLinks.bilibili.name">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path :d="data.socialLinks.bilibili.iconPath"/>
              </svg>
            </a>
            <a :href="data.socialLinks.email.url" class="social-link email" :title="data.socialLinks.email.name">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path :d="data.socialLinks.email.iconPath"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- 手机端：卡片装饰区（放在副标题下方） -->
      <div class="heo-right mobile-cards">
        <!-- 主卡片 -->
        <div class="quote-card main-card">
          <div class="card-content">
            <p class="quote-text">"{{ data.quoteCard.quote }}"</p>
            <div class="quote-author">
              <img :src="data.quoteCard.author.avatar" :alt="data.quoteCard.author.name" class="author-avatar" />
              <div class="author-info">
                <span class="author-name">{{ data.quoteCard.author.name }}</span>
                <span class="author-title">{{ data.quoteCard.author.title }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 小装饰卡片 -->
        <div class="mini-card">
          <svg class="mini-icon" viewBox="0 0 24 24" fill="currentColor">
            <path :d="data.miniCard.iconPath"/>
          </svg>
          <p class="mini-text">{{ data.miniCard.text }}</p>
        </div>
      </div>

      <!-- 手机端：社交媒体链接组 -->
      <div class="social-group mobile-social">
        <router-link :to="data.buttons.about.link" class="btn btn-about">
          <svg class="btn-icon" viewBox="0 0 24 24" fill="currentColor">
            <path :d="data.buttons.about.iconPath"/>
          </svg>
          <span class="btn-text">{{ data.buttons.about.text }}</span>
        </router-link>
        <div class="social-links">
          <a :href="data.socialLinks.github.url" target="_blank" rel="noopener noreferrer" class="social-link github" :title="data.socialLinks.github.name">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path :d="data.socialLinks.github.iconPath"/>
            </svg>
          </a>
          <a :href="data.socialLinks.bilibili.url" target="_blank" rel="noopener noreferrer" class="social-link bilibili" :title="data.socialLinks.bilibili.name">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path :d="data.socialLinks.bilibili.iconPath"/>
            </svg>
          </a>
          <a :href="data.socialLinks.email.url" class="social-link email" :title="data.socialLinks.email.name">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path :d="data.socialLinks.email.iconPath"/>
            </svg>
          </a>
        </div>
      </div>

      <!-- 桌面端：右侧卡片装饰区 -->
      <div class="heo-right desktop-cards">
        <!-- 主卡片 -->
        <div class="quote-card main-card">
          <div class="card-content">
            <p class="quote-text">"{{ data.quoteCard.quote }}"</p>
            <div class="quote-author">
              <img :src="data.quoteCard.author.avatar" :alt="data.quoteCard.author.name" class="author-avatar" />
              <div class="author-info">
                <span class="author-name">{{ data.quoteCard.author.name }}</span>
                <span class="author-title">{{ data.quoteCard.author.title }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 小装饰卡片 -->
        <div class="mini-card">
          <svg class="mini-icon" viewBox="0 0 24 24" fill="currentColor">
            <path :d="data.miniCard.iconPath"/>
          </svg>
          <p class="mini-text">{{ data.miniCard.text }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import avatarImg from '@/assets/img/Cik!cover.png'

// 所有数据统一存放在 data 对象中
const data = reactive({
  // 小标签
  tag: {
    text: 'SYSTEM ONLINE',
    iconPath: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' // 勾选圆圈图标
  },

  // 主标题
  title: {
    line1: 'CIKCC CODING',
    line2: 'Digital enthusiasts'
  },

  // 副标题
  subtitle: '分享技术知识、数字生活，探索技术的边界，记录生活的点滴。',

  // 按钮
  buttons: {
    about: {
      text: '了解我',
      link: '/about',
      iconPath: 'M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0-14v4m0 4h.01' // info图标
    }
  },

  // 社交媒体链接
  socialLinks: {
    github: {
      name: 'GitHub',
      url: 'https://github.com/cikheo',
      iconPath: 'M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z' // GitHub图标
    },
    bilibili: {
      name: 'Bilibili',
      url: 'https://space.bilibili.com/1212627088',
      iconPath: 'M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c0-.373.129-.689.386-.947.258-.257.574-.386.947-.386zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373z' // Bilibili图标
    },
    email: {
      name: 'Email',
      url: 'mailto:cikheo@qq.com',
      iconPath: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z' // Email图标
    }
  },

  // 引用卡片
  quoteCard: {
    quote: '人生如逆旅，我亦是行人，但求步履从容，不负光阴',
    author: {
      name: 'Cik',
      title: '数码爱好者',
      avatar: avatarImg
    }
  },

  // 小装饰卡片
  miniCard: {
    iconPath: 'M13 10V3L4 14h7v7l9-11h-7z', // 闪电图标
    text: '摒弃繁杂 · 回归本质 · 让美好自然呈现'
  }
})
</script>

<style scoped lang="scss">
// 轻奢紫主色变量
$luxe-primary: #8B5CF6;
$luxe-secondary: #EC4899;
$luxe-dark: #1F2937;
$luxe-light: #F3F4F6;

.heo {
  min-height: 70vh;
  padding: 60px 0;
  position: relative;
  display: flex;
  align-items: center;
  
  // 背景图片 + 浅白色遮罩
  background-image: url('@/assets/img/heo.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, 0.85);
    z-index: 1;
  }
  
  // 4K大屏适配 - 减少上下空白
  @media (min-width: 2560px) {
    min-height: auto;
    padding: 280px 0 180px 0;
  }

  @media (max-width: $breakpoint-md) {
    padding: 60px 0 80px 0;
    min-height: auto;
  }
}

.heo-container {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 $spacing-xl;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $spacing-xl * 3;
  align-items: center;
  
  // 4K大屏适配 - 单列居中布局
  @media (min-width: 2560px) {
    max-width: 1400px;
    grid-template-columns: 1.2fr 1fr;
    gap: $spacing-xl * 3;
    padding: 0 $spacing-xl * 1.5;
  }

  @media (max-width: $breakpoint-md) {
    grid-template-columns: 1fr;
    padding: 0 $spacing-lg;
    gap: $spacing-lg;
  }
}

// 左侧内容区
.heo-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  
  @media (max-width: $breakpoint-md) {
    align-items: center;
    order: 1; // 标题和副标题在最上方
  }
}

// 小标签
.tag-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  position: relative;
  overflow: hidden;
  border-radius: 50px;
  margin-bottom: $spacing-lg;
  
  // 浅色半透明背景 + 绿色边框（在线状态）
  background: rgba(240, 253, 244, 0.9);
  border: 1.5px solid #22c55e;
  box-shadow: 
    0 0 20px rgba(34, 197, 94, 0.2),
    0 3px 10px rgba(34, 197, 94, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  
  // 呼吸脉冲光晕
  &::before {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 50px;
    background: linear-gradient(90deg, transparent, rgba(34, 197, 94, 0.5), transparent);
    animation: shimmer 3s infinite;
    opacity: 0.6;
  }
  
  // 内发光渐变
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50px;
    background: radial-gradient(circle at 30% 50%, rgba(34, 197, 94, 0.15), transparent 70%);
    animation: pulse-glow 2s ease-in-out infinite;
  }
  
  .tag-icon {
    position: relative;
    z-index: 1;
    width: 14px;
    height: 14px;
    color: #16a34a;
    animation: pulse-icon 1.5s ease-in-out infinite;
    filter: drop-shadow(0 0 3px rgba(34, 197, 94, 0.5));
  }
  
  span {
    position: relative;
    z-index: 1;
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    color: #15803d;
    text-transform: uppercase;
    text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
    animation: text-pulse 2s ease-in-out infinite;
  }
}

// 动画定义
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

@keyframes pulse-icon {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.15);
  }
}

@keyframes pulse-glow {
  0%, 100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.6;
  }
}

@keyframes text-pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.85;
  }
}

// 主标题
.main-title {
  margin-bottom: $spacing-lg;
  
  .title-dark {
    display: block;
    font-size: clamp(2rem, 4vw, 3.5rem);
    font-weight: 700;
    color: $luxe-dark;
    line-height: 1.15;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    letter-spacing: 0.02em;
    
    // 4K大屏适配
    @media (min-width: 2560px) {
      font-size: 4.5rem;
      letter-spacing: 0.03em;
    }
    
    // 手机端调整
    @media (max-width: $breakpoint-md) {
      font-size: clamp(1.75rem, 6vw, 2.5rem);
      line-height: 1.2;
    }
  }
  
  .title-gradient {
    display: block;
    font-size: clamp(2rem, 4vw, 3.5rem);
    font-weight: 700;
    line-height: 1.15;
    background: linear-gradient(90deg, $luxe-primary, #a855f7, $luxe-secondary);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
    letter-spacing: -0.01em;
    white-space: nowrap;
    
    // 4K大屏适配
    @media (min-width: 2560px) {
      font-size: 4.5rem;
      letter-spacing: 0.01em;
    }
    
    // 手机端调整
    @media (max-width: $breakpoint-md) {
      font-size: clamp(1.75rem, 6vw, 2.5rem);
      line-height: 1.2;
      white-space: normal;
    }
  }
}

// 副标题
.description {
  font-size: 1.125rem;
  line-height: 1.75;
  color: #6B7280;
  margin-bottom: $spacing-xl;
  max-width: 512px;
  
  // 4K大屏适配
  @media (min-width: 2560px) {
    font-size: 1.375rem;
    max-width: 640px;
    line-height: 1.8;
  }
  
  // 手机端调整
  @media (max-width: $breakpoint-md) {
    font-size: 1rem;
    line-height: 1.65;
    margin-bottom: $spacing-lg;
    max-width: 100%;
  }
}

// 社交媒体组
.social-group {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: $spacing-lg;

  // 桌面端社交组
  &.desktop-social {
    margin-bottom: 0;
    
    @media (max-width: $breakpoint-md) {
      display: none;
    }
  }

  // 手机端社交组
  &.mobile-social {
    display: none;
    
    @media (max-width: $breakpoint-md) {
      display: flex;
      order: 3; // 放在卡片区域下方
    }
  }

  @media (max-width: $breakpoint-sm) {
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: $spacing-md;
    flex-wrap: nowrap;
  }
}

// 了解我们按钮
.btn-about {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 32px;
  border-radius: 999px;
  font-size: 0.9375rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  
  // 透明背景胶囊样式
  background: transparent;
  border: 2px solid rgba(139, 92, 246, 0.4);
  color: #8b5cf6;
  box-shadow: 0 0 0 1px rgba(139, 92, 246, 0.1);
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #8b5cf6, #6366f1);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 0;
  }
  
  // 确保文字和图标始终在最上层
  .btn-text, .btn-icon {
    position: relative;
    z-index: 1;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 
      0 12px 28px rgba(139, 92, 246, 0.3),
      0 6px 12px rgba(99, 102, 241, 0.2);
    color: white;
    
    &::before {
      opacity: 1;
    }
  }
  
  &:active {
    transform: translateY(0);
  }
  
  .btn-icon {
    width: 16px;
    height: 16px;
    transition: all 0.3s ease;
  }
  
  @media (max-width: $breakpoint-sm) {
    padding: 12px 24px;
    font-size: 0.875rem;
    flex-shrink: 0;
    
    .btn-icon {
      width: 14px;
      height: 14px;
    }
  }
}

// 社交媒体图标组
.social-links {
  display: flex;
  align-items: center;
  gap: 16px;
  
  @media (max-width: $breakpoint-sm) {
    gap: 12px;
  }
}

.social-link {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  
  svg {
    width: 26px;
    height: 26px;
    position: relative;
    z-index: 1;
    transition: all 0.3s ease;
  }
  
  // 背景动画
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    transition: all 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-4px) scale(1.08);
    
    svg {
      transform: scale(1.1);
    }
  }
  
  // 手机端调整
  @media (max-width: $breakpoint-sm) {
    width: 44px;
    height: 44px;
    
    svg {
      width: 22px;
      height: 22px;
    }
    
    &:active {
      transform: scale(0.92);
    }
  }
  
  // GitHub 样式
  &.github {
    background: #f3f4f6;
    box-shadow: 0 4px 12px rgba(36, 41, 46, 0.1);
    
    svg {
      color: #24292e;
    }
    
    &::before {
      background: linear-gradient(135deg, #24292e, #000);
      opacity: 0;
    }
    
    &:hover {
      box-shadow: 0 12px 24px rgba(36, 41, 46, 0.25);
      
      &::before {
        opacity: 1;
      }
      
      svg {
        color: white;
      }
    }
  }
  
  // Bilibili 样式
  &.bilibili {
    background: #fff0f6;
    box-shadow: 0 4px 12px rgba(251, 114, 153, 0.15);
    
    svg {
      color: #fb7299;
    }
    
    &::before {
      background: linear-gradient(135deg, #fb7299, #ff85a2);
      opacity: 0;
    }
    
    &:hover {
      box-shadow: 0 12px 24px rgba(251, 114, 153, 0.35);
      
      &::before {
        opacity: 1;
      }
      
      svg {
        color: white;
      }
    }
  }
  
  // Email 样式
  &.email {
    background: #f0f4ff;
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.15);
    
    svg {
      color: #6366f1;
    }
    
    &::before {
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      opacity: 0;
    }
    
    &:hover {
      box-shadow: 0 12px 24px rgba(99, 102, 241, 0.35);
      
      &::before {
        opacity: 1;
      }
      
      svg {
        color: white;
      }
    }
  }
}

// 右侧卡片装饰区
.heo-right {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  // 桌面端显示
  &.desktop-cards {
    @media (max-width: $breakpoint-md) {
      display: none;
    }
  }

  // 手机端显示
  &.mobile-cards {
    display: none;
    
    @media (max-width: $breakpoint-md) {
      display: flex;
      flex-direction: row;
      align-items: stretch;
      width: 100%;
      margin-bottom: $spacing-xl;
      gap: $spacing-md;
      order: 2; // 放在副标题下方，社交按钮组上方
      
      // 引用卡片 - 手机端横向紧凑设计
      .quote-card.main-card {
        flex: 1.2;
        width: auto;
        margin-left: 0;
        transform: none;
        border-radius: 18px;
        padding: $spacing-md $spacing-lg;
        background: linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85));
        backdrop-filter: blur(10px);
        border: 1px solid rgba(139, 92, 246, 0.15);
        box-shadow: 
          0 8px 32px rgba(139, 92, 246, 0.12),
          0 4px 16px rgba(139, 92, 246, 0.06),
          inset 0 1px 0 rgba(255,255,255,0.8);
        
        &::before {
          border-radius: 18px;
          opacity: 0.4;
        }
        
        &::after {
          display: none;
        }
        
        &:active {
          transform: scale(0.98);
        }
        
        .quote-text {
          white-space: normal;
          font-size: 0.8125rem;
          line-height: 1.6;
          padding-left: 10px;
          margin-bottom: $spacing-xs;
          color: #4b5563;
          
          &::before {
            width: 3px;
            border-radius: 3px;
          }
        }
        
        .quote-author {
          padding-top: $spacing-xs;
          margin-left: 10px;
          border-top: 1px solid rgba(139, 92, 246, 0.1);
          
          .author-avatar {
            width: 28px;
            height: 28px;
            border: 2px solid white;
            box-shadow: 0 2px 8px rgba(139, 92, 246, 0.15);
          }
          
          .author-info {
            .author-name {
              font-size: 0.6875rem;
            }
            .author-title {
              font-size: 0.5625rem;
            }
          }
        }
      }
      
      // 小卡片 - 手机端精简设计
      .mini-card {
        flex: 0.8;
        width: auto;
        margin-left: 0;
        margin-top: 0;
        transform: none;
        border-radius: 18px;
        padding: $spacing-md;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        background: linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85));
        backdrop-filter: blur(10px);
        border: 1px solid rgba(251, 191, 36, 0.2);
        box-shadow: 
          0 8px 32px rgba(251, 191, 36, 0.1),
          0 4px 16px rgba(251, 191, 36, 0.05),
          inset 0 1px 0 rgba(255,255,255,0.8);
        
        &::before {
          border-radius: 18px;
          opacity: 0.4;
        }
        
        &::after {
          display: none;
        }
        
        &:active {
          transform: scale(0.98);
        }
        
        .mini-icon {
          width: 36px;
          height: 36px;
          padding: 8px;
          border-radius: 12px;
          margin-bottom: $spacing-xs;
        }
        
        .mini-text {
          font-size: 0.6875rem;
          line-height: 1.5;
          letter-spacing: 0.02em;
        }
      }
    }
  }
}

// 主卡片 - 紧凑横向设计（参考小卡片）
.quote-card.main-card {
  position: relative;
  background: white;
  border-radius: 16px;
  padding: $spacing-md $spacing-lg;
  width: 85%;
  transform: rotate(2deg);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  
  // 渐变边框（紫粉渐变）
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 16px;
    padding: 2px;
    background: linear-gradient(135deg, #8b5cf6, #a855f7, #ec4899);
    -webkit-mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0.5;
  }
  
  // 扫光动画
  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.12), transparent);
    transform: rotate(45deg);
    animation: shimmer-quote 4s infinite;
  }
  
  box-shadow: 
    0 12px 24px -6px rgba(139, 92, 246, 0.12),
    0 4px 8px -2px rgba(139, 92, 246, 0.08);
  
  &:hover {
    transform: rotate(0) translateY(-6px) scale(1.03);
    box-shadow: 
      0 20px 40px -10px rgba(139, 92, 246, 0.2),
      0 8px 16px -4px rgba(139, 92, 246, 0.12);
    
    &::before {
      opacity: 1;
    }
  }
  
  .card-content {
    position: relative;
    z-index: 1;
  }
  
  .quote-text {
    font-size: 0.8125rem;
    font-style: italic;
    font-weight: 500;
    color: #4b5563;
    line-height: 1.65;
    margin-bottom: $spacing-sm;
    position: relative;
    padding-left: 8px;
    white-space: nowrap;
    
    // 左侧彩条装饰
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 2px;
      bottom: 2px;
      width: 3px;
      background: linear-gradient(180deg, #8b5cf6, #ec4899);
      border-radius: 2px;
    }
  }
}

.quote-author {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-top: $spacing-xs;
  border-top: 1px solid #f3f4f6;
  margin-left: 8px;
  
  .author-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid white;
    box-shadow: 
      0 3px 6px rgba(0, 0, 0, 0.08),
      0 0 0 1px rgba(139, 92, 246, 0.08);
    transition: all 0.3s ease;
    flex-shrink: 0;
    
    &:hover {
      transform: scale(1.05);
      box-shadow: 
        0 4px 8px rgba(139, 92, 246, 0.15),
        0 0 0 2px rgba(139, 92, 246, 0.12);
    }
  }
  
  .author-info {
    display: flex;
    flex-direction: column;
    gap: 1px;
    min-width: 0;
    
    .author-name {
      font-size: 0.75rem;
      font-weight: 600;
      color: $luxe-dark;
      line-height: 1.3;
      letter-spacing: -0.01em;
    }
    
    .author-title {
      font-size: 0.65rem;
      color: #9ca3af;
      line-height: 1.3;
      font-weight: 500;
    }
  }
}

// 小装饰卡片 - 彩虹边框 + 闪电图标
.mini-card {
  position: relative;
  background: white;
  border-radius: 18px;
  padding: $spacing-lg;
  width: 75%;
  margin-left: 50px;
  margin-top: $spacing-xl * 1.2;
  transform: rotate(-3deg);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: 12px;
  
  // 渐变边框
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 18px;
    padding: 2.5px;
    background: linear-gradient(120deg, #fbbf24, #f59e0b, #ec4899, #8b5cf6, #6366f1);
    -webkit-mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0.6;
    animation: rotate-border 6s linear infinite;
  }
  
  // 动态光带
  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(90deg, transparent, rgba(251, 191, 36, 0.15), transparent);
    transform: rotate(45deg);
    animation: shimmer-mini 3s infinite;
  }
  
  box-shadow: 
    0 15px 30px -8px rgba(251, 191, 36, 0.15),
    0 6px 12px -4px rgba(251, 191, 36, 0.1);
  
  &:hover {
    transform: rotate(0) translateY(-8px) scale(1.04);
    box-shadow: 
      0 25px 50px -12px rgba(251, 191, 36, 0.25),
      0 10px 20px -6px rgba(251, 191, 36, 0.15);
    
    &::before {
      opacity: 1;
    }
    
    .mini-icon {
      transform: scale(1.15) rotate(-10deg);
    }
  }
  
  .mini-icon {
    position: relative;
    z-index: 1;
    width: 28px;
    height: 28px;
    flex-shrink: 0;
    background: linear-gradient(135deg, #fbbf24, #f59e0b);
    color: white;
    padding: 6px;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(251, 191, 36, 0.3);
    transition: all 0.3s ease;
  }
  
  .mini-text {
    position: relative;
    z-index: 1;
    font-size: 0.875rem;
    font-weight: 600;
    background: linear-gradient(135deg, #f59e0b, #ec4899);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin: 0;
    flex: 1;
  }
}

@keyframes shimmer-mini {
  0% {
    transform: rotate(45deg) translateX(-100%);
  }
  100% {
    transform: rotate(45deg) translateX(100%);
  }
}

@keyframes shimmer-quote {
  0% {
    transform: rotate(45deg) translateX(-100%);
  }
  100% {
    transform: rotate(45deg) translateX(100%);
  }
}

@keyframes rotate-border {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
