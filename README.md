<div align="center">
  <img src="public/logo.png" alt="CikWeb Logo" width="80" height="80">
  <h1>CikWeb</h1>
  <p><strong>🎨 现代化静态个人主页</strong></p>
  <p>基于 Vue 3 + TypeScript + Vite + Tailwind CSS 构建的简约个人主页解决方案</p>

  ![Vue](https://img.shields.io/badge/Vue-3.3+-4FC08D?style=flat-square&logo=vue.js&logoColor=white)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5.3+-3178C6?style=flat-square&logo=typescript&logoColor=white)
  ![Vite](https://img.shields.io/badge/Vite-5.0+-646CFF?style=flat-square&logo=vite&logoColor=white)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0+-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
  ![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

  [在线演示](https://cikcc.com) · [问题反馈](https://github.com/cikheo/CikWeb/issues) · [功能建议](https://github.com/cikheo/CikWeb/discussions)

</div>

---

## 📖 目录

- [项目简介](#-项目简介)
- [核心特性](#-核心特性)
- [快速开始](#-快速开始)
- [项目结构](#-项目结构)
- [功能模块](#-功能模块)
- [配置指南](#️-配置指南)
- [部署指南](#-部署指南)
- [常见问题](#-常见问题)
- [许可证](#-许可证)

---

## 📋 项目简介

CikWeb 是一款专为开发者和创作者设计的现代化个人主页。简约而不简单，集成了项目展示、工具推荐、社交媒体、最新文章、联系方式等核心模块。

### 为什么选择 CikWeb？

| 痛点 | 解决方案 |
|------|----------|
| 传统 SPA 应用 SEO 差 | SSG 静态站点生成，对搜索引擎友好 |
| 部署配置复杂 | 纯静态文件，零配置即可部署 |
| 响应式适配困难 | 内置完善的移动端/桌面端适配 |
| 代码维护困难 | 模块化组件 + TypeScript 类型安全 |
| 社交分享无预览 | 内置 Open Graph + Twitter Card 支持 |

---

## ✨ 核心特性

### 🚀 技术栈

- **⚡️ Vue 3 + Vite 5** - 毫秒级热更新，极速开发体验
- **💎 TypeScript** - 全量类型支持，代码更健壮
- **🎨 Tailwind CSS** - 原子化 CSS，快速构建 UI
- **🍍 Pinia** - 直观的响应式状态管理
- **📦 自动导入** - 组件与 API 按需自动导入
- **💻 Vite SSG** - 静态站点生成，SEO 友好

### 🎯 功能亮点

- **📱 响应式设计** - 完美适配移动端与桌面端
- **🔗 锚点导航** - 胶囊式导航栏，平滑滚动跳转
- **🌊 动态页脚** - 水波纹动画，根据页面主题适配
- **📡 RSS 集成** - 自动抓取展示博客最新文章
- **📞 联系组件** - 集成 Email、GitHub、微信等联系方式

---

## 🚀 快速开始

### 环境要求

| 依赖 | 版本要求 | 推荐版本 |
|------|----------|----------|
| Node.js | >= 18.0.0 | 20.x LTS |
| pnpm | >= 8.0.0 | 9.x |

### 一键启动

```bash
# 1. 克隆仓库
git clone https://github.com/cikheo/CikWeb.git
cd CikWeb

# 2. 安装依赖（推荐使用 pnpm）
pnpm install
或者
npm install

# 3. 启动开发服务器
pnpm dev
或者
npm run dev

```

启动成功后访问：
- 本地：http://localhost:5173
- 网络：http://你的IP:5173（支持移动设备预览）

### 常用命令

| 命令 | 说明 |
|------|------|
| `pnpm dev` | 启动开发服务器，支持热更新 |  |
| `pnpm build` | 构建生产版本 |  |
| `pnpm preview` | 本地预览构建产物 |  |
| `pnpm lint` | 运行 ESLint 代码检查 |  |
| `pnpm format` | 使用 Prettier 格式化代码 |  |

---

## 📂 项目结构

```
CikWeb/
├── public/                    # 公共静态资源
│   ├── logo.png              # 网站 Logo
│   └── favicon.png           # 网站图标
│
├── src/
│   ├── assets/img/           # 图片资源
│   │
│   ├── components/           # 可复用组件
│   │   ├── HeaderNav.vue     # 胶囊式导航栏（桌面端+移动端）
│   │   ├── Heo.vue           # 首屏视觉引导区
│   │   ├── FeaturedCarousel.vue  # 精选项目轮播
│   │   ├── ProjectShow.vue   # 项目深度展示容器
│   │   ├── ToolsSection.vue  # 工具推荐模块
│   │   ├── MediaSection.vue  # 社交媒体展示
│   │   ├── LatestPosts.vue   # 最新文章（RSS）
│   │   ├── ContactSection.vue # 联系方式组件
│   │   ├── Footer.vue        # 水波纹动态页脚
│   │   ├── BackToTop.vue     # 返回顶部按钮
│   │   └── ScrollReveal.vue  # 滚动动画组件
│   │
│   ├── data/                 # 静态数据配置
│   │   ├── featuredcarousel.ts   # 精选轮播数据
│   │   ├── projectshow.ts    # 项目展示数据
│   │   ├── tools.ts          # 工具推荐数据
│   │   └── media.ts          # 社交媒体数据
│   │
│   ├── pages/                # 页面组件
│   │   ├── Home.vue          # 首页
│   │   ├── Blog.vue          # 博客页
│   │   ├── About.vue         # 关于页
│   │   ├── WeChat.vue        # 微信公众号
│   │   ├── Privacy.vue       # 隐私政策
│   │   └── NotFound.vue      # 404 页面
│   │
│   ├── router/index.ts       # 路由配置
│   ├── stores/               # Pinia 状态管理
│   ├── styles/               # 全局样式
│   │   ├── main.scss         # 主样式文件
│   │   └── variables.scss    # SCSS 变量定义
│   └── utils/                # 工具函数
│
├── index.html                # HTML 入口
├── vite.config.ts            # Vite 配置
├── tailwind.config.js        # Tailwind CSS 配置
└── tsconfig.json             # TypeScript 配置
```

---

## 🧩 功能模块

### 页面路由

| 路径 | 页面 | 说明 |
|------|------|------|
| `/` | 首页 | 聚合展示所有核心模块 |
| `/blog` | 博客 | RSS 订阅文章列表 |
| `/about` | 关于 | 个人简介页面 |
| `/wechat` | 微信 | 微信公众号引流 |
| `/privacy` | 隐私 | 隐私政策声明 |

### 首页布局

首页采用模块化设计，从上到下依次为：

1. **Heo 视觉引导区** - 首屏展示，包含标题、描述与 CTA 按钮
2. **FeaturedCarousel** - 精选项目轮播展示
3. **ProjectShow** - 项目深度展示容器
   - ToolsSection - 工具推荐
   - MediaSection - 社交媒体
   - LatestPosts - 最新文章
   - ContactSection - 联系方式
4. **Footer** - 水波纹动态页脚

### 导航栏配置

| 按钮 | 目标 | 类型 |
|------|------|------|
| 推荐 | #featured | 锚点跳转 |
| 工具 | #tools | 锚点跳转 |
| 媒体 | #media | 锚点跳转 |
| 文章 | #posts | 锚点跳转 |
| 博客 | 外部链接 | 始终高亮显示 |

---

## ⚙️ 配置指南

### 1. 基础信息配置

编辑 `index.html` 修改网站元信息：

```html
<title>您的网站标题</title>
<meta name="description" content="您的网站描述" />
<meta name="keywords" content="关键词1, 关键词2" />
<meta name="author" content="您的名字" />
```

### 2. 数据文件配置

所有展示数据位于 `src/data/` 目录，修改对应文件即可：

#### 项目展示 (`projectshow.ts`)

```typescript
export const projectShowData = [
  {
    id: 'project-1',
    title: '项目名称',
    tag: '标签',
    description: '项目描述',
    featured: true,  // 是否在首页展示
    images: ['/path/to/image1.png', '/path/to/image2.png'],
    primaryBtn: { text: '立即体验', link: 'https://...', enabled: true },
    secondaryBtn: { text: '了解更多', link: 'https://...', enabled: true },
    thirdBtn: { text: 'GitHub', link: 'https://...', enabled: false }
  }
]
```

#### 工具推荐 (`tools.ts`)

```typescript
export const tools = [
  {
    name: '工具名称',
    description: '工具描述',
    url: 'https://tool-url.com',
    logo: '/path/to/logo.png'  // 可选，留空显示首字母
  }
]
```

#### 社交媒体 (`media.ts`)

```typescript
export const mediaList = [
  {
    name: '平台名称',
    url: 'https://...',
    icon: 'fab fa-github',  // FontAwesome 图标
    logo: '/path/to/logo.png',  // 自定义 logo（优先）
    followers: '1.2k'  // 可选
  }
]
```

### 3. RSS 订阅配置

修改以下文件中的 RSS 地址：

- `src/components/LatestPosts.vue` - 首页最新文章
- `src/pages/Blog.vue` - 博客页面

```typescript
const rssUrl = 'https://your-blog.com/rss.xml'
```

### 4. 导航栏博客链接

修改 `src/components/HeaderNav.vue` 中的博客外链：

```typescript
const navItems = [
  // ...
  { name: '博客', external: true, url: 'https://your-blog.com' }
]
```

### 5. 图片资源路径

所有图片资源放置在 `src/assets/img/` 目录，使用时：

```typescript
// 在数据文件中
import myImage from '@/assets/img/my-image.png'

// 或直接使用路径（需在 Vite 中配置）
logo: '@/assets/img/logo.png'
```

---

## 🌐 部署指南

### 方式一：腾讯云 EdgeOne Pages（推荐国内）

1. 登录 [EdgeOne Pages 控制台](https://console.cloud.tencent.com/edgeone/pages)
2. 创建项目 → 从 Git 导入
3. 配置构建参数：

| 配置项 | 值 |
|--------|----|
| 框架预设 | Vite |
| 构建命令 | `npm run build` |
| 输出目录 | `dist` |

优势：国内 CDN 加速，响应 < 100ms

### 方式二：Vercel（推荐海外）

1. 访问 [Vercel](https://vercel.com/) 导入 GitHub 仓库
2. 自动检测 Vite 项目，一键部署

### 方式三：Nginx 传统部署

```bash
# 1. 构建
pnpm build

# 2. 上传 dist 目录到服务器

# 3. Nginx 配置（可选）
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/your-site;
    index index.html;
    error_page 404 /404.html;
}
```

---

## ❓ 常见问题

**Q: 开发服务器启动失败？**
- 检查 Node.js 版本 >= 18.0.0
- 删除 `node_modules` 重新安装依赖

**Q: 图片无法显示？**
- 确保使用 `@/assets/img/` 路径别名
- 检查文件扩展名大小写

**Q: RSS 无法获取？**
- 检查 RSS 源是否支持 CORS
- 项目内置了多个代理，会自动尝试

**Q: 如何添加新页面？**
1. 在 `src/pages/` 创建 Vue 组件
2. 在 `src/router/index.ts` 添加路由

---

## 📄 许可证

本项目基于 [MIT License](./LICENSE) 开源。

```
MIT License
Copyright (c) 2026 Cik
```

---

<div align="center">
  <p>如果这个项目对你有帮助，请给一个 ⭐ Star 支持一下！</p>
  <p>Made with ❤️ by <a href="https://cikcc.com">Cik</a></p>
</div>
