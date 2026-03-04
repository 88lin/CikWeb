<!--
 * @Description: 博客页面 - RSS订阅方式
 * @Author: Cik
 * @Date: 2026-02-27
-->

<template>
  <div class="blog-page">
    <!-- 头部横幅 -->
    <div class="blog-header">
      <div class="header-bg"></div>
      <div class="header-content">
        <div class="header-text">
          <h1>最新订阅文章</h1>
          <p>来自我的博客动态</p>
        </div>
        <a :href="rssUrl" target="_blank" class="rss-btn">
          获取更多订阅 &rarr;
        </a>
      </div>
    </div>

    <!-- 文章列表 -->
    <div class="blog-content">
      <div v-if="loading" class="loading-state">
        <div class="loading-spinner"></div>
        <span>加载中...</span>
      </div>
      
      <div v-else-if="error" class="error-state">
        <span>暂时无法加载文章</span>
        <button class="retry-btn" @click="fetchPosts">重试</button>
      </div>

      <template v-else>
        <div class="posts-grid">
          <a 
            v-for="post in paginatedPosts" 
            :key="post.link" 
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
              <h3 class="post-title">{{ post.title }}</h3>
              <p class="post-desc">{{ stripHtml(post.description) }}</p>
              <div class="post-footer">
                <span class="post-date">{{ formatDate(post.pubDate) }}</span>
                <span class="read-more">阅读全文 &rarr;</span>
              </div>
            </div>
          </a>
        </div>

        <!-- 分页 -->
        <div v-if="totalPages > 1" class="pagination">
          <button 
            class="page-btn" 
            :disabled="currentPage === 1"
            @click="currentPage = 1"
          >
            首页
          </button>
          <button 
            class="page-btn" 
            :disabled="currentPage === 1"
            @click="currentPage--"
          >
            上一页
          </button>
          <div class="page-numbers">
            <button
              v-for="page in displayedPages"
              :key="page"
              class="page-num"
              :class="{ active: page === currentPage }"
              @click="currentPage = page"
            >
              {{ page }}
            </button>
          </div>
          <button 
            class="page-btn" 
            :disabled="currentPage === totalPages"
            @click="currentPage++"
          >
            下一页
          </button>
          <button 
            class="page-btn" 
            :disabled="currentPage === totalPages"
            @click="currentPage = totalPages"
          >
            末页
          </button>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'

interface Post {
  title: string
  link: string
  pubDate: string
  description: string
  categories?: string[]
}

export default defineComponent({
  name: 'BlogPage',
  setup() {
    const posts = ref<Post[]>([])
    const loading = ref(true)
    const error = ref(false)
    const currentPage = ref(1)
    const itemsPerPage = 9

    const rssUrl = 'https://blog.cikcc.com/rss.xml'
    const CACHE_KEY = 'blog_posts_cache'
    const CACHE_TIME = 1000 * 60 * 60

    const totalPages = computed(() => Math.ceil(posts.value.length / itemsPerPage))
    
    const paginatedPosts = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage
      const end = start + itemsPerPage
      return posts.value.slice(start, end)
    })

    const displayedPages = computed(() => {
      const pages: number[] = []
      const total = totalPages.value
      const current = currentPage.value
      
      let start = Math.max(1, current - 2)
      let end = Math.min(total, current + 2)
      
      if (end - start < 4) {
        if (start === 1) {
          end = Math.min(total, 5)
        } else if (end === total) {
          start = Math.max(1, total - 4)
        }
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      
      return pages
    })

    const fetchPosts = async () => {
      loading.value = true
      error.value = false
      
      try {
        const cached = localStorage.getItem(CACHE_KEY)
        if (cached) {
          const { timestamp, data } = JSON.parse(cached)
          if (Date.now() - timestamp < CACHE_TIME) {
            posts.value = data
            loading.value = false
            return
          }
        }
      } catch (e) {
        localStorage.removeItem(CACHE_KEY)
      }

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

            parsedPosts.push({ title, link, pubDate, description, categories })
          })

          if (parsedPosts.length > 0) {
            newPosts = parsedPosts
            success = true
            break
          }
        } catch (e) {
          console.warn(`RSS fetch failed (${proxyUrl}):`, e)
        }
      }

      if (success) {
        posts.value = newPosts
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          timestamp: Date.now(),
          data: newPosts
        }))
      } else {
        try {
          const cached = localStorage.getItem(CACHE_KEY)
          if (cached) {
            const { data } = JSON.parse(cached)
            if (data && data.length) {
              posts.value = data
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
      return text.length > 120 ? text.substring(0, 120) + '...' : text
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
      return { backgroundColor: colors[index].bg, color: colors[index].text }
    }

    onMounted(() => {
      fetchPosts()
    })

    return { 
      posts, 
      loading, 
      error, 
      currentPage,
      totalPages,
      paginatedPosts,
      displayedPages,
      rssUrl,
      fetchPosts,
      formatDate, 
      stripHtml, 
      getCategoryColor
    }
  }
})
</script>

