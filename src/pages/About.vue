<!--
 * @Description: 关于页面
 * @Author: Cik
 * @Date: 2026-02-27
-->

<template>
  <div class="about-page">
    <div class="container">
      <!-- 顶部头像区域 -->
      <div class="profile-header">
        <div class="tags-wrapper">
          <div class="tag-group left">
            <span class="floating-tag">
              <i class="fas fa-code"></i>
              全栈开发者
            </span>
            <span class="floating-tag">
              <i class="fas fa-heart"></i>
              分享与热心帮助
            </span>
            <span class="floating-tag">
              <i class="fas fa-lightbulb"></i>
              创意实践者
            </span>
          </div>

          <div class="avatar-center">
            <img :src="avatarImg" alt="Avatar" class="avatar" />
            <span class="status-dot"></span>
          </div>

          <div class="tag-group right">
            <span class="floating-tag">
              <i class="fas fa-rocket"></i>
              脚踏实地行动派
            </span>
            <span class="floating-tag">
              <i class="fas fa-users"></i>
              开源爱好者
            </span>
            <span class="floating-tag">
              <i class="fas fa-coffee"></i>
              咖啡续命工程师
            </span>
          </div>
        </div>


      </div>

      <!-- Bento 网格布局 -->
      <div class="content-area">
        <!-- 个人介绍卡片 -->
        <div class="intro-section">
          <div class="intro-card">
            <div class="intro-header">
              <span class="wave-emoji">👋</span>
              <span class="intro-label">你好，很高兴认识你</span>
            </div>
            <h2 class="intro-name">我叫 CIK</h2>
            <p class="intro-text">
              人生如逆旅，我亦是行人，但求步履从容，不负光阴~
              在这趟无法回头的旅程中，我们皆是背负行囊的过客，于岁月长河里各自漂泊。
            </p>
            <div class="intro-tags">
              <span class="intro-tag">
                <i class="fas fa-map-marker-alt"></i>
                中国，上海
              </span>
              <span class="intro-tag">
                <i class="fas fa-laptop-code"></i>
                数码科技爱好者
              </span>
            </div>
          </div>
        </div>

        <!-- 特色卡片组 -->
        <div class="feature-cards">
          <div class="feature-card hobby-card">
            <div class="card-icon-wrap">
              <i class="fas fa-heart"></i>
            </div>
            <h3>兴趣爱好</h3>
            <p>热爱数码科技、编程开发、摄影记录生活</p>
            <div class="card-decoration"></div>
          </div>

          <div class="feature-card quote-card">
            <div class="card-icon-wrap">
              <i class="fas fa-quote-right"></i>
            </div>
            <h3>座右铭</h3>
            <p class="quote-content">于岁月长河里各自漂泊</p>
            <div class="card-decoration"></div>
          </div>

          <div class="feature-card location-card">
            <div class="card-icon-wrap">
              <i class="fas fa-globe-asia"></i>
            </div>
            <h3>所在地</h3>
            <p>中国 · 上海市</p>
            <div class="card-decoration"></div>
          </div>
        </div>

        <!-- 联系方式 -->
        <div class="contact-area">
          <div class="contact-header">
            <div class="contact-line"></div>
            <span class="contact-label">与我联系</span>
            <div class="contact-line"></div>
          </div>
          <div class="contact-buttons">
            <a href="mailto:cikheo@qq.com" class="contact-item">
              <div class="contact-icon email">
                <i class="fas fa-envelope"></i>
              </div>
              <span class="contact-name">邮箱</span>
            </a>
            <a href="https://github.com/cikheo" target="_blank" class="contact-item">
              <div class="contact-icon github">
                <i class="fab fa-github"></i>
              </div>
              <span class="contact-name">GitHub</span>
            </a>
            <a href="https://space.bilibili.com/1212627088" target="_blank" class="contact-item">
              <div class="contact-icon bilibili">
                <i class="fab fa-bilibili"></i>
              </div>
              <span class="contact-name">Bilibili</span>
            </a>
            <router-link to="/wechat" class="contact-item">
              <div class="contact-icon wechat">
                <i class="fab fa-weixin"></i>
              </div>
              <span class="contact-name">微信</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import avatarImg from '@/assets/img/Cik!cover.png'
</script>

<style scoped lang="scss">
.about-page {
  min-height: 100vh;
  padding-top: 140px;
  padding-bottom: $spacing-xl * 3;
  background: linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%);
}

// 顶部头像区域
.profile-header {
  text-align: center;
  margin-bottom: $spacing-xl * 2;
}

.tags-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: $spacing-xl * 2;
  margin-bottom: $spacing-lg;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: $spacing-lg;
  }
}

.tag-group {
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;

  &.left {
    align-items: flex-end;
  }

  &.right {
    align-items: flex-start;
  }

  @media (max-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;

    &.left,
    &.right {
      align-items: center;
    }
  }
}

.floating-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  background: white;
  border-radius: 20px;
  font-size: 13px;
  color: $text-regular;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;

  i {
    font-size: 14px;
    color: $primary-color;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
}

