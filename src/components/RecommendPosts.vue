<!--
 * @Description: 推荐文章组件 - 分类列表展示
 * @Author: Cik
 * @Date: 2026-03-02
-->

<template>
  <section class="recommend-posts">
    <div class="container">
      <div class="section-header">
        <div class="header-left">
          <h2 class="section-title">推荐文章</h2>
          <p class="section-subtitle">精选优质内容分享</p>
        </div>
      </div>
      
      <div v-if="loading" class="loading-state">
        <div class="loading-spinner"></div>
        <span>加载中...</span>
      </div>
      
      <div v-else-if="error" class="error-state">
        <span>暂时无法加载文章</span>
      </div>

      <div v-else class="posts-grid">
        <!-- 技术分享栏 -->
        <div class="category-column tech">
          <div class="column-header">
            <div class="icon-wrapper">
              <span class="column-icon">💻</span>
            </div>
            <div class="header-text">
              <h3 class="column-title">技术分享</h3>
            </div>
          </div>
          <div class="posts-list">
            <a 
              v-for="(post, index) in techPosts" 
              :key="post.link"
              :href="post.link"
              target="_blank"
              rel="noopener"
              class="post-item"
            >
              <span class="post-index">{{ String(index + 1).padStart(2, '0') }}</span>
              <span class="post-title">{{ post.title }}</span>
              <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <div v-if="techPosts.length === 0" class="empty-state">
              <span>💭</span>
              <p>暂无文章</p>
            </div>
          </div>
        </div>

        <!-- 干货分享栏 -->
        <div class="category-column tips">
          <div class="column-header">
            <div class="icon-wrapper">
              <span class="column-icon">📦</span>
            </div>
            <div class="header-text">
              <h3 class="column-title">干货分享</h3>
            </div>
          </div>
          <div class="posts-list">
            <a 
              v-for="(post, index) in tipsPosts" 
              :key="post.link"
              :href="post.link"
              target="_blank"
              rel="noopener"
              class="post-item"
            >
              <span class="post-index">{{ String(index + 1).padStart(2, '0') }}</span>
              <span class="post-title">{{ post.title }}</span>
              <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <div v-if="tipsPosts.length === 0" class="empty-state">
              <span>💭</span>
              <p>暂无文章</p>
            </div>
          </div>
        </div>

        <!-- 资源分享栏 -->
        <div class="category-column resource">
          <div class="column-header">
            <div class="icon-wrapper">
              <span class="column-icon">🎁</span>
            </div>
            <div class="header-text">
              <h3 class="column-title">资源分享</h3>
            </div>
          </div>
          <div class="posts-list">
            <a 
              v-for="(post, index) in resourcePosts" 
              :key="post.link"
              :href="post.link"
              target="_blank"
              rel="noopener"
              class="post-item"
            >
              <span class="post-index">{{ String(index + 1).padStart(2, '0') }}</span>
              <span class="post-title">{{ post.title }}</span>
              <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <div v-if="resourcePosts.length === 0" class="empty-state">
              <span>💭</span>
              <p>暂无文章</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
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
  name: 'RecommendPosts',
  setup() {
    const allPosts = ref<Post[]>([])
    const loading = ref(true)
    const error = ref(false)

    const rssUrl = 'https://blog.cikcc.com/rss.xml'
    const CACHE_KEY = 'recommend_posts_cache'
    const CACHE_TIME = 1000 * 60 * 60 // 1 小时

    // 按分类筛选文章
    const techPosts = computed(() => 
      allPosts.value.filter(post => 
        post.categories?.includes('技术分享')
      ).slice(0, 3)
    )

    const tipsPosts = computed(() => 
      allPosts.value.filter(post => 
        post.categories?.includes('干货分享')
      ).slice(0, 3)
    )

    const resourcePosts = computed(() => 
      allPosts.value.filter(post => 
        post.categories?.includes('资源分享')
      ).slice(0, 3)
    )

    const fetchPosts = async () => {
      loading.value = true
      
      // 1. 优先尝试从缓存加载
      try {
        const cached = localStorage.getItem(CACHE_KEY)
        if (cached) {
          const { timestamp, data } = JSON.parse(cached)
          if (Date.now() - timestamp < CACHE_TIME) {
            if (import.meta.env.DEV) console.debug('使用缓存的推荐文章数据')
            allPosts.value = data
            loading.value = false
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
        allPosts.value = newPosts
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          timestamp: Date.now(),
          data: newPosts
        }))
        error.value = false
      } else {
        console.error('所有 RSS 获取尝试均已失败')
        
        try {
          const cached = localStorage.getItem(CACHE_KEY)
          if (cached) {
            const { data } = JSON.parse(cached)
            if (data && data.length) {
              if (import.meta.env.DEV) console.debug('使用过期缓存作为回退')
              allPosts.value = data
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

    const formatDate = (dateStr: string) => {
      try {
        const date = new Date(dateStr)
        return date.toLocaleDateString('zh-CN', {
          month: 'short',
          day: 'numeric'
        })
      } catch {
        return dateStr
      }
    }

    onMounted(() => {
      fetchPosts()
    })

    return { 
      loading, 
      error, 
      techPosts,
      tipsPosts,
      resourcePosts,
      formatDate
    }
  }
})
</script>

<style scoped lang="scss">
.recommend-posts {
  width: 100%;
  padding: 60px 40px;
  background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
  
  @media (max-width: 768px) {
    padding: 32px 0;
    background: #f8fafc;
  }
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 0 24px;
  }
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 40px;
  
  @media (max-width: 768px) {
    margin-bottom: 24px;
  }
}

.header-left {
  text-align: left;
}

.section-title {
  font-size: 2.25rem;
  font-weight: 800;
  margin: 0 0 8px 0;
  background: linear-gradient(135deg, #1e293b 0%, #475569 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @media (max-width: 768px) {
    font-size: 1.375rem;
    font-weight: 700;
    margin-bottom: 4px;
  }
}

.section-subtitle {
  font-size: 1rem;
  color: #64748b;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 0.8125rem;
    color: #94a3b8;
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
  font-size: 1rem;
  
  @media (max-width: 768px) {
    padding: 60px 20px;
    font-size: 0.875rem;
  }
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(139, 92, 246, 0.15);
  border-top-color: #8b5cf6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
    border-width: 2px;
  }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  
  @media (max-width: 560px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}

// 分类栏通用样式
.category-column {
  background: white;
  border-radius: 20px;
  padding: 0;
  overflow: hidden;
  box-shadow: 
    0 4px 20px rgba(0, 0, 0, 0.04),
    0 1px 3px rgba(0, 0, 0, 0.02);
  border: 1px solid rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 
      0 12px 32px rgba(0, 0, 0, 0.08),
      0 4px 12px rgba(0, 0, 0, 0.04);
  }
  
  @media (max-width: 768px) {
    border-radius: 16px;
    
    &:hover {
      transform: none;
      box-shadow: 
        0 4px 20px rgba(0, 0, 0, 0.04),
        0 1px 3px rgba(0, 0, 0, 0.02);
    }
  }
}

