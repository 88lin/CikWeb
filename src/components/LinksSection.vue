<!--
 * @Description: 友情链接展示组件 - 正在发电
 * @Author: Cik
 * @Date: 2026-02-27
-->

<template>
  <section class="links-section">
    <div class="links-card">
      <!-- 头部 -->
      <div class="links-header">
        <div class="header-left">
          <h2 class="section-title">{{ pageConfig.title }}</h2>
          <p class="section-subtitle">{{ pageConfig.subtitle }}</p>
        </div>
        <button @click="showBenefitsDialog = true" class="view-more-btn">
          {{ pageConfig.buttonText }} <span class="arrow">→</span>
        </button>
      </div>

      <!-- 链接列表 -->
      <div class="links-list">
        <a 
          v-for="link in links" 
          :key="link.url" 
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="link-item"
        >
          <div class="link-avatar-wrapper">
            <img :src="link.avatar" :alt="link.name" class="link-avatar" />
          </div>
          <div class="link-info">
            <div class="link-name-row">
              <span class="link-name">{{ link.name }}</span>
              <span v-if="link.tag" class="link-tag">
                <span class="tag-heart">❤️</span>
                {{ link.tag }}
              </span>
            </div>
            <p class="link-description">{{ link.description }}</p>
            <button class="link-visit-btn">
              <span class="btn-text">访问</span>
            </button>
          </div>
        </a>
      </div>
    </div>

    <!-- 赞助权益弹窗 -->
    <Teleport to="body">
      <Transition name="dialog-fade">
        <div v-if="showBenefitsDialog" class="benefits-dialog-overlay" @click="showBenefitsDialog = false">
          <div class="benefits-dialog" @click.stop>
            <!-- 装饰性背景 -->
            <div class="dialog-bg-decoration"></div>
            
            <div class="dialog-header">
              <div class="header-icon-wrapper">
                <i class="fas fa-gift"></i>
              </div>
              <div class="header-text">
                <h3>赞助权益</h3>
                <p class="header-subtitle">您的支持是我持续创作的动力</p>
              </div>
              <button class="close-btn" @click="showBenefitsDialog = false">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M6 6l12 12M6 18L18 6"/>
                </svg>
              </button>
            </div>
            
            <div class="dialog-content">
              <div class="benefits-list">
                <div 
                  v-for="(benefit, index) in benefits" 
                  :key="index" 
                  class="benefit-item"
                  :style="{ animationDelay: `${index * 0.1}s` }"
                >
                  <div class="benefit-icon">
                    <i :class="benefit.icon"></i>
                    <div class="icon-glow"></div>
                  </div>
                  <div class="benefit-content">
                    <p class="benefit-title">{{ benefit.title }}</p>
                    <div class="benefit-checkmark">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                        <path d="M5 13l4 4L19 7"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="action-section">
                <router-link :to="pageConfig.buttonLink" class="sponsor-action-btn" @click="showBenefitsDialog = false">
                  <span class="btn-shine"></span>
                  <span class="btn-content">
                    <i class="fas fa-heart"></i>
                    <span>前往赞助</span>
                    <span class="action-arrow">→</span>
                  </span>
                </router-link>
                <p class="action-tip">💝 您的每一份支持都将被用心对待</p>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { links, linksPageConfig } from '@/data/links'
import { sponsorPageConfig } from '@/data/sponsors'

const pageConfig = linksPageConfig
const benefits = sponsorPageConfig.benefits
const showBenefitsDialog = ref(false)
</script>

<style scoped lang="scss">
.links-section {
  width: 100%;
  padding: 48px 40px 40px 40px;
  background: #f5f5f7;
  
  @media (max-width: 768px) {
    padding: 32px 0;
    background: white;
  }
}

.links-card {
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 0 24px;
  }
}

.links-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;
  
  @media (max-width: 640px) {
    align-items: center;
    margin-bottom: 0;
    padding-bottom: 16px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  }
}

