<!--
 * @Description: CikGen密码生成器隐私协议页面
 * @Author: Cik
 * @Date: 2026-03-03
-->

<template>
  <div class="privacy-page">
    <div class="privacy-container">
      <div class="privacy-content markdown-body" v-html="renderedContent"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { marked } from 'marked'

// Markdown 内容
const markdownContent = ref(`
# CikGen密码生成器隐私协议

**更新于 2026年3月3日**

---

CikGen 不会收集、上传或分享您的任何数据

所有密码和历史记录仅保存在您的浏览器本地 IndexedDB 数据库中，完全由您掌控。

---

### 不收集任何数据

CikGen 不会收集您的任何个人信息或使用数据。

### 不发送网络请求

应用程序不会向任何服务器发送数据，所有操作均在本地完成。

### 数据仅保存本地

您生成的所有密码和相关数据仅存储在您的设备本地。

### 完全离线运行

CikGen 无需网络连接即可正常使用，确保您的数据安全。

---

如果您对本隐私政策有任何疑问，请通过以下方式联系我：

**邮箱：** [cikheo@qq.com](mailto:cikheo@qq.com)
`)

const renderedContent = ref('')

onMounted(() => {
  // 配置 marked
  marked.setOptions({
    breaks: true,
    gfm: true,
  })

  // 渲染 Markdown
  renderedContent.value = marked.parse(markdownContent.value)
})
</script>

<style scoped lang="scss">
.privacy-page {
  min-height: 100vh;
  padding: 120px 0 80px;
  background: #f5f5f7;

  @media (max-width: 768px) {
    padding: 100px 0 60px;
  }
}

.privacy-container {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 48px;

  @media (max-width: 768px) {
    padding: 0 24px;
  }
}

.privacy-content {
  width: 100%;
  background: transparent;
}

// ==================== Markdown 样式 ====================

:deep(.markdown-body) {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 1.8;
  color: #1a1a1a;

  h1 {
    font-size: 2.5rem;
    font-weight: 800;
    color: #1a1a1a;
    margin: 0 0 16px 0;
    text-align: center;

    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1a1a1a;
    margin: 32px 0 16px 0;
    text-align: center;

    @media (max-width: 768px) {
      font-size: 1.25rem;
      margin: 24px 0 12px 0;
    }
  }

  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #2c2c2c;
    margin: 28px 0 12px 0;

    @media (max-width: 768px) {
      font-size: 1.1rem;
    }
  }

  p {
    margin: 0 0 16px 0;
    color: #3c3c3c;
    line-height: 1.8;

    &:first-of-type {
      text-align: center;
      color: #64748b;
    }
  }

  strong {
    font-weight: 600;
    color: #1a1a1a;
  }

  hr {
    border: none;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(232, 180, 184, 0.4) 20%,
      rgba(232, 180, 184, 0.4) 80%,
      transparent 100%
    );
    margin: 32px 0;
  }

  ul,
  ol {
    margin: 16px 0;
    padding-left: 32px;

    li {
      margin: 8px 0;
      color: #3c3c3c;
      line-height: 1.8;

      &::marker {
        color: #e8b4b8;
      }
    }
  }

  a {
    color: #e8b4b8;
    text-decoration: none;
    transition: all 0.3s ease;

    &:hover {
      color: #d4a0a4;
      text-decoration: underline;
    }
  }

  code {
    background: rgba(232, 180, 184, 0.1);
    padding: 2px 6px;
    border-radius: 4px;
    font-family: 'Consolas', 'Monaco', monospace;
    font-size: 0.9em;
    color: #e8b4b8;
  }

  pre {
    background: #2c2c2c;
    padding: 16px;
    border-radius: 8px;
    overflow-x: auto;
    margin: 20px 0;

    code {
      background: transparent;
      color: #f5f5f7;
      padding: 0;
    }
  }

  blockquote {
    border-left: 4px solid #e8b4b8;
    padding-left: 20px;
    margin: 20px 0;
    color: #64748b;
    font-style: italic;
  }
}
</style>
