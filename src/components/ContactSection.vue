<!--
 * @Description: 联系组件
 * @Author: Cik
 * @Date: 2026-02-27
-->

<template>
  <section class="contact-section">
    <div class="contact-container">
      <div class="contact-header">
        <span class="header-icon">👋</span>
        <p class="contact-title">{{ title }}</p>
      </div>

      <div class="contact-links">
        <a
          v-for="(item, index) in contactItems"
          :key="item.type"
          :href="item.link"
          :target="item.external ? '_blank' : undefined"
          :rel="item.external ? 'noopener noreferrer' : undefined"
          class="contact-item"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <span class="contact-icon" :class="`icon-${item.type}`">
            <svg
              v-if="item.type === 'mail'"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
            >
              <path
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <svg v-else-if="item.type === 'github'" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
              />
            </svg>
            <svg
              v-else-if="item.type === 'link'"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
            >
              <circle cx="12" cy="12" r="10" />
              <path
                d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"
              />
            </svg>
            <svg v-else-if="item.type === 'wechat'" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.27-.027-.405-.032zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z"/>
            </svg>
          </span>
          <span class="contact-text">
            <span class="contact-label">{{ item.label }}</span>
            <span class="contact-value">{{ item.value }}</span>
          </span>
          <span class="arrow-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface ContactItem {
  type: 'mail' | 'github' | 'link' | 'wechat'
  label: string
  value: string
  link: string
  external?: boolean
}

// 联系标题
const title = '如果您有有趣的项目想法或合作机会，欢迎与我联系'

// 联系方式配置
const contactItems: ContactItem[] = [
  {
    type: 'mail',
    label: 'Email',
    value: 'cikheo@qq.com',
    link: 'mailto:cikheo@qq.com',
    external: false,
  },
  {
    type: 'github',
    label: 'github',
    value: 'github.com/cikheo',
    link: 'https://github.com/cikheo',
    external: true,
  },
  {
    type: 'wechat',
    label: 'WeChat',
    value: '@cikccom',
    link: '/wechat',
    external: false,
  },
  {
    type: 'link',
    label: 'Links',
    value: 'cikcc.com/link',
    link: 'https://blog.cikcc.com/link',
    external: true,
  },
]
</script>

<style scoped lang="scss">
.contact-section {
  width: 100%;
  padding: 56px 40px;
  background: #f5f5f7;
  text-align: center;

  @media (max-width: 768px) {
    padding: 24px 20px 32px;
  }
}

.contact-container {
  max-width: 1000px;
  margin: 0 auto;
}

.contact-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 6px;
    margin-bottom: 20px;
  }
}

.header-icon {
  font-size: 1.75rem;
  animation: wave 2s ease-in-out infinite;
  display: inline-block;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
}

@keyframes wave {
  0%,
  100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(20deg);
  }
  75% {
    transform: rotate(-10deg);
  }
}

.contact-title {
  font-size: 1.125rem;
  color: #475569;
  margin: 0;
  font-weight: 600;
  letter-spacing: -0.01em;

  @media (max-width: 768px) {
    font-size: 0.875rem;
    color: #64748b;
    line-height: 1.5;
    font-weight: 500;
  }
}

.contact-links {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-content: center;
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
    max-width: 700px;
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    max-width: 340px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    max-width: 100%;
    gap: 10px;
  }
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 24px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 16px;
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow:
    0 4px 20px rgba(0, 0, 0, 0.04),
    0 2px 8px rgba(0, 0, 0, 0.02);
  animation: slideUp 0.5s ease backwards;

  &:hover {
    transform: translateY(-4px);
    box-shadow:
      0 12px 32px rgba(139, 92, 246, 0.15),
      0 4px 12px rgba(0, 0, 0, 0.06);
    border-color: rgba(139, 92, 246, 0.2);

    .contact-icon {
      transform: scale(1.1);

      &.icon-mail {
        background: linear-gradient(135deg, #f43f5e 0%, #ec4899 100%);
        box-shadow: 0 6px 20px rgba(244, 63, 94, 0.35);
      }

      &.icon-github {
        background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
        box-shadow: 0 6px 20px rgba(30, 41, 59, 0.35);
      }

      &.icon-link {
        background: linear-gradient(135deg, #3b82f6 0%, #6366f1 100%);
        box-shadow: 0 6px 20px rgba(59, 130, 246, 0.35);
      }
      
      &.icon-wechat {
        background: linear-gradient(135deg, #10b981 0%, #22c55e 100%);
        box-shadow: 0 6px 20px rgba(16, 185, 129, 0.35);
      }
    }

    .arrow-icon {
      opacity: 1;
      transform: translateX(0);
    }

    .contact-value {
      color: #8b5cf6;
    }
  }

  @media (max-width: 900px) {
    padding: 16px 24px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 16px 12px;
    background: white;
    border-radius: 14px;
    border-color: rgba(0, 0, 0, 0.05);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

    &:active {
      transform: scale(0.97);
      background: #fafafa;
    }
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.contact-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  color: white;
  flex-shrink: 0;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);

  &.icon-mail {
    background: linear-gradient(135deg, #fb7185 0%, #f472b6 100%);
    box-shadow: 0 4px 12px rgba(244, 63, 94, 0.25);
  }

  &.icon-github {
    background: linear-gradient(135deg, #334155 0%, #475569 100%);
    box-shadow: 0 4px 12px rgba(51, 65, 85, 0.25);
  }

  &.icon-link {
    background: linear-gradient(135deg, #60a5fa 0%, #818cf8 100%);
    box-shadow: 0 4px 12px rgba(96, 165, 250, 0.25);
  }
  
  &.icon-wechat {
    background: linear-gradient(135deg, #34d399 0%, #4ade80 100%);
    box-shadow: 0 4px 12px rgba(52, 211, 153, 0.25);
  }

  svg {
    width: 20px;
    height: 20px;
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    border-radius: 10px;

    svg {
      width: 18px;
      height: 18px;
    }
  }
}

.contact-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
  flex: 1;
  
  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
  }
}

.contact-label {
  font-size: 0.75rem;
  color: #94a3b8;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  
  @media (max-width: 768px) {
    font-size: 0.625rem;
    letter-spacing: 0.08em;
  }
}

.contact-value {
  font-size: 0.9375rem;
  color: #1e293b;
  font-weight: 600;
  transition: color 0.3s ease;

  @media (max-width: 768px) {
    font-size: 0.75rem;
    color: #475569;
    font-weight: 500;
  }
}

.arrow-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  color: #8b5cf6;
  opacity: 0;
  transform: translateX(-8px);
  transition: all 0.3s ease;

  svg {
    width: 16px;
    height: 16px;
  }

  @media (max-width: 768px) {
    display: none;
  }
}
</style>