.header-left {
  text-align: left;
  
  @media (max-width: 640px) {
    flex: 1;
  }
}

.section-title {
  font-size: 2.25rem;
  font-weight: 800;
  text-align: left;
  color: #1a1a1a;
  margin: 0 0 8px 0;
  
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
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 0.8125rem;
    color: #94a3b8;
  }
}

.view-more-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 24px;
  font-size: 0.875rem;
  font-weight: 600;
  color: #8b5cf6;
  background: white;
  border: 1.5px solid rgba(139, 92, 246, 0.3);
  border-radius: 999px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(139, 92, 246, 0.1);
  
  .arrow {
    transition: transform 0.3s ease;
  }
  
  &:hover {
    background: linear-gradient(135deg, #8b5cf6, #a855f7);
    color: white;
    border-color: transparent;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(139, 92, 246, 0.3);
    
    .arrow {
      transform: translateX(4px);
    }
  }
  
  @media (max-width: 640px) {
    padding: 6px 14px;
    font-size: 0.6875rem;
    font-weight: 500;
    flex-shrink: 0;
    border-width: 1px;
    border-color: rgba(139, 92, 246, 0.25);
    background: rgba(139, 92, 246, 0.04);
    box-shadow: none;
    
    .arrow {
      display: none;
    }
    
    &:active {
      background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%);
      color: white;
      border-color: transparent;
    }
  }
}

.links-list {
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

// 链接卡片 - 横向布局
.link-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    .link-avatar-wrapper {
      transform: scale(1.1);
    }
    
    .link-name {
      color: #ec4899;
    }
    
    .link-visit-btn {
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
      padding-top: 14px;
    }
    
    &:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }
    
    &:active {
      opacity: 0.7;
    }
    
    &:hover {
      .link-avatar-wrapper {
        transform: none;
      }
      
      .link-visit-btn {
        transform: translateY(-50%);
        box-shadow: none;
      }
    }
  }
}

// 头像容器 - 圆形
.link-avatar-wrapper {
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

.link-avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.link-info {
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

.link-name-row {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  
  @media (max-width: 560px) {
    gap: 8px;
  }
}

.link-name {
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

.link-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 12px;
  font-size: 0.75rem;
  font-weight: 600;
  color: #ef4444;
  background: white;
  border-radius: 100px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  
  .tag-heart {
    font-size: 0.7rem;
  }
  
  @media (max-width: 560px) {
    padding: 2px 8px;
    font-size: 0.625rem;
    
    .tag-heart {
      font-size: 0.55rem;
    }
  }
}

.link-description {
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

// 访问按钮 - 胶囊样式，紫色边框
.link-visit-btn {
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
}

.btn-text {
  position: relative;
  z-index: 1;
}

// 弹窗过渡动画
.dialog-fade-enter-active,
.dialog-fade-leave-active {
  transition: opacity 0.3s ease;
}

.dialog-fade-enter-from,
.dialog-fade-leave-to {
  opacity: 0;
}

.dialog-fade-enter-active .benefits-dialog {
  animation: dialogSlideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.dialog-fade-leave-active .benefits-dialog {
  animation: dialogSlideDown 0.3s ease;
}

@keyframes dialogSlideUp {
  from {
    opacity: 0;
    transform: translateY(40px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes dialogSlideDown {
  from {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateY(20px) scale(0.98);
  }
}

// 弹窗样式
.benefits-dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
}

.benefits-dialog {
  position: relative;
  background: linear-gradient(180deg, #ffffff 0%, #fefefe 100%);
  border-radius: 28px;
  max-width: 580px;
  width: 100%;
  max-height: 85vh;
  overflow: hidden;
  box-shadow: 
    0 32px 80px rgba(139, 92, 246, 0.35),
    0 16px 40px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(139, 92, 246, 0.1);
}

// 装饰性背景
.dialog-bg-decoration {
  position: absolute;
  top: -50%;
  right: -20%;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%);
  pointer-events: none;
  animation: bgFloat 8s ease-in-out infinite;
}

@keyframes bgFloat {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(-30px, -30px) scale(1.1);
  }
}

.dialog-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  padding: 24px 24px 24px;
  border-bottom: 1px solid rgba(139, 92, 246, 0.08);
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.03) 0%, rgba(168, 85, 247, 0.02) 100%);
  position: relative;
  text-align: left;
  
  @media (max-width: 560px) {
    padding: 20px 18px;
    gap: 14px;
  }
}

.header-icon-wrapper {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%);
  border-radius: 14px;
  color: white;
  font-size: 1.25rem;
  box-shadow: 
    0 6px 20px rgba(139, 92, 246, 0.35),
    0 3px 10px rgba(168, 85, 247, 0.25);
  animation: iconPulse 2s ease-in-out infinite;
  
  @media (max-width: 560px) {
    width: 44px;
    height: 44px;
    font-size: 1.125rem;
    border-radius: 12px;
  }
}

@keyframes iconPulse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 
      0 8px 24px rgba(139, 92, 246, 0.35),
      0 4px 12px rgba(168, 85, 247, 0.25);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 
      0 12px 32px rgba(139, 92, 246, 0.45),
      0 6px 16px rgba(168, 85, 247, 0.35);
  }
}

