<!--
 * @Description: 页面底部组件 - 水波纹效果
 * @Author: Cik
 * @Date: 2026-02-27
-->

<template>
  <footer class="footer">
    <!-- 顶部水波纹装饰 -->
    <div class="wave-container">
      <svg class="wave-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 24 150 28" preserveAspectRatio="none">
        <defs>
          <path id="wave-path" d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18v44h-352z" />
        </defs>
        <g class="wave-group">
          <use xlink:href="#wave-path" x="48" y="0" class="wave-layer wave-1" />
          <use xlink:href="#wave-path" x="48" y="3" class="wave-layer wave-2" />
          <use xlink:href="#wave-path" x="48" y="5" class="wave-layer wave-3" />
          <use xlink:href="#wave-path" x="48" y="7" class="wave-layer wave-4" />
        </g>
      </svg>
    </div>
    
    <div class="footer-content">
      <div class="footer-container">
        <!-- 品牌信息 -->
        <div class="footer-brand">
          <h3 class="brand-name">{{ footerData.brandName }}</h3>
          <p class="brand-slogan">{{ footerData.slogan }}</p>
          <!-- 手机端隐私政策 -->
          <router-link to="/privacy" class="mobile-privacy-link">隐私政策</router-link>
          <!-- 手机端版权信息 -->
          <div class="mobile-copyright">
            <p class="copyright">
              Copyright {{ footerData.startYear }}-{{ currentYear }} {{ footerData.author }}・保留所有权利
            </p>
            <a :href="footerData.icpLink" target="_blank" class="icp-link">{{ footerData.icpNumber }}</a>
          </div>
        </div>

        <!-- 装饰线 -->
        <div class="footer-divider"></div>

        <!-- 版权信息 - 电脑端 -->
        <div class="footer-bottom">
          <div class="copyright-wrapper">
            <p class="copyright">
              Copyright {{ footerData.startYear }}-{{ currentYear }} {{ footerData.author }}・保留所有权利
            </p>
            <a :href="footerData.icpLink" target="_blank" class="icp-link">{{ footerData.icpNumber }}</a>
          </div>
          <router-link to="/privacy" class="privacy-link">隐私政策</router-link>
        </div>

        <!-- 技术栈徽章 -->
        <div class="tech-badges">
          <img :src="badgeVue" alt="Vue" />
          <img :src="badgeTs" alt="TypeScript" />
          <img :src="badgeVite" alt="Vite" />
          <img :src="badgeTailwind" alt="Tailwind CSS" />
          <img :src="badgePinia" alt="Pinia" />
          <img :src="badgeSass" alt="Sass" />
          <img :src="badgeSsg" alt="Vite SSG" />
          <img :src="badgeLicense" alt="License" />
          <a href="https://github.com/cikheo/CikWeb" target="_blank" rel="noopener noreferrer">
            <img :src="badgeGithub" alt="GitHub" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'

// 导入徽章图片
import badgeVue from '@/assets/img/badges/vue.svg'
import badgeTs from '@/assets/img/badges/typescript.svg'
import badgeVite from '@/assets/img/badges/vite.svg'
import badgeTailwind from '@/assets/img/badges/tailwind.svg'
import badgePinia from '@/assets/img/badges/pinia.svg'
import badgeSass from '@/assets/img/badges/sass.svg'
import badgeSsg from '@/assets/img/badges/ssg.svg'
import badgeLicense from '@/assets/img/badges/license.svg'
import badgeGithub from '@/assets/img/badges/github.svg'

// ==================== 数据配置区域 ====================

// 页脚配置数据
const footerData = reactive({
  brandName: 'CiKWeb',
  slogan: '探索技术的边界，记录生活的点滴。',
  startYear: 2025,
  author: 'Cik',
  icpNumber: '陇ICP备2023002242号-9',
  icpLink: 'https://beian.miit.gov.cn/'
})

// ==================== 计算属性 ====================

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped lang="scss">
.footer {
  position: relative;
  margin-top: 0;
}

// ==================== 水波纹样式 ====================

.wave-container {
  position: relative;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  height: 100px;
  overflow: hidden;
  background: transparent;
  
  @media (max-width: 768px) {
    height: 60px;
  }
}

.wave-svg {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

// 四层波浪 - 淡粉色渐变
.wave-layer {
  animation: wave-drift 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
}

.wave-1 {
  fill: rgba(232, 180, 184, 0.25);
  animation-delay: -2s;
  animation-duration: 7s;
}

.wave-2 {
  fill: rgba(232, 180, 184, 0.35);
  animation-delay: -3s;
  animation-duration: 10s;
}

.wave-3 {
  fill: rgba(232, 180, 184, 0.5);
  animation-delay: -4s;
  animation-duration: 13s;
}

.wave-4 {
  fill: #f5f5f7;
  animation-delay: -5s;
  animation-duration: 20s;
}

@keyframes wave-drift {
  0% {
    transform: translate3d(-90px, 0, 0);
  }
  100% {
    transform: translate3d(85px, 0, 0);
  }
}

// ==================== 内容区域样式 ====================

.footer-content {
  background: #f5f5f7;
}

.footer-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 40px 48px 28px;
  
  @media (max-width: 768px) {
    padding: 32px 24px 20px;
  }
}

// ==================== 品牌区域样式 ====================

.footer-brand {
  text-align: left;
}

