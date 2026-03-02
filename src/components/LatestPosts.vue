<!--
 * @Description: 最新文章展示组件 - RSS订阅方式
 * @Author: Cik
 * @Date: 2026-02-27
-->

<template>
  <section id="blog" class="latest-posts">
    <div class="section-header">
      <div class="header-left">
        <h2>最新文章</h2>
        <p>来自我的博客动态</p>
      </div>
      <router-link to="/blog" class="view-more-btn">查看更多 &rarr;</router-link>
    </div>
    
    <div v-if="loading" class="loading-state">
      <div class="loading-spinner"></div>
      <span>加载中...</span>
    </div>
    
    <div v-else-if="error" class="error-state">
      <span>暂时无法加载文章</span>
    </div>

    <div
      v-else 
      class="carousel-wrapper"
      @mouseenter="stopAutoPlay" 
      @mouseleave="startAutoPlay"
    >
      <div class="carousel-container">
        <div 
          class="carousel-track"
          :style="{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }"
        >
          <div 
            v-for="post in posts" 
            :key="post.link" 
            class="carousel-item"
            :style="{ width: `${100 / itemsPerView}%` }"
          >
            <a 
              :href="post.link" 
              target="_blank" 
              rel="noopener" 
              class="post-card"
            >
              <div class="post-content">
                <div v-if="post.categories && post.categories.length > 0" class="post-tags">
                  <span 
                    v-for="(category, index) in post.categories.slice(0, 3)" 
                    :key="index" 
                    class="post-tag"
                    :style="getCategoryColor(category)"
                  >
                    {{ category }}
                  </span>
                </div>
                <h4 class="post-title" :title="post.title">{{ post.title }}</h4>
                <p class="post-desc">{{ stripHtml(post.description) }}</p>
                <div class="post-footer">
                  <span class="post-date">{{ formatDate(post.pubDate) }}</span>
                  <span class="read-more">阅读全文 &rarr;</span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div v-if="posts.length > itemsPerView" class="carousel-controls">
        <button class="control-btn prev" aria-label="Previous posts" @click="prevSlide">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        <button class="control-btn next" aria-label="Next posts" @click="nextSlide">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue'

interface Post {
  title: string
  link: string
  pubDate: string
  description: string
  thumbnail?: string
  categories?: string[]
}