.header-text {
  flex: 1;
  
  h3 {
    font-size: 1.5rem;
    font-weight: 800;
    background: linear-gradient(135deg, #1e293b 0%, #475569 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin: 0 0 4px 0;
    
    @media (max-width: 560px) {
      font-size: 1.25rem;
    }
  }
}

.header-subtitle {
  font-size: 0.875rem;
  color: #64748b;
  margin: 0;
  font-weight: 500;
  
  @media (max-width: 560px) {
    font-size: 0.75rem;
  }
}

.close-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border: 1.5px solid rgba(139, 92, 246, 0.15);
  border-radius: 10px;
  cursor: pointer;
  color: #64748b;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  
  svg {
    width: 18px;
    height: 18px;
  }
  
  &:hover {
    background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
    border-color: rgba(239, 68, 68, 0.3);
    color: #ef4444;
    transform: rotate(90deg);
    box-shadow: 0 4px 12px rgba(239, 68, 68, 0.2);
  }
  
  @media (max-width: 560px) {
    top: 12px;
    right: 12px;
    width: 32px;
    height: 32px;
    
    svg {
      width: 16px;
      height: 16px;
    }
  }
}

.dialog-content {
  padding: 24px;
  overflow-y: auto;
  max-height: calc(85vh - 120px);
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f8fafc;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #8b5cf6 0%, #a855f7 100%);
    border-radius: 3px;
    
    &:hover {
      background: linear-gradient(180deg, #7c3aed 0%, #9333ea 100%);
    }
  }
  
  @media (max-width: 560px) {
    padding: 20px 18px;
  }
}

.benefits-list {
  display: grid;
  gap: 12px;
  margin-bottom: 24px;
}

.benefit-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 18px;
  background: white;
  border-radius: 16px;
  border: 2px solid transparent;
  box-shadow: 0 4px 16px rgba(139, 92, 246, 0.08);
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  overflow: hidden;
  opacity: 0;
  animation: itemSlideIn 0.5s ease forwards;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.03) 0%, rgba(168, 85, 247, 0.03) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    transform: translateX(6px);
    border-color: rgba(139, 92, 246, 0.25);
    box-shadow: 
      0 10px 28px rgba(139, 92, 246, 0.2),
      0 5px 14px rgba(168, 85, 247, 0.15);
    
    &::before {
      opacity: 1;
    }
    
    .benefit-icon {
      transform: scale(1.08) rotate(3deg);
      box-shadow: 
        0 10px 28px rgba(139, 92, 246, 0.45),
        0 5px 14px rgba(168, 85, 247, 0.35);
    }
    
    .benefit-checkmark {
      opacity: 1;
      transform: scale(1) rotate(0);
    }
  }
  
  @media (max-width: 560px) {
    padding: 16px;
    gap: 14px;
  }
}