// 栏头部
.column-header {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 24px 24px 20px;
  
  @media (max-width: 768px) {
    padding: 20px 20px 16px;
    gap: 12px;
  }
}

.icon-wrapper {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    border-radius: 12px;
  }
}

.column-icon {
  font-size: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
}

.header-text {
  flex: 1;
}

.column-title {
  font-size: 1.125rem;
  font-weight: 700;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
}

// 技术分享 - 蓝色主题
.category-column.tech {
  .icon-wrapper {
    background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
  }
  
  .column-title {
    color: #1d4ed8;
  }
  
  .post-index {
    color: #3b82f6;
  }
  
  .post-item:hover {
    background: linear-gradient(90deg, rgba(59, 130, 246, 0.06) 0%, transparent 100%);
    
    .post-title {
      color: #2563eb;
    }
    
    .arrow-icon {
      color: #3b82f6;
      transform: translateX(4px);
    }
  }
}

// 干货分享 - 紫色主题
.category-column.tips {
  .icon-wrapper {
    background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%);
  }
  
  .column-title {
    color: #7c3aed;
  }
  
  .post-index {
    color: #8b5cf6;
  }
  
  .post-item:hover {
    background: linear-gradient(90deg, rgba(139, 92, 246, 0.06) 0%, transparent 100%);
    
    .post-title {
      color: #7c3aed;
    }
    
    .arrow-icon {
      color: #8b5cf6;
      transform: translateX(4px);
    }
  }
}

// 资源分享 - 绿色主题
.category-column.resource {
  .icon-wrapper {
    background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
  }
  
  .column-title {
    color: #16a34a;
  }
  
  .post-index {
    color: #22c55e;
  }
  
  .post-item:hover {
    background: linear-gradient(90deg, rgba(34, 197, 94, 0.06) 0%, transparent 100%);
    
    .post-title {
      color: #16a34a;
    }
    
    .arrow-icon {
      color: #22c55e;
      transform: translateX(4px);
    }
  }
}

// 文章列表
.posts-list {
  display: flex;
  flex-direction: column;
  padding: 0 8px 8px;
  
  @media (max-width: 768px) {
    padding: 0 6px 6px;
  }
}

.post-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  text-decoration: none;
  border-radius: 12px;
  transition: all 0.25s ease;
  
  @media (max-width: 768px) {
    padding: 12px 14px;
    gap: 10px;
    border-radius: 10px;
  }
}

.post-index {
  font-size: 0.8125rem;
  font-weight: 700;
  font-family: 'SF Mono', 'Menlo', monospace;
  opacity: 0.6;
  flex-shrink: 0;
  
  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
}

.post-title {
  flex: 1;
  font-size: 0.9375rem;
  font-weight: 500;
  color: #334155;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.25s ease;
  
  @media (max-width: 768px) {
    font-size: 0.875rem;
    -webkit-line-clamp: 2;
  }
}

.arrow-icon {
  width: 16px;
  height: 16px;
  color: #cbd5e1;
  flex-shrink: 0;
  transition: all 0.25s ease;
  
  @media (max-width: 768px) {
    width: 14px;
    height: 14px;
  }
}

.empty-state {
  padding: 40px 20px;
  text-align: center;
  color: #94a3b8;
  
  span {
    font-size: 2rem;
    display: block;
    margin-bottom: 8px;
  }
  
  p {
    font-size: 0.875rem;
    margin: 0;
  }
  
  @media (max-width: 768px) {
    padding: 32px 16px;
    
    span {
      font-size: 1.5rem;
    }
    
    p {
      font-size: 0.8125rem;
    }
  }
}
</style>
