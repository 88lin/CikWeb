<!--
 * @Description: 赞助页面 - 紧凑左右布局
 * @Author: Cik
 * @Date: 2026-02-27
-->

<template>
  <div class="sponsor-page">
    <!-- 头部 -->
    <header class="page-header">
      <span class="header-emoji">❤️</span>
      <h1>{{ pageConfig.title }}</h1>
      <p>{{ pageConfig.subtitle }}</p>
    </header>

    <main class="page-main">
      <!-- 赞助卡片 - 左右布局 -->
      <section class="sponsor-card">
        <!-- 左侧：权益 -->
        <div class="card-left">
          <h3>🎁 赞助权益</h3>
          <ul class="benefits">
            <li v-for="(benefit, index) in pageConfig.benefits" :key="index">
              <span class="icon">✓</span>
              <div class="text">
                <strong>{{ benefit.title }}</strong>
              </div>
            </li>
          </ul>
        </div>
        
        <!-- 右侧：支付 -->
        <div class="card-right">
          <h3>💝 支持我</h3>
          <button class="sponsor-btn" @click="openQrModal">
            <span>❤️</span>
            前往赞助
          </button>
          <p class="note">感谢您的支持 🙏</p>
          <p class="note sub">💡 无论金额大小，每一份心意都值得被珍惜</p>
        </div>
      </section>

      <!-- 赞助名单 -->
      <section class="donors-card">
        <div class="donors-top">
          <h2>💖 感谢名单</h2>
          <div class="sort-btns">
            <button :class="{ on: sortBy === 'date' }" @click="sortBy = 'date'">最新</button>
            <button :class="{ on: sortBy === 'amount' }" @click="sortBy = 'amount'">金额</button>
          </div>
        </div>
        <p class="donors-tip">如需修改昵称信息，您可以将您的赞赏截图和转账单号/支付单号和修改昵称发送到 <a href="mailto:cikheo@qq.com">cikheo@qq.com</a></p>
        <div class="donors-list">
          <div class="row head">
            <span class="name">昵称</span>
            <span class="amt">金额</span>
            <span class="date">日期</span>
          </div>
          <div 
            v-for="s in paginatedSponsors" 
            :key="s.name + s.date" 
            :class="['row', { [`vip-row vip-${getVipColorIndex(s)}`]: s.amount >= 20 }]"
          >
            <span class="name">{{ s.name }}</span>
            <span :class="['amt', { vip: s.amount >= 20 }]">¥{{ s.amount }}</span>
            <span class="date">{{ formatDate(s.date) }}</span>
          </div>
        </div>
        <div v-if="totalPages > 1" class="pager">
          <button :disabled="currentPage === 1" @click="currentPage--">上一页</button>
          <span>{{ currentPage }} / {{ totalPages }}</span>
          <button :disabled="currentPage === totalPages" @click="currentPage++">下一页</button>
        </div>
      </section>
    </main>

    <!-- 弹窗 - 显示两个二维码 -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showQrModal" class="overlay" @click="closeQrModal">
          <div class="dialog" @click.stop>
            <button class="close" @click="closeQrModal">×</button>
            <h3>选择赞助方式</h3>
            <p class="desc">扫描下方二维码完成赞助</p>
            <div class="qr-list">
              <div v-for="method in pageConfig.methods" :key="method.id" class="qr-item">
                <span class="qr-emoji">{{ method.id === 'wechat' ? '💚' : '💙' }}</span>
                <span class="qr-name">{{ method.name }}</span>
                <div class="qr-img">
                  <img :src="method.qrCode" :alt="method.name" />
                </div>
              </div>
            </div>
            <p class="tip">截图保存或长按识别</p>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { sponsors, sponsorPageConfig } from '@/data/sponsors'

const pageConfig = sponsorPageConfig
const sortBy = ref<'date' | 'amount'>('date')
const currentPage = ref(1)
const itemsPerPage = 20

// 弹窗状态
const showQrModal = ref(false)

const openQrModal = () => {
  showQrModal.value = true
  document.body.style.overflow = 'hidden'
}

const closeQrModal = () => {
  showQrModal.value = false
  document.body.style.overflow = ''
}