.avatar-center {
  position: relative;
  flex-shrink: 0;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 4px solid white;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  object-fit: cover;
}

.status-dot {
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 20px;
  height: 20px;
  background: #22c55e;
  border: 3px solid white;
  border-radius: 50%;
}

.site-title {
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 600;
  color: $text-primary;
  margin-top: $spacing-lg;
}

// 内容区域
.content-area {
  max-width: 800px;
  margin: 0 auto;
}

// 个人介绍区域
.intro-section {
  margin-bottom: $spacing-xl * 2;
}

.intro-card {
  background: white;
  border-radius: 24px;
  padding: $spacing-xl * 1.5;
  box-shadow:
    0 4px 24px rgba(0, 0, 0, 0.06),
    0 1px 2px rgba(0, 0, 0, 0.04);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #6366f1, #8b5cf6, #a855f7);
  }
}

.intro-header {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  margin-bottom: $spacing-md;
}

.wave-emoji {
  font-size: 28px;
  animation: wave 2.5s infinite;
  transform-origin: 70% 70%;
  display: inline-block;
}

@keyframes wave {
  0% {
    transform: rotate(0deg);
  }
  10% {
    transform: rotate(14deg);
  }
  20% {
    transform: rotate(-8deg);
  }
  30% {
    transform: rotate(14deg);
  }
  40% {
    transform: rotate(-4deg);
  }
  50% {
    transform: rotate(10deg);
  }
  60% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

.intro-label {
  font-size: $font-size-base;
  color: $text-secondary;
}

.intro-name {
  font-size: clamp(2rem, 5vw, 2.8rem);
  font-weight: 800;
  background: linear-gradient(135deg, #1e293b 0%, #475569 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: $spacing-lg;
}

.intro-text {
  font-size: $font-size-lg;
  color: $text-regular;
  line-height: 1.9;
  margin-bottom: $spacing-xl;
}

.intro-tags {
  display: flex;
  flex-wrap: wrap;
  gap: $spacing-md;
}

.intro-tag {
  display: inline-flex;
  align-items: center;
  gap: $spacing-xs;
  padding: 10px 18px;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border-radius: 30px;
  font-size: $font-size-sm;
  color: #0369a1;
  font-weight: 500;

  i {
    font-size: 14px;
  }
}

// 特色卡片组
.feature-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: $spacing-lg;
  margin-bottom: $spacing-xl * 2;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.feature-card {
  background: white;
  border-radius: 20px;
  padding: $spacing-xl;
  text-align: center;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-8px);

    .card-icon-wrap {
      transform: scale(1.1) rotate(5deg);
    }

    .card-decoration {
      transform: scale(1.5);
      opacity: 0.15;
    }
  }

  h3 {
    font-size: $font-size-lg;
    font-weight: 600;
    color: $text-primary;
    margin-bottom: $spacing-sm;
  }

  p {
    font-size: $font-size-sm;
    color: $text-regular;
    line-height: 1.6;
  }
}

.card-icon-wrap {
  width: 56px;
  height: 56px;
  margin: 0 auto $spacing-lg;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  transition: all 0.4s ease;
}

.card-decoration {
  position: absolute;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  bottom: -40px;
  right: -40px;
  opacity: 0.1;
  transition: all 0.4s ease;
}

.hobby-card {
  .card-icon-wrap {
    background: linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%);
    color: #db2777;
  }

  .card-decoration {
    background: #ec4899;
  }
}

.quote-card {
  .card-icon-wrap {
    background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
    color: #d97706;
  }

  .card-decoration {
    background: #f59e0b;
  }

  .quote-content {
    font-style: italic;
    font-weight: 500;
    color: $text-primary;
  }
}

.location-card {
  .card-icon-wrap {
    background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
    color: #2563eb;
  }

  .card-decoration {
    background: #3b82f6;
  }
}

// 联系方式区域
.contact-area {
  text-align: center;
}

.contact-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: $spacing-lg;
  margin-bottom: $spacing-xl;
}

.contact-line {
  width: 60px;
  height: 1px;
  background: linear-gradient(90deg, transparent, $border-color-light, transparent);
}

.contact-label {
  font-size: $font-size-sm;
  color: $text-secondary;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 500;
}

.contact-buttons {
  display: flex;
  justify-content: center;
  gap: $spacing-xl;
  flex-wrap: wrap;
}

.contact-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $spacing-sm;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);

    .contact-icon {
      transform: scale(1.1);
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
    }
  }
}

.contact-icon {
  width: 60px;
  height: 60px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  &.email {
    background: linear-gradient(135deg, #ef4444 0%, #f97316 100%);
  }

  &.github {
    background: linear-gradient(135deg, #1e293b 0%, #475569 100%);
  }

  &.bilibili {
    background: linear-gradient(135deg, #fb7299 0%, #ff9eb5 100%);
  }

  &.wechat {
    background: linear-gradient(135deg, #22c55e 0%, #4ade80 100%);
  }
}

.contact-name {
  font-size: $font-size-sm;
  color: $text-secondary;
  font-weight: 500;
}
</style>
