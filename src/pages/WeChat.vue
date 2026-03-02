<!--
 * @Description: 微信公众号页面 - 现代风格设计
 * @Author: Cik
 * @Date: 2026-02-27
-->

<template>
  <div class="wechat-page">
    <!-- 头部区域 -->
    <header class="page-header">
      <div class="header-bg"></div>
      <div class="header-content">
        <span class="wechat-icon">💬</span>
        <h1>微信公众号</h1>
        <p>关注我，获取最新技术文章与开发心得</p>
      </div>
    </header>

    <main class="page-main">
      <!-- 二维码卡片 -->
      <section class="qr-card">
        <div class="qr-glow"></div>
        <div class="qr-wrapper">
          <img :src="qrCodeImg" alt="微信公众号二维码" class="qr-image" />
        </div>
        <div class="qr-info">
          <h2>扫码关注</h2>
          <p class="account-name">@cikccom</p>
          <div class="scan-tips">
            <span class="tip">📱 微信扫一扫</span>
            <span class="divider">或</span>
            <span class="tip">📷 长按识别</span>
          </div>
        </div>
      </section>

      <!-- 特色功能 -->
      <section class="features-section">
        <h3 class="section-title">🎁 关注后你将获得</h3>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">📝</div>
            <h4>原创文章</h4>
            <p>深度技术解析，前沿技术分享</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">💡</div>
            <h4>开发技巧</h4>
            <p>实用代码片段，效率提升秘籍</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🔧</div>
            <h4>工具推荐</h4>
            <p>精选开发工具，提升工作效率</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🎯</div>
            <h4>学习路线</h4>
            <p>系统学习指南，少走弯路</p>
          </div>
        </div>
      </section>

      <!-- 统计数据 -->
      <section class="stats-section">
        <div class="stat-item">
          <span class="stat-num">100+</span>
          <span class="stat-label">原创文章</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-num">持续</span>
          <span class="stat-label">更新中</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-num">免费</span>
          <span class="stat-label">知识分享</span>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import qrCodeImg from '@/assets/img/cikccom.jpg'
</script>

<style scoped lang="scss">
.wechat-page {
  min-height: 100vh;
  background: linear-gradient(180deg, #e8f5e9 0%, #f1f8e9 50%, #f5f5f5 100%);
}

// 头部
.page-header {
  position: relative;
  padding: 100px 20px 60px;
  text-align: center;
  overflow: hidden;
}

.header-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #07c160 0%, #06ae56 50%, #059142 100%);
  clip-path: ellipse(150% 100% at 50% 0%);
}

.header-content {
  position: relative;
  z-index: 1;
  
  .wechat-icon {
    display: inline-block;
    font-size: 3rem;
    margin-bottom: 12px;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
  }
  
  h1 {
    font-size: 2rem;
    font-weight: 800;
    color: white;
    margin: 0 0 8px 0;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  }
  
  p {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.9);
    margin: 0;
  }
}

// 主内容
.page-main {
  max-width: 600px;
  margin: -30px auto 0;
  padding: 0 20px 60px;
  position: relative;
  z-index: 2;
}

// 二维码卡片
.qr-card {
  background: white;
  border-radius: 24px;
  padding: 32px;
  text-align: center;
  box-shadow: 0 10px 40px rgba(7, 193, 96, 0.15);
  position: relative;
  overflow: hidden;
  margin-bottom: 24px;
}

.qr-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(7, 193, 96, 0.08) 0%, transparent 50%);
  pointer-events: none;
}

.qr-wrapper {
  display: inline-block;
  padding: 16px;
  background: linear-gradient(135deg, #07c160 0%, #06ae56 100%);
  border-radius: 20px;
  margin-bottom: 20px;
  box-shadow: 0 8px 24px rgba(7, 193, 96, 0.3);
}

.qr-image {
  width: 200px;
  height: 200px;
  border-radius: 12px;
  display: block;
}

.qr-info {
  h2 {
    font-size: 1.25rem;
    font-weight: 700;
    color: #1f2937;
    margin: 0 0 4px 0;
  }
  
  .account-name {
    font-size: 0.9rem;
    color: #07c160;
    font-weight: 600;
    margin: 0 0 16px 0;
  }
}

.scan-tips {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  
  .tip {
    font-size: 0.85rem;
    color: #6b7280;
  }
  
  .divider {
    font-size: 0.75rem;
    color: #d1d5db;
  }
}

// 特色功能
.features-section {
  margin-bottom: 24px;
}

.section-title {
  font-size: 1rem;
  font-weight: 700;
  color: #374151;
  text-align: center;
  margin: 0 0 16px 0;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
}

.feature-card {
  background: white;
  border-radius: 16px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(7, 193, 96, 0.15);
  }
  
  .feature-icon {
    font-size: 2rem;
    margin-bottom: 8px;
  }
  
  h4 {
    font-size: 0.95rem;
    font-weight: 700;
    color: #1f2937;
    margin: 0 0 4px 0;
  }
  
  p {
    font-size: 0.8rem;
    color: #6b7280;
    margin: 0;
    line-height: 1.4;
  }
}

// 统计数据
.stats-section {
  background: white;
  border-radius: 16px;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  
  @media (max-width: 480px) {
    gap: 16px;
    padding: 20px 16px;
  }
}

.stat-item {
  text-align: center;
  
  .stat-num {
    display: block;
    font-size: 1.5rem;
    font-weight: 800;
    color: #07c160;
    line-height: 1.2;
    
    @media (max-width: 480px) {
      font-size: 1.25rem;
    }
  }
  
  .stat-label {
    font-size: 0.75rem;
    color: #9ca3af;
    font-weight: 500;
  }
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: linear-gradient(180deg, transparent, #e5e7eb, transparent);
}
</style>