const sortedSponsors = computed(() => {
  const list = [...sponsors]
  if (sortBy.value === 'date') {
    return list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } else {
    return list.sort((a, b) => b.amount - a.amount)
  }
})

const totalPages = computed(() => Math.ceil(sortedSponsors.value.length / itemsPerPage))

const paginatedSponsors = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return sortedSponsors.value.slice(start, end)
})

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${year}年${month}月${day}日`
}

// VIP高亮颜色索引（循环使用5种颜色）
let vipCounter = 0
const vipColorMap = new Map<string, number>()

const getVipColorIndex = (sponsor: { name: string; date: string; amount: number }): number => {
  if (sponsor.amount < 20) return 0
  const key = `${sponsor.name}-${sponsor.date}`
  if (!vipColorMap.has(key)) {
    vipColorMap.set(key, vipCounter % 5)
    vipCounter++
  }
  return vipColorMap.get(key) || 0
}
</script>

<style scoped lang="scss">
.sponsor-page {
  min-height: 100vh;
  background: linear-gradient(180deg, #faf5ff 0%, #f3e8ff 50%, #ede9fe 100%);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 50%;
    height: 50%;
    background: radial-gradient(circle at top right, rgba(139, 92, 246, 0.08) 0%, transparent 60%);
    pointer-events: none;
  }
}

// 头部
.page-header {
  text-align: center;
  padding: 100px 20px 32px;
  position: relative;
  
  .header-emoji {
    font-size: 3rem;
    display: block;
    margin-bottom: 12px;
    animation: heartFloat 2s ease-in-out infinite;
  }
  
  h1 {
    font-size: 2rem;
    font-weight: 800;
    background: linear-gradient(135deg, #7c3aed 0%, #8b5cf6 50%, #a855f7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin: 0 0 8px 0;
  }
  
  p {
    font-size: 0.95rem;
    color: #6b7280;
    margin: 0;
    font-weight: 500;
  }
}

@keyframes heartFloat {
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-6px) scale(1.05);
  }
}

// 主内容
.page-main {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px 60px;
  position: relative;
}

// 赞助卡片 - 左右布局
.sponsor-card {
  background: linear-gradient(180deg, #ffffff 0%, #fefefe 100%);
  border-radius: 24px;
  box-shadow: 
    0 8px 32px rgba(139, 92, 246, 0.12),
    0 4px 16px rgba(0, 0, 0, 0.04);
  margin-bottom: 28px;
  display: grid;
  grid-template-columns: 1fr 260px;
  overflow: hidden;
  border: 1px solid rgba(139, 92, 246, 0.08);
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
}

// 左侧权益
.card-left {
  padding: 28px;
  
  h3 {
    font-size: 1.125rem;
    font-weight: 700;
    color: #1e293b;
    margin: 0 0 20px 0;
    display: flex;
    align-items: center;
    gap: 8px;
  }
}

.benefits {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  
  li {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 14px 16px;
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.04) 0%, rgba(168, 85, 247, 0.02) 100%);
    border-radius: 14px;
    border: 1px solid rgba(139, 92, 246, 0.1);
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateX(4px);
      border-color: rgba(139, 92, 246, 0.25);
      box-shadow: 0 4px 12px rgba(139, 92, 246, 0.1);
    }
  }
  
  .icon {
    width: 22px;
    height: 22px;
    background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7rem;
    font-weight: 700;
    flex-shrink: 0;
    margin-top: 1px;
    box-shadow: 0 2px 8px rgba(139, 92, 246, 0.3);
  }
  
  .text {
    display: flex;
    flex-direction: column;
    gap: 2px;
    
    strong {
      font-size: 0.9rem;
      font-weight: 600;
      color: #374151;
      line-height: 1.5;
    }
    
    span {
      font-size: 0.75rem;
      color: #6b7280;
    }
  }
}

// 右侧支付
.card-right {
  padding: 28px;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.06) 0%, rgba(168, 85, 247, 0.04) 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-left: 1px solid rgba(139, 92, 246, 0.1);
  
  @media (max-width: 640px) {
    border-left: none;
    border-top: 1px solid rgba(139, 92, 246, 0.1);
  }
  
  h3 {
    font-size: 1.125rem;
    font-weight: 700;
    color: #1e293b;
    margin: 0 0 20px 0;
    text-align: center;
  }
}

.sponsor-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px 24px;
  border: none;
  border-radius: 14px;
  font-size: 1.0625rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
  color: white;
  box-shadow: 
    0 6px 20px rgba(139, 92, 246, 0.4),
    0 3px 10px rgba(99, 102, 241, 0.3);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -100%;
    width: 50%;
    height: 200%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transform: skewX(-25deg);
    animation: btnShine 3s infinite;
  }
  
  span {
    font-size: 1.2rem;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 
      0 10px 28px rgba(139, 92, 246, 0.5),
      0 6px 16px rgba(99, 102, 241, 0.4);
  }
}

@keyframes btnShine {
  0% {
    left: -100%;
  }
  50%, 100% {
    left: 150%;
  }
}

.note {
  font-size: 0.8rem;
  color: #6b7280;
  text-align: center;
  margin: 14px 0 0 0;
  
  &.sub {
    font-size: 0.75rem;
    margin-top: 8px;
    color: #9ca3af;
  }
}

// 赞助名单
.donors-card {
  background: linear-gradient(180deg, #ffffff 0%, #fefefe 100%);
  border-radius: 20px;
  box-shadow: 
    0 8px 32px rgba(139, 92, 246, 0.1),
    0 4px 16px rgba(0, 0, 0, 0.03);
  padding: 24px;
  margin-bottom: 24px;
  border: 1px solid rgba(139, 92, 246, 0.06);
}

.donors-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
  
  h2 {
    font-size: 1.125rem;
    font-weight: 700;
    color: #1e293b;
    margin: 0;
  }
}

.sort-btns {
  display: flex;
  gap: 8px;
  
  button {
    padding: 6px 14px;
    background: rgba(139, 92, 246, 0.06);
    border: 1px solid rgba(139, 92, 246, 0.12);
    border-radius: 8px;
    font-size: 0.8rem;
    font-weight: 600;
    color: #6b7280;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      background: rgba(139, 92, 246, 0.1);
      color: #7c3aed;
    }
    
    &.on {
      background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%);
      border-color: transparent;
      color: white;
      box-shadow: 0 2px 8px rgba(139, 92, 246, 0.3);
    }
  }
}

.donors-tip {
  font-size: 0.8rem;
  color: #6b7280;
  margin: 0 0 16px 0;
  line-height: 1.6;
  padding: 12px 16px;
  background: rgba(139, 92, 246, 0.04);
  border-radius: 10px;
  border: 1px solid rgba(139, 92, 246, 0.08);
  
  a {
    color: #8b5cf6;
    text-decoration: none;
    font-weight: 600;
    
    &:hover {
      text-decoration: underline;
    }
  }
}

.donors-list {
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid rgba(139, 92, 246, 0.1);
}

.row {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(139, 92, 246, 0.06);
  transition: all 0.2s ease;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:not(.head):not(.vip-row):hover {
    background: rgba(139, 92, 246, 0.04);
  }
  
  &.head {
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.06) 0%, rgba(168, 85, 247, 0.04) 100%);
    font-weight: 600;
    color: #6b7280;
  }
}

// VIP行高亮样式 - 5种不同颜色
.vip-row {
  position: relative;
  
  .name {
    font-weight: 700;
  }
}

.vip-0 {
  background: linear-gradient(90deg, rgba(251, 191, 36, 0.12) 0%, rgba(251, 191, 36, 0.04) 100%);
  border-left: 3px solid #fbbf24;
  
  &:hover {
    background: linear-gradient(90deg, rgba(251, 191, 36, 0.2) 0%, rgba(251, 191, 36, 0.08) 100%);
  }
}

.vip-1 {
  background: linear-gradient(90deg, rgba(236, 72, 153, 0.12) 0%, rgba(236, 72, 153, 0.04) 100%);
  border-left: 3px solid #ec4899;
  
  &:hover {
    background: linear-gradient(90deg, rgba(236, 72, 153, 0.2) 0%, rgba(236, 72, 153, 0.08) 100%);
  }
}

.vip-2 {
  background: linear-gradient(90deg, rgba(139, 92, 246, 0.12) 0%, rgba(139, 92, 246, 0.04) 100%);
  border-left: 3px solid #8b5cf6;
  
  &:hover {
    background: linear-gradient(90deg, rgba(139, 92, 246, 0.2) 0%, rgba(139, 92, 246, 0.08) 100%);
  }
}

.vip-3 {
  background: linear-gradient(90deg, rgba(59, 130, 246, 0.12) 0%, rgba(59, 130, 246, 0.04) 100%);
  border-left: 3px solid #3b82f6;
  
  &:hover {
    background: linear-gradient(90deg, rgba(59, 130, 246, 0.2) 0%, rgba(59, 130, 246, 0.08) 100%);
  }
}

.vip-4 {
  background: linear-gradient(90deg, rgba(168, 85, 247, 0.12) 0%, rgba(168, 85, 247, 0.04) 100%);
  border-left: 3px solid #a855f7;
  
  &:hover {
    background: linear-gradient(90deg, rgba(168, 85, 247, 0.2) 0%, rgba(168, 85, 247, 0.08) 100%);
  }
}

.name {
  flex: 1;
  font-size: 0.9rem;
  font-weight: 600;
  color: #1e293b;
}

.amt {
  font-size: 0.875rem;
  font-weight: 700;
  color: #8b5cf6;
  padding: 4px 12px;
  background: rgba(139, 92, 246, 0.08);
  border-radius: 8px;
  margin: 0 14px;
  min-width: 65px;
  text-align: center;
  
  &.vip {
    background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%);
    color: white;
    box-shadow: 0 2px 6px rgba(245, 158, 11, 0.3);
  }
}

.date {
  font-size: 0.8rem;
  color: #9ca3af;
  min-width: 95px;
  text-align: right;
}

// 分页
.pager {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 14px;
  margin-top: 20px;
  
  button {
    padding: 8px 16px;
    background: rgba(139, 92, 246, 0.06);
    border: 1px solid rgba(139, 92, 246, 0.12);
    border-radius: 8px;
    font-size: 0.8rem;
    font-weight: 600;
    color: #6b7280;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover:not(:disabled) {
      background: rgba(139, 92, 246, 0.12);
      color: #7c3aed;
    }
    
    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }
  
  span {
    font-size: 0.85rem;
    color: #6b7280;
    font-weight: 500;
  }
}

// 弹窗
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
}

.dialog {
  background: linear-gradient(180deg, #ffffff 0%, #fefefe 100%);
  border-radius: 24px;
  padding: 32px 28px;
  text-align: center;
  max-width: 500px;
  width: 100%;
  position: relative;
  box-shadow: 
    0 32px 80px rgba(139, 92, 246, 0.25),
    0 16px 40px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(139, 92, 246, 0.1);
  
  h3 {
    font-size: 1.375rem;
    font-weight: 800;
    background: linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin: 0 0 8px 0;
  }
  
  .desc {
    font-size: 0.9rem;
    color: #6b7280;
    margin: 0 0 24px 0;
  }
  
  .tip {
    font-size: 0.8rem;
    color: #9ca3af;
    margin: 0;
  }
}

.close {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 32px;
  height: 32px;
  border: 1.5px solid rgba(139, 92, 246, 0.15);
  background: white;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1.25rem;
  color: #6b7280;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  transition: all 0.3s ease;
  
  &:hover {
    background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
    border-color: rgba(239, 68, 68, 0.3);
    color: #ef4444;
    transform: rotate(90deg);
  }
}

.qr-list {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-bottom: 20px;
  
  @media (max-width: 400px) {
    flex-direction: column;
    align-items: center;
  }
}

.qr-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  
  .qr-emoji {
    font-size: 1.75rem;
  }
  
  .qr-name {
    font-size: 0.9rem;
    font-weight: 700;
    color: #1e293b;
  }
}

.qr-img {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.06) 0%, rgba(168, 85, 247, 0.04) 100%);
  border-radius: 16px;
  padding: 14px;
  border: 1px solid rgba(139, 92, 246, 0.1);
  
  img {
    width: 150px;
    height: 150px;
    border-radius: 10px;
    display: block;
  }
  
  @media (max-width: 400px) {
    img {
      width: 180px;
      height: 180px;
    }
  }
}

// 弹窗动画
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  
  .dialog {
    transform: scale(0.9) translateY(20px);
  }
}
</style>
