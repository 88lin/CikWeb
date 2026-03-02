<!--
 * @Description: 博客列表组件（支持 RSS 解析）
 * @Author: Cik
 * @Date: 2026-02-27
-->

<template>
  <div class="blog-list">
    <div v-if="loading" class="loading">
      <p>加载中...</p>
    </div>

    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
    </div>

    <div v-else class="posts">
      <div v-for="post in posts" :key="post.link" class="post-item">
        <h3 class="post-title">
          <a :href="post.link" target="_blank">{{ post.title }}</a>
        </h3>
        <p class="post-meta">
          <span v-if="post.author">作者: {{ post.author }}</span>
          <span class="date">{{ formatDate(post.pubDate) }}</span>
        </p>
        <p class="post-description" v-html="sanitize(post.description)"></p>
      </div>

      <div v-if="posts.length === 0" class="empty">
        <p>暂无文章</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import DOMPurify from 'dompurify'
import type { Post } from '@/types'

const props = withDefaults(
  defineProps<{
    rssUrl?: string
    limit?: number
  }>(),
  {
    rssUrl: '',
    limit: 10,
  }
)

const posts = ref<Post[]>([])
const loading = ref(false)
const error = ref('')

const fetchRSS = async () => {
  if (!props.rssUrl) {
    error.value = '未配置 RSS 链接'
    return
  }

  loading.value = true
  error.value = ''

  try {
    // 使用 RSS 代理服务解决 CORS 问题
    const proxyUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(props.rssUrl)}`
    const response = await fetch(proxyUrl)
    const data = await response.json()

    if (data.status === 'ok') {
      posts.value = data.items.slice(0, props.limit).map((item: any) => ({
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
        description: item.description,
        author: item.author,
      }))
    } else {
      error.value = 'RSS 解析失败'
    }
  } catch (err) {
    error.value = '加载 RSS 失败'
    console.error('RSS fetch error:', err)
  } finally {
    loading.value = false
  }
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const sanitize = (html: string) => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'a'],
    ALLOWED_ATTR: ['href', 'target'],
  })
}

onMounted(() => {
  fetchRSS()
})
</script>

<style scoped lang="scss">
.blog-list {
  min-height: 300px;
}

.loading,
.error,
.empty {
  text-align: center;
  padding: $spacing-xl;
  color: $text-secondary;
}

.error {
  color: $danger-color;
}

.posts {
  display: flex;
  flex-direction: column;
  gap: $spacing-lg;
}

.post-item {
  padding: $spacing-lg;
  background: white;
  border-radius: $border-radius-large;
  box-shadow: $box-shadow-base;
  transition: all 0.3s;

  &:hover {
    box-shadow: $box-shadow-light;
  }
}

.post-title {
  font-size: $font-size-lg;
  font-weight: bold;
  margin-bottom: $spacing-sm;

  a {
    color: $text-primary;

    &:hover {
      color: $primary-color;
    }
  }
}

.post-meta {
  font-size: $font-size-sm;
  color: $text-secondary;
  margin-bottom: $spacing-md;
  display: flex;
  gap: $spacing-md;

  .date {
    &::before {
      content: '•';
      margin-right: $spacing-sm;
    }
  }
}

.post-description {
  font-size: $font-size-sm;
  color: $text-regular;
  line-height: 1.6;

  :deep(p) {
    margin-bottom: $spacing-sm;
  }

  :deep(a) {
    color: $primary-color;
  }
}
</style>