@keyframes itemSlideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.benefit-icon {
  position: relative;
  flex-shrink: 0;
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%);
  border-radius: 14px;
  color: white;
  font-size: 1.25rem;
  box-shadow: 
    0 6px 20px rgba(139, 92, 246, 0.35),
    0 3px 10px rgba(168, 85, 247, 0.25);
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  
  @media (max-width: 560px) {
    width: 48px;
    height: 48px;
    font-size: 1.125rem;
  }
}

.icon-glow {
  position: absolute;
  inset: -3px;
  background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%);
  border-radius: 16px;
  opacity: 0.3;
  filter: blur(10px);
  z-index: -1;
  animation: glowPulse 2s ease-in-out infinite;
}

@keyframes glowPulse {
  0%, 100% {
    opacity: 0.3;
    transform: scale(0.95);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.05);
  }
}

.benefit-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  position: relative;
}

.benefit-title {
  flex: 1;
  font-size: 0.9375rem;
  line-height: 1.5;
  color: #1e293b;
  font-weight: 600;
  margin: 0;
  
  @media (max-width: 560px) {
    font-size: 0.875rem;
  }
}

.benefit-checkmark {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  border-radius: 50%;
  color: white;
  opacity: 0;
  transform: scale(0) rotate(-180deg);
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 3px 10px rgba(16, 185, 129, 0.3);
  
  svg {
    width: 16px;
    height: 16px;
  }
  
  @media (max-width: 560px) {
    width: 26px;
    height: 26px;
    
    svg {
      width: 14px;
      height: 14px;
    }
  }
}

.action-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
}

.sponsor-action-btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  max-width: 360px;
  padding: 16px 32px;
  font-size: 1.0625rem;
  font-weight: 700;
  color: white;
  background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
  border: none;
  border-radius: 14px;
  text-decoration: none;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 
    0 6px 20px rgba(139, 92, 246, 0.4),
    0 3px 10px rgba(99, 102, 241, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #a855f7 0%, #7c3aed 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .btn-shine {
    position: absolute;
    top: -50%;
    left: -100%;
    width: 50%;
    height: 200%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transform: skewX(-25deg);
    animation: shine 3s infinite;
  }
  
  .btn-content {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    gap: 10px;
    
    i {
      font-size: 1.125rem;
      animation: heartBeat 1.5s ease-in-out infinite;
    }
  }
  
  .action-arrow {
    transition: transform 0.3s ease;
    font-size: 1.375rem;
    font-weight: 400;
  }
  
  &:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 
      0 12px 32px rgba(139, 92, 246, 0.5),
      0 6px 16px rgba(99, 102, 241, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
    
    &::before {
      opacity: 1;
    }
    
    .action-arrow {
      transform: translateX(5px);
    }
  }
  
  &:active {
    transform: translateY(-1px) scale(1);
  }
  
  @media (max-width: 560px) {
    padding: 14px 28px;
    font-size: 1rem;
    
    .btn-content i {
      font-size: 1rem;
    }
  }
}

@keyframes shine {
  0% {
    left: -100%;
  }
  50%, 100% {
    left: 150%;
  }
}

@keyframes heartBeat {
  0%, 100% {
    transform: scale(1);
  }
  10%, 30% {
    transform: scale(1.2);
  }
  20%, 40% {
    transform: scale(1);
  }
}

.action-tip {
  font-size: 0.875rem;
  color: #64748b;
  text-align: center;
  margin: 0;
  font-weight: 500;
  animation: tipFade 2s ease-in-out infinite;
  
  @media (max-width: 560px) {
    font-size: 0.8125rem;
  }
}

@keyframes tipFade {
  0%, 100% {
    opacity: 0.8;
  }
  50% {
    opacity: 1;
  }
}
</style>