export default defineComponent({
  name: 'LatestPosts',
  setup() {
    const posts = ref<Post[]>([])
    const loading = ref(true)
    const error = ref(false)
    const currentIndex = ref(0)
    const itemsPerView = ref(3)
    let autoPlayTimer: number | null = null

    const rssUrl = 'https://blog.cikcc.com/rss.xml'
    const CACHE_KEY = 'latest_posts_cache'
    const CACHE_TIME = 1000 * 60 * 60 // 1 小时

    const fetchPosts = async () => {
      loading.value = true
      
      // 1. 优先尝试从缓存加载
      try {
        const cached = localStorage.getItem(CACHE_KEY)
        if (cached) {
          const { timestamp, data } = JSON.parse(cached)
          if (Date.now() - timestamp < CACHE_TIME) {
            if (import.meta.env.DEV) console.debug('使用缓存的文章数据')
            posts.value = data
            loading.value = false
            startAutoPlay()
            return
          }
        }
      } catch (e) {
        console.warn('缓存解析失败', e)
        localStorage.removeItem(CACHE_KEY)
      }

      // 2. 使用多代理回退获取新鲜数据
      const proxies = [
        rssUrl,
        `https://api.allorigins.win/raw?url=${encodeURIComponent(rssUrl)}&t=${Date.now()}`,
        `https://corsproxy.io/?${encodeURIComponent(rssUrl)}`,
        `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(rssUrl)}`
      ]

      let success = false
      let newPosts: Post[] = []

      for (const proxyUrl of proxies) {
        try {
          const controller = new AbortController()
          const timeoutId = setTimeout(() => controller.abort(), 5000)
          
          const response = await fetch(proxyUrl, { signal: controller.signal })
          clearTimeout(timeoutId)
          
          if (!response.ok) continue
          
          const xmlText = await response.text()
          if (!xmlText.includes('<rss') && !xmlText.includes('<?xml')) continue

          const parser = new DOMParser()
          const xmlDoc = parser.parseFromString(xmlText, 'text/xml')
          
          const items = xmlDoc.querySelectorAll('item')
          if (items.length === 0) continue

          const parsedPosts: Post[] = []
          
          items.forEach(item => {
            const title = item.querySelector('title')?.textContent || ''
            const link = item.querySelector('link')?.textContent || ''
            const pubDate = item.querySelector('pubDate')?.textContent || ''
            const description = item.querySelector('description')?.textContent || ''
            
            const categories: string[] = []
            item.querySelectorAll('category').forEach(cat => {
              if (cat.textContent) categories.push(cat.textContent)
            })

            parsedPosts.push({
              title,
              link,
              pubDate,
              description,
              categories
            })
          })

          if (parsedPosts.length > 0) {
            newPosts = parsedPosts
            success = true
            break
          }

        } catch (e) {
          console.warn(`RSS 获取尝试失败 (${proxyUrl}):`, e)
        }
      }

      if (success) {
        posts.value = newPosts
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          timestamp: Date.now(),
          data: newPosts
        }))
        startAutoPlay()
        error.value = false
      } else {
        console.error('所有 RSS 获取尝试均已失败')
        
        try {
          const cached = localStorage.getItem(CACHE_KEY)
          if (cached) {
            const { data } = JSON.parse(cached)
            if (data && data.length) {
              if (import.meta.env.DEV) console.debug('使用过期缓存作为回退')
              posts.value = data
              startAutoPlay()
              error.value = false
            } else {
              error.value = true
            }
          } else {
            error.value = true
          }
        } catch {
          error.value = true
        }
      }
      
      loading.value = false
    }

    const startAutoPlay = () => {
      stopAutoPlay()
      if (posts.value.length <= itemsPerView.value) return
      
      autoPlayTimer = window.setInterval(() => {
        const maxIndex = posts.value.length - itemsPerView.value
        if (currentIndex.value >= maxIndex) {
          currentIndex.value = 0
        } else {
          currentIndex.value++
        }
      }, 5000)
    }

    const stopAutoPlay = () => {
      if (autoPlayTimer) {
        clearInterval(autoPlayTimer)
        autoPlayTimer = null
      }
    }

    const updateItemsPerView = () => {
      const oldVal = itemsPerView.value
      itemsPerView.value = window.innerWidth <= 640 ? 1 : window.innerWidth <= 1024 ? 2 : 3
      if (oldVal !== itemsPerView.value) {
        currentIndex.value = 0
      }
    }

    const nextSlide = () => {
      const maxIndex = posts.value.length - itemsPerView.value
      if (currentIndex.value >= maxIndex) {
        currentIndex.value = 0
      } else {
        currentIndex.value++
      }
    }

    const prevSlide = () => {
      const maxIndex = posts.value.length - itemsPerView.value
      if (currentIndex.value <= 0) {
        currentIndex.value = maxIndex
      } else {
        currentIndex.value--
      }
    }

    const formatDate = (dateStr: string) => {
      try {
        const date = new Date(dateStr)
        return date.toLocaleDateString('zh-CN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      } catch {
        return dateStr
      }
    }

    const stripHtml = (html: string) => {
      if (!html) return ''
      const doc = new DOMParser().parseFromString(html, 'text/html')
      const text = doc.body.textContent || ''
      return text.length > 100 ? text.substring(0, 100) + '...' : text
    }

    const getCategoryColor = (category: string) => {
      const colors = [
        { bg: '#dcfce7', text: '#15803d' },
        { bg: '#fef9c3', text: '#a16207' },
        { bg: '#fee2e2', text: '#b91c1c' },
        { bg: '#e0e7ff', text: '#4338ca' },
        { bg: '#f3e8ff', text: '#7e22ce' },
        { bg: '#ccfbf1', text: '#0f766e' },
        { bg: '#ffedd5', text: '#c2410c' },
        { bg: '#fce7f3', text: '#be185d' },
        { bg: '#dbeafe', text: '#1d4ed8' },
        { bg: '#ede9fe', text: '#6d28d9' },
      ]
      
      let hash = 0
      for (let i = 0; i < category.length; i++) {
        hash = category.charCodeAt(i) + ((hash << 5) - hash)
      }
      
      const index = Math.abs(hash) % colors.length
      const color = colors[index]
      
      return {
        backgroundColor: color.bg,
        color: color.text
      }
    }

    onMounted(() => {
      updateItemsPerView()
      window.addEventListener('resize', updateItemsPerView)
      fetchPosts()
    })

    onUnmounted(() => {
      stopAutoPlay()
      window.removeEventListener('resize', updateItemsPerView)
    })

    return { 
      posts, 
      loading, 
      error, 
      formatDate, 
      stripHtml, 
      getCategoryColor,
      currentIndex,
      itemsPerView,
      startAutoPlay,
      stopAutoPlay,
      nextSlide,
      prevSlide
    }
  }
})
</script>

<style scoped lang="scss">
.latest-posts { 
  padding: 60px 40px;
  display: flex; 
  flex-direction: column; 
  align-items: center;
  background: #f5f5f7;
  
  @media (max-width: 768px) {
    padding: 32px 0;
  }
}

.section-header { 
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 40px; 
  width: 100%; 
  max-width: 1200px;
  
  @media (max-width: 768px) {
    align-items: center;
    margin-bottom: 16px;
    padding: 0 24px;
  }
}

.header-left { 
  text-align: left;
  
  @media (max-width: 768px) {
    flex: 1;
  }
}

