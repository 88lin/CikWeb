<!--
 * @Description: 首页赞助展示组件
 * @Author: Cik
 * @Date: 2026-02-27
-->

<template>
  <section class="sponsors-section">
    <div class="sponsors-container">
      <!-- 头部 -->
      <div class="sponsors-header">
        <div class="header-left">
          <h2 class="section-title">赞赏</h2>
          <p class="section-subtitle">感谢以下小伙伴的慷慨支持</p>
        </div>
        <router-link to="/sponsor" class="view-more-btn">
          查看更多 <span class="arrow">→</span>
        </router-link>
      </div>

      <!-- 赞助者卡片列表 -->
      <div class="sponsors-list">
        <div 
          v-for="sponsor in sortedSponsors" 
          :key="sponsor.name + sponsor.date" 
          class="sponsor-card"
        >
          <span class="sponsor-name">{{ sponsor.name }}</span>
          <span class="sponsor-amount">¥{{ sponsor.amount.toFixed(2) }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { sponsors } from '@/data/sponsors'

// 按金额从大到小排序，取前6个展示
const sortedSponsors = computed(() => {
  return [...sponsors]
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 6)
})
</script>

<style scoped lang="scss">
.sponsors-section {
  width: 100%;
  padding: 48px 40px 40px 40px;
  background: #f5f5f7;
  
  @media (max-width: 768px) {
    padding: 32px 0;
    background: white;
  }
}

.sponsors-container {
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 0 24px;
  }
}

.sponsors-header {
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

.sponsors-list {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: 640px) {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding-top: 16px;
  }
}

.sponsor-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  }
  
  @media (max-width: 640px) {
    flex-direction: row;
    justify-content: space-between;
    padding: 16px 20px;
    background: #f8fafc;
    border-radius: 14px;
    box-shadow: none;
    border: 1px solid rgba(0, 0, 0, 0.04);
    
    &:hover {
      transform: none;
      box-shadow: none;
    }
    
    &:active {
      background: #f1f5f9;
    }
  }
}

.sponsor-name {
  font-size: 1rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 8px;
  
  @media (max-width: 640px) {
    font-size: 0.9375rem;
    margin-bottom: 0;
    color: #1e293b;
  }
}

.sponsor-amount {
  font-size: 1.25rem;
  font-weight: 700;
  color: #10b981;
  
  @media (max-width: 640px) {
    font-size: 1rem;
    font-weight: 600;
  }
}
</style>
