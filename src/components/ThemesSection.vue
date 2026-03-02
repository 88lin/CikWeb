<!--
 * @Description: 主题组件
 * @Author: Cik
 * @Date: 2026-03-02
-->

<template>
  <section class="themes-section">
    <div class="container">
      <h2 class="section-title">主题</h2>
      <p class="section-subtitle">推荐优质的主题模板</p>

      <!-- 主题卡片网格 -->
      <div class="themes-grid">
        <a 
          v-for="theme in themes" 
          :key="theme.url" 
          :href="theme.url" 
          target="_blank"
          rel="noopener noreferrer"
          class="theme-card"
        >
          <!-- 圆形logo在左侧 -->
          <div class="theme-icon-wrapper">
            <img v-if="theme.logo" :src="theme.logo" :alt="theme.name" class="theme-logo" />
            <span v-else class="theme-icon-text">{{ theme.name.charAt(0) }}</span>
          </div>
          
          <!-- 主题信息在右侧，垂直布局 -->
          <div class="theme-info">
            <div class="theme-header">
              <h3 class="theme-name">{{ theme.name }}</h3>
              <!-- 标签 -->
              <span :class="['theme-tag', `tag-${getTagType(theme.tag)}`]">{{ theme.tag }}</span>
            </div>
            <p class="theme-description">{{ theme.description }}</p>
            <!-- 访问按钮在描述下方 -->
            <button class="theme-visit-btn">
              <span class="btn-text">访问</span>
            </button>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { themes } from '@/data/themes'

// 根据标签内容返回标签类型
const getTagType = (tag: string): string => {
  const tagMap: Record<string, string> = {
    '开源': 'open',
    '免费': 'free',
    '付费': 'paid',
    '推荐': 'recommend',
    '热门': 'hot',
  }
  return tagMap[tag] || 'default'
}
</script>

<style scoped lang="scss">
.themes-section {
  width: 100%;
  padding: 48px 40px 40px 40px;
  background: #f5f5f7;
  
  @media (max-width: 768px) {
    padding: 32px 0;
    background: white;
  }
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 0 24px;
  }
}

.section-title {
  font-size: 2.25rem;
  font-weight: 800;
  text-align: left;
  margin: 0 0 8px 0;
  color: #1a1a1a;
  
  @media (max-width: 768px) {
    font-size: 1.375rem;
    font-weight: 700;
    margin-bottom: 4px;
    background: linear-gradient(135deg, #1e293b 0%, #475569 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
}

.section-subtitle {
  font-size: 1rem;
  text-align: left;
  color: #6b7280;
  margin: 0 0 32px 0;
  
  @media (max-width: 768px) {
    font-size: 0.8125rem;
    color: #94a3b8;
    margin-bottom: 20px;
  }
}

.themes-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  row-gap: 36px;
  
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
    row-gap: 32px;
  }
  
  @media (max-width: 560px) {
    display: flex;
    flex-direction: column;
    gap: 0;
  }
}

// 主题卡片 - 横向布局，无背景
.theme-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    .theme-icon-wrapper {
      transform: scale(1.1);
    }
    
    .theme-name {
      color: #8b5cf6;
    }
    
    .theme-visit-btn {
      transform: translateY(-2px);
      box-shadow: 
        0 8px 20px rgba(139, 92, 246, 0.35),
        0 4px 10px rgba(168, 85, 247, 0.25);
    }
  }
  
  // 手机端样式
  @media (max-width: 560px) {
    align-items: center;
    gap: 12px;
    padding: 14px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    position: relative;
    
    &:first-child {
      padding-top: 0;
    }
    
    &:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }
    
    &:active {
      opacity: 0.7;
    }
    
    &:hover {
      .theme-icon-wrapper {
        transform: none;
      }
      
      .theme-visit-btn {
        transform: translateY(-50%);
        box-shadow: none;
      }
    }
  }
}