.section-header h2 { 
  font-size: 2.25rem; 
  font-weight: 700; 
  margin-bottom: 8px; 
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @media (max-width: 768px) {
    font-size: 1.375rem;
    margin-bottom: 4px;
    background: linear-gradient(135deg, #1e293b 0%, #475569 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
}

.section-header p { 
  font-size: 1rem;
  color: #64748b;
  
  @media (max-width: 768px) {
    font-size: 0.8125rem;
    color: #94a3b8;
  }
}

.view-more-btn {
  display: inline-flex;
  align-items: center;
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
  
  &:hover {
    background: linear-gradient(135deg, #8b5cf6, #a855f7);
    color: white;
    border-color: transparent;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(139, 92, 246, 0.3);
  }
  
  @media (max-width: 768px) {
    padding: 6px 14px;
    font-size: 0.6875rem;
    font-weight: 500;
    flex-shrink: 0;
    border-width: 1px;
    border-color: rgba(139, 92, 246, 0.25);
    background: rgba(139, 92, 246, 0.04);
    box-shadow: none;
    
    &:active {
      background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%);
      color: white;
      border-color: transparent;
    }
  }
}

.loading-state,
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 60px 20px;
  color: #64748b;
  font-size: 1rem;
  
  @media (max-width: 768px) {
    padding: 40px 20px;
    font-size: 0.875rem;
  }
}

.loading-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid rgba(139, 92, 246, 0.2);
  border-top-color: #8b5cf6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @media (max-width: 768px) {
    width: 24px;
    height: 24px;
    border-width: 2px;
  }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.carousel-wrapper {
  position: relative;
  width: 100%;
  max-width: 1200px;
  
  @media (max-width: 768px) {
    padding: 16px 0 0 0;
  }
}

.carousel-container {
  overflow: hidden;
  border-radius: 20px;
  
  @media (max-width: 768px) {
    border-radius: 0;
  }
}

.carousel-track {
  display: flex;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.carousel-item {
  flex-shrink: 0;
  padding: 0 12px;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    padding: 0 24px;
  }
}

.post-card {
  display: block;
  background: white;
  border-radius: 20px;
  overflow: hidden;
  text-decoration: none;
  transition: all 0.3s ease;
  height: 100%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.04);
  
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 40px rgba(139, 92, 246, 0.15);
  }
  
  @media (max-width: 768px) {
    border-radius: 16px;
    background: #f8fafc;
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

.post-content {
  padding: 28px;
  display: flex;
  flex-direction: column;
  min-height: 280px;
  
  @media (max-width: 768px) {
    padding: 20px;
    min-height: auto;
  }
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
  
  @media (max-width: 768px) {
    gap: 6px;
    margin-bottom: 12px;
  }
}

.post-tag {
  padding: 4px 12px;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 20px;
  white-space: nowrap;
  
  @media (max-width: 768px) {
    padding: 3px 10px;
    font-size: 0.6875rem;
  }
}

.post-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 12px 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.3s ease;
  
  @media (max-width: 768px) {
    font-size: 1.0625rem;
    margin-bottom: 10px;
    -webkit-line-clamp: 2;
  }
}

.post-card:hover .post-title {
  color: #8b5cf6;
}

.post-desc {
  font-size: 0.9rem;
  color: #64748b;
  line-height: 1.7;
  margin: 0;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  
  @media (max-width: 768px) {
    font-size: 0.8125rem;
    line-height: 1.6;
    -webkit-line-clamp: 2;
    color: #94a3b8;
  }
}

.post-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  
  @media (max-width: 768px) {
    margin-top: 14px;
    padding-top: 14px;
  }
}

.post-date {
  font-size: 0.8rem;
  color: #8b5cf6;
  font-weight: 500;
  padding: 4px 12px;
  background: rgba(139, 92, 246, 0.1);
  border-radius: 20px;
  
  @media (max-width: 768px) {
    font-size: 0.6875rem;
    padding: 3px 10px;
  }
}

.read-more {
  font-size: 0.85rem;
  font-weight: 600;
  color: #8b5cf6;
  transition: transform 0.3s ease;
  
  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
}

.post-card:hover .read-more {
  transform: translateX(4px);
}

.carousel-controls {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 32px;
  
  @media (max-width: 768px) {
    margin-top: 20px;
    gap: 12px;
    padding-bottom: 8px;
  }
}

.control-btn {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: white;
  border: 1.5px solid rgba(139, 92, 246, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #64748b;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  
  &:hover {
    background: linear-gradient(135deg, #8b5cf6, #a855f7);
    color: white;
    border-color: transparent;
    transform: scale(1.1);
    box-shadow: 0 8px 20px rgba(139, 92, 246, 0.3);
  }
  
  &:active {
    transform: scale(1.05);
  }
  
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    border-width: 1px;
    
    svg {
      width: 16px;
      height: 16px;
    }
    
    &:hover {
      transform: none;
      background: white;
      color: #64748b;
      border-color: rgba(139, 92, 246, 0.2);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    }
    
    &:active {
      background: linear-gradient(135deg, #8b5cf6, #a855f7);
      color: white;
      border-color: transparent;
      transform: scale(0.95);
    }
  }
}
</style>