<style scoped lang="scss">
.blog-page {
  min-height: 100vh;
  background: #f5f5f7;
}

// 头部横幅
.blog-header {
  position: relative;
  min-height: 280px;
  padding: 40px;
  margin: 100px auto 40px;
  max-width: 1280px;
  border-radius: 24px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  
  @media (max-width: 1320px) {
    margin: 100px 20px 40px;
  }
  
  @media (max-width: 768px) {
    min-height: 200px;
    margin: 80px 20px 24px;
    padding: 24px;
    border-radius: 20px;
  }
}

.header-bg {
  position: absolute;
  inset: 0;
  background: url('@/assets/img/wzbj-cik-cover.webp') center/cover no-repeat;
}

.header-content {
  position: relative;
  z-index: 1;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
}

.header-text {
  h1 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 6px;
    
    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }
  
  p {
    font-size: 0.95rem;
    opacity: 0.85;
    margin: 0;
  }
}

.rss-btn {
  display: inline-flex;
  align-items: center;
  padding: 12px 24px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 999px;
  color: white;
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  flex-shrink: 0;
  
  &:hover {
    background: white;
    color: #8b5cf6;
    transform: translateY(-2px);
  }
}

// 内容区
.blog-content {
  padding: 0 0 60px;
  max-width: 1280px;
  margin: 0 auto;
  
  @media (max-width: 1320px) {
    padding: 0 20px 60px;
  }
  
  @media (max-width: 768px) {
    padding: 0 20px 40px;
  }
}

.loading-state,
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 80px 20px;
  color: #64748b;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(139, 92, 246, 0.2);
  border-top-color: #8b5cf6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.retry-btn {
  padding: 10px 24px;
  background: #8b5cf6;
  color: white;
  border: none;
  border-radius: 999px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #7c3aed;
    transform: translateY(-2px);
  }
}

// 文章网格
.posts-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
}

.post-card {
  display: block;
  background: white;
  border-radius: 20px;
  overflow: hidden;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.04);
  
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 40px rgba(139, 92, 246, 0.12);
  }
}

.post-content {
  padding: 28px;
  display: flex;
  flex-direction: column;
  min-height: 260px;
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.post-tag {
  padding: 4px 12px;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 20px;
  white-space: nowrap;
}

.post-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 12px 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.3s ease;
}

.post-card:hover .post-title {
  color: #8b5cf6;
}

.post-desc {
  font-size: 0.875rem;
  color: #64748b;
  line-height: 1.7;
  margin: 0;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}

.post-date {
  font-size: 0.8rem;
  color: #8b5cf6;
  font-weight: 500;
  padding: 4px 12px;
  background: rgba(139, 92, 246, 0.1);
  border-radius: 20px;
}

.read-more {
  font-size: 0.85rem;
  font-weight: 600;
  color: #8b5cf6;
  transition: transform 0.3s ease;
}

.post-card:hover .read-more {
  transform: translateX(4px);
}

// 分页
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 48px;
  flex-wrap: wrap;
  
  @media (max-width: 640px) {
    gap: 6px;
  }
}

.page-btn {
  padding: 10px 20px;
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 500;
  color: #64748b;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    background: #f8fafc;
    border-color: #8b5cf6;
    color: #8b5cf6;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  @media (max-width: 640px) {
    padding: 8px 12px;
    font-size: 0.8rem;
  }
}

.page-numbers {
  display: flex;
  gap: 4px;
}

.page-num {
  width: 40px;
  height: 40px;
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 500;
  color: #64748b;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover:not(.active) {
    background: #f8fafc;
    border-color: #8b5cf6;
    color: #8b5cf6;
  }
  
  &.active {
    background: linear-gradient(135deg, #8b5cf6, #a855f7);
    border-color: transparent;
    color: white;
    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
  }
  
  @media (max-width: 640px) {
    width: 36px;
    height: 36px;
    font-size: 0.8rem;
  }
}
</style>
