<!--
 * @Description: 隐私政策页面 - 支持 Markdown
 * @Author: Cik
 * @Date: 2026-02-27
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
# 隐私政策

**更新于 2026年1月24日**

## 1. 简介

欢迎访问 Cik 的个人主页（以下简称"本网站"或者"CikWeb"）。本网站为个人展示用途，用于分享我的作品、文章或相关信息。我尊重并致力于保护您的隐私。本隐私政策旨在说明本网站如何收集、使用和保护您的个人信息。

## 2. 收集的信息

### 2.1 您主动提供的信息

- 当您通过电子邮件或评论功能与我联系时，我可能会收到您的姓名、电子邮件地址及您选择提供的其他信息。
- 这些信息仅用于回复您的询问或进行相关交流。

### 2.2 自动收集的信息

- 本网站可能通过 Cookie 或类似技术自动收集某些非个人身份信息，例如浏览器类型、IP地址、访问时间、浏览页面等。
- 这些信息主要用于分析访问趋势、优化网站体验，且通常为匿名数据。

## 3. 信息的使用

我所收集的信息仅用于以下目的：

- 确保网站正常运行并提供良好体验；
- 回复您的消息或请求；
- 分析网站流量以改进内容与结构；
- 在法律要求时配合相关部门。

## 4. 信息的保护

我会采取合理措施保护您的信息，防止未经授权的访问、使用或泄露。但由于互联网传输并非 100% 安全，我无法保证信息的绝对安全。

## 5. 第三方服务

本网站可能使用第三方服务（例如网站托管、分析工具等）。这些服务提供商可能有自己的隐私政策，建议您查阅相关条款。

## 6. 您的权利

您有权：

- 询问我是否持有您的个人信息；
- 要求更正或删除您提供的个人信息（法律允许范围内）；
- 拒绝接受 Cookie（可通过浏览器设置实现）。

## 7. 链接到其他网站

本网站可能包含指向第三方网站的链接。我对这些网站的隐私实践不负责任，建议您访问时查阅其隐私政策。

## 8. 隐私政策的更新

我可能会不定期更新本隐私政策，更新后的版本将在本页面发布。请定期查阅以了解最新内容。

## 9. 联系我

如果您对本隐私政策有任何疑问，请通过以下方式联系我：

**邮箱：** [cikheo@qq.com](mailto:cikheo@qq.com)
`)

const renderedContent = ref('')

onMounted(() => {
  // 配置 marked
  marked.setOptions({
    breaks: true,
    gfm: true
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
  max-width: 1280px;
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
    margin: 0 0 24px 0;
    padding-bottom: 16px;
    border-bottom: 2px solid rgba(232, 180, 184, 0.3);
    
    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }
  
  h2 {
    font-size: 1.75rem;
    font-weight: 700;
    color: #1a1a1a;
    margin: 48px 0 20px 0;
    
    @media (max-width: 768px) {
      font-size: 1.5rem;
      margin: 32px 0 16px 0;
    }
  }
  
  h3 {
    font-size: 1.35rem;
    font-weight: 600;
    color: #2c2c2c;
    margin: 32px 0 16px 0;
  }
  
  p {
    margin: 0 0 20px 0;
    color: #3c3c3c;
    line-height: 1.8;
  }
  
  strong {
    font-weight: 600;
    color: #64748b;
  }
  
  hr {
    border: none;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(232, 180, 184, 0.3) 20%,
      rgba(232, 180, 184, 0.3) 80%,
      transparent 100%
    );
    margin: 32px 0;
  }
  
  ul, ol {
    margin: 16px 0;
    padding-left: 32px;
    
    li {
      margin: 8px 0;
      color: #3c3c3c;
      line-height: 1.8;
      
      &::marker {
        color: #E8B4B8;
      }
    }
  }
  
  a {
    color: #3c3c3c;
    text-decoration: none;
    transition: all 0.3s ease;
    
    &:hover {
      color: #E8B4B8;
      text-decoration: underline;
    }
  }
  
  code {
    background: rgba(232, 180, 184, 0.1);
    padding: 2px 6px;
    border-radius: 4px;
    font-family: 'Consolas', 'Monaco', monospace;
    font-size: 0.9em;
    color: #E8B4B8;
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
    border-left: 4px solid #E8B4B8;
    padding-left: 20px;
    margin: 20px 0;
    color: #64748b;
    font-style: italic;
  }
}
</style>