// logo容器
.theme-icon-wrapper {
  flex-shrink: 0;
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
  
  @media (max-width: 560px) {
    width: 44px;
    height: 44px;
  }
}

.theme-logo {
  width: 56px;
  height: 56px;
  object-fit: contain;
  border-radius: 12px;
  transition: transform 0.3s ease;
  
  @media (max-width: 560px) {
    width: 38px;
    height: 38px;
    border-radius: 10px;
  }
}

.theme-icon-text {
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @media (max-width: 560px) {
    width: 38px;
    height: 38px;
    font-size: 1.5rem;
  }
}

.theme-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  
  @media (max-width: 560px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    padding-right: 60px;
  }
}

.theme-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
  
  @media (max-width: 560px) {
    gap: 6px;
  }
}

.theme-name {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
  transition: color 0.3s ease;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  @media (max-width: 560px) {
    font-size: 0.9375rem;
    font-weight: 600;
  }
}

// 标签样式
.theme-tag {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  font-size: 0.6875rem;
  font-weight: 500;
  border-radius: 4px;
  white-space: nowrap;
  flex-shrink: 0;
  
  @media (max-width: 560px) {
    padding: 2px 6px;
    font-size: 0.625rem;
  }
  
  // 开源标签 - 绿色
  &.tag-open {
    background: rgba(34, 197, 94, 0.1);
    color: #16a34a;
    border: 1px solid rgba(34, 197, 94, 0.2);
  }
  
  // 免费标签 - 蓝色
  &.tag-free {
    background: rgba(59, 130, 246, 0.1);
    color: #2563eb;
    border: 1px solid rgba(59, 130, 246, 0.2);
  }
  
  // 付费标签 - 橙色
  &.tag-paid {
    background: rgba(245, 158, 11, 0.1);
    color: #d97706;
    border: 1px solid rgba(245, 158, 11, 0.2);
  }
  
  // 推荐标签 - 紫色
  &.tag-recommend {
    background: rgba(139, 92, 246, 0.1);
    color: #7c3aed;
    border: 1px solid rgba(139, 92, 246, 0.2);
  }
  
  // 热门标签 - 红色
  &.tag-hot {
    background: rgba(239, 68, 68, 0.1);
    color: #dc2626;
    border: 1px solid rgba(239, 68, 68, 0.2);
  }
  
  // 默认标签 - 灰色
  &.tag-default {
    background: rgba(107, 114, 128, 0.1);
    color: #4b5563;
    border: 1px solid rgba(107, 114, 128, 0.2);
  }
}

.theme-description {
  font-size: 0.9375rem;
  color: #64748b;
  margin: 0;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  
  @media (max-width: 560px) {
    font-size: 0.8125rem;
    color: #94a3b8;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-bottom: 0;
  }
}

.theme-visit-btn {
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 24px;
  font-size: 0.875rem;
  font-weight: 600;
  color: #7c3aed;
  background: transparent;
  border: 2px solid rgba(124, 58, 237, 0.3);
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  margin-top: 4px;
  box-shadow: 0 0 0 1px rgba(124, 58, 237, 0.1);
  
  &:hover {
    color: white;
    background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
    border-color: transparent;
    transform: translateY(-2px);
    box-shadow: 
      0 8px 24px rgba(139, 92, 246, 0.35),
      0 4px 12px rgba(99, 102, 241, 0.25);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 560px) {
    padding: 6px 14px;
    font-size: 0.6875rem;
    font-weight: 500;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    flex-shrink: 0;
    border-width: 1px;
    border-color: rgba(139, 92, 246, 0.25);
    color: #8b5cf6;
    background: rgba(139, 92, 246, 0.04);
    box-shadow: none;
    letter-spacing: 0.02em;
    margin-top: 0;
    
    &:active {
      background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%);
      color: white;
      border-color: transparent;
      transform: translateY(-50%) scale(0.95);
    }
  }
  
  .btn-text {
    position: relative;
    z-index: 1;
  }
}
</style>