.brand-name {
  font-size: 1.5rem;
  font-weight: 800;
  color: #1a1a1a;
  margin: 0 0 10px 0;
  letter-spacing: -0.02em;
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
}

.brand-slogan {
  font-size: 0.95rem;
  color: #64748b;
  margin: 0;
  line-height: 1.6;
}

// 手机端隐私政策链接
.mobile-privacy-link {
  display: none;
  
  @media (max-width: 640px) {
    display: block;
    font-size: 0.85rem;
    color: #71717a;
    text-decoration: none;
    margin-top: 12px;
    text-align: left;
    transition: all 0.3s ease;
    
    &:hover {
      color: #E8B4B8;
    }
  }
}

// 手机端版权信息
.mobile-copyright {
  display: none;
  
  @media (max-width: 640px) {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid rgba(0, 0, 0, 0.06);
  }
}

// ==================== 装饰线样式 ====================

.footer-divider {
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(232, 180, 184, 0.4) 20%,
    rgba(232, 180, 184, 0.4) 80%,
    transparent 100%
  );
  margin: 32px 0 20px;
  
  @media (max-width: 640px) {
    display: none;
  }
}

// ==================== 版权信息样式 ====================

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 640px) {
    display: none;
  }
}

.copyright-wrapper {
  display: flex;
  align-items: center;
  gap: 4px;
}

.copyright {
  font-size: 0.85rem;
  color: #71717a;
  margin: 0;
}

.icp-link {
  font-size: 0.85rem;
  color: #71717a;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    color: #E8B4B8;
  }
}

.privacy-link {
  font-size: 0.85rem;
  color: #71717a;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    color: #E8B4B8;
  }
}

// ==================== 技术栈徽章 ====================

.tech-badges {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  margin-top: 20px;
  flex-wrap: wrap;
  
  a {
    display: flex;
    line-height: 0;
  }
  
  img {
    height: auto;
    max-height: 22px;
    image-rendering: auto;
    image-rendering: crisp-edges;
    image-rendering: pixelated;
    -ms-interpolation-mode: nearest-neighbor;
  }
  
  @media (max-width: 640px) {
    margin-top: 16px;
    gap: 4px;
    
    img {
      max-height: 20px;
    }
  }
}
</style>

<!-- 非scoped样式：根据不同页面适配水波纹颜色 -->
<style lang="scss">
// 赞助页面 - 紫色主题
#app:has(.sponsor-page) .footer {
  .wave-1 { fill: rgba(139, 92, 246, 0.2); }
  .wave-2 { fill: rgba(139, 92, 246, 0.3); }
  .wave-3 { fill: rgba(139, 92, 246, 0.45); }
  .footer-divider {
    background: linear-gradient(90deg, transparent 0%, rgba(139, 92, 246, 0.35) 20%, rgba(139, 92, 246, 0.35) 80%, transparent 100%);
  }
  .icp-link:hover, .privacy-link:hover { color: #8b5cf6; }
}

// 微信公众号页面 - 微信绿主题
#app:has(.wechat-page) .footer {
  .wave-1 { fill: rgba(7, 193, 96, 0.2); }
  .wave-2 { fill: rgba(7, 193, 96, 0.3); }
  .wave-3 { fill: rgba(7, 193, 96, 0.45); }
  .footer-divider {
    background: linear-gradient(90deg, transparent 0%, rgba(7, 193, 96, 0.35) 20%, rgba(7, 193, 96, 0.35) 80%, transparent 100%);
  }
  .icp-link:hover, .privacy-link:hover { color: #07c160; }
}

// 博客页面 - 紫蓝色主题
#app:has(.blog-page) .footer {
  .wave-1 { fill: rgba(139, 92, 246, 0.2); }
  .wave-2 { fill: rgba(139, 92, 246, 0.3); }
  .wave-3 { fill: rgba(139, 92, 246, 0.45); }
  .footer-divider {
    background: linear-gradient(90deg, transparent 0%, rgba(139, 92, 246, 0.35) 20%, rgba(139, 92, 246, 0.35) 80%, transparent 100%);
  }
  .icp-link:hover, .privacy-link:hover { color: #8b5cf6; }
}

// 404页面 - 蓝色主题
#app:has(.notfound-container) .footer {
  .wave-1 { fill: rgba(64, 158, 255, 0.2); }
  .wave-2 { fill: rgba(64, 158, 255, 0.3); }
  .wave-3 { fill: rgba(64, 158, 255, 0.45); }
  .footer-divider {
    background: linear-gradient(90deg, transparent 0%, rgba(64, 158, 255, 0.35) 20%, rgba(64, 158, 255, 0.35) 80%, transparent 100%);
  }
  .icp-link:hover, .privacy-link:hover { color: #409eff; }
}

// 导航页面 - 靛蓝紫色主题
#app:has(.nav-page) .footer {
  .wave-1 { fill: rgba(99, 102, 241, 0.2); }
  .wave-2 { fill: rgba(99, 102, 241, 0.3); }
  .wave-3 { fill: rgba(99, 102, 241, 0.45); }
  .footer-divider {
    background: linear-gradient(90deg, transparent 0%, rgba(99, 102, 241, 0.35) 20%, rgba(99, 102, 241, 0.35) 80%, transparent 100%);
  }
  .icp-link:hover, .privacy-link:hover { color: #6366f1; }
}
</style>
