<!--
 * @Description: 工具推荐组件
 * @Author: Cik
 * @Date: 2026-02-27
-->

<template>
  <section class="tools-section">
    <div class="container">
      <h2 class="section-title">工具</h2>
      <p class="section-subtitle">推荐常用的工具</p>

      <!-- 工具卡片网格 -->
      <div class="tools-grid">
        <a 
          v-for="tool in tools" 
          :key="tool.url" 
          :href="tool.url" 
          target="_blank"
          rel="noopener noreferrer"
          class="tool-card"
        >
          <!-- 圆形logo在左侧 -->
          <div class="tool-icon-wrapper">
            <img v-if="tool.logo" :src="tool.logo" :alt="tool.name" class="tool-logo" />
            <span v-else class="tool-icon-text">{{ tool.name.charAt(0) }}</span>
          </div>
          
          <!-- 工具信息在右侧，垂直布局 -->
          <div class="tool-info">
            <h3 class="tool-name">{{ tool.name }}</h3>
            <p class="tool-description">{{ tool.description }}</p>
            <!-- 访问按钮在描述下方 -->
            <button class="tool-visit-btn">
              <span class="btn-text">访问</span>
            </button>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { tools } from '@/data/tools'
</script>

<style scoped lang="scss">
.tools-section {
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

.tools-grid {
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

// 工具卡片 - 横向布局，无背景
.tool-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    .tool-icon-wrapper {
      transform: scale(1.1);
    }
    
    .tool-name {
      color: #ec4899;
    }
    
    .tool-visit-btn {
      transform: translateY(-2px);
      box-shadow: 
        0 8px 20px rgba(236, 72, 153, 0.35),
        0 4px 10px rgba(139, 92, 246, 0.25);
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
      .tool-icon-wrapper {
        transform: none;
      }
      
      .tool-visit-btn {
        transform: translateY(-50%);
        box-shadow: none;
      }
    }
  }
}

// logo容器 - 圆形
.tool-icon-wrapper {
  flex-shrink: 0;
  width: 72px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
  border-radius: 50%;
  overflow: hidden;
  background: #f8fafc;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  
  @media (max-width: 560px) {
    width: 48px;
    height: 48px;
    box-shadow: 0 2px 8px rgba(139, 92, 246, 0.1);
    border: 1px solid rgba(139, 92, 246, 0.08);
  }
}

.tool-logo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.tool-icon-text {
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @media (max-width: 560px) {
    font-size: 1.5rem;
  }
}

// 工具信息 - 垂直布局
.tool-info {
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

.tool-name {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
  transition: color 0.3s ease;
  
  @media (max-width: 560px) {
    font-size: 0.9375rem;
    font-weight: 600;
  }
}

.tool-description {
  font-size: 0.9375rem;
  color: #64748b;
  margin: 0;
  line-height: 1.5;
  
  @media (max-width: 560px) {
    font-size: 0.8125rem;
    color: #94a3b8;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}

// 访问按钮 - 胶囊样式，无背景，白色边框
.tool-visit-btn {
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
    

    &:active {
      background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%);
      color: white;
      border-color: transparent;
      transform: translateY(-50%) scale(0.95);
    }
  }
}

.btn-text {
  position: relative;
  z-index: 1;
}
</style>
