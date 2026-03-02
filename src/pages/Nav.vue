<!--
 * @Description: 网址导航页面 - 建设中提示
 * @Author: Cik
 * @Date: 2026-03-01
-->

<template>
  <div class="nav-page">
    <!-- 装饰背景 -->
    <div class="bg-decoration">
      <div class="bg-circle bg-circle-1"></div>
      <div class="bg-circle bg-circle-2"></div>
      <div class="bg-circle bg-circle-3"></div>
    </div>
    
    <!-- 提示弹窗 -->
    <div class="notice-container">
      <div class="notice-card">
        <!-- 图标 -->
        <div class="notice-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        
        <!-- 标题 -->
        <h1 class="notice-title">页面建设中</h1>
        
        <!-- 描述 -->
        <p class="notice-desc">网址导航页面还未完善，暂未开放访问。</p>
        
        <!-- 分割线 -->
        <div class="notice-divider"></div>
        
        <!-- 提示信息 -->
        <p class="notice-tip">
          <span class="tip-icon">✨</span>
          敬请期待，我们正在努力完善中...
        </p>
        
        <!-- 返回按钮 -->
        <router-link to="/" class="back-btn">
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M10 19l-7-7m0 0l7-7m-7 7h18" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>返回首页</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 暂时不需要任何逻辑
</script>

<style scoped lang="scss">
.nav-page {
  min-height: 100vh;
  background: linear-gradient(180deg, #faf5ff 0%, #f5f3ff 50%, #ede9fe 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
  overflow: hidden;
}

// 装饰背景
.bg-decoration {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.bg-circle {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%);
  animation: bgFloat 20s ease-in-out infinite;
}

.bg-circle-1 {
  width: 600px;
  height: 600px;
  top: -200px;
  right: -100px;
  animation-delay: 0s;
}

.bg-circle-2 {
  width: 400px;
  height: 400px;
  bottom: -100px;
  left: -100px;
  animation-delay: -7s;
}

.bg-circle-3 {
  width: 300px;
  height: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: -14s;
}

@keyframes bgFloat {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -30px) scale(1.05);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.95);
  }
}

// 提示容器
.notice-container {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 420px;
  animation: cardAppear 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes cardAppear {
  0% {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

// 提示卡片
.notice-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 28px;
  padding: 40px 32px;
  text-align: center;
  box-shadow: 
    0 32px 80px rgba(139, 92, 246, 0.15),
    0 16px 40px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(139, 92, 246, 0.1);
  
  @media (max-width: 480px) {
    padding: 32px 24px;
    border-radius: 24px;
  }
}

// 图标
.notice-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(168, 85, 247, 0.08) 100%);
  border-radius: 50%;
  animation: iconPulse 2s ease-in-out infinite;
  
  svg {
    width: 40px;
    height: 40px;
    color: #8b5cf6;
  }
  
  @media (max-width: 480px) {
    width: 70px;
    height: 70px;
    margin-bottom: 20px;
    
    svg {
      width: 36px;
      height: 36px;
    }
  }
}

@keyframes iconPulse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.2);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 0 15px rgba(139, 92, 246, 0);
  }
}

// 标题
.notice-title {
  font-size: 1.75rem;
  font-weight: 800;
  background: linear-gradient(135deg, #7c3aed 0%, #8b5cf6 50%, #a855f7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 12px 0;
  
  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
}

// 描述
.notice-desc {
  font-size: 1rem;
  color: #64748b;
  margin: 0 0 24px 0;
  line-height: 1.6;
  
  @media (max-width: 480px) {
    font-size: 0.9375rem;
  }
}

// 分割线
.notice-divider {
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(139, 92, 246, 0.2) 20%,
    rgba(139, 92, 246, 0.2) 80%,
    transparent 100%
  );
  margin: 0 0 20px 0;
}

// 提示信息
.notice-tip {
  font-size: 0.9375rem;
  color: #8b5cf6;
  margin: 0 0 28px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  
  .tip-icon {
    font-size: 1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.875rem;
    margin-bottom: 24px;
  }
}

// 返回按钮
.back-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 14px 32px;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
  border-radius: 100px;
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 
    0 6px 20px rgba(139, 92, 246, 0.35),
    0 3px 10px rgba(99, 102, 241, 0.25);
  
  .btn-icon {
    width: 18px;
    height: 18px;
    transition: transform 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 
      0 10px 28px rgba(139, 92, 246, 0.45),
      0 6px 16px rgba(99, 102, 241, 0.35);
    
    .btn-icon {
      transform: translateX(-4px);
    }
  }
  
  &:active {
    transform: translateY(-1px);
  }
  
  @media (max-width: 480px) {
    padding: 12px 28px;
    font-size: 0.9375rem;
  }
}
</style>
