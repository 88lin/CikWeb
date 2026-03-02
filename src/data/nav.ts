/*
 * @Description: 网址导航数据配置
 * @Author: Cik
 * @Date: 2026-03-01
 */

export interface NavItem {
  name: string
  description: string
  url: string
  icon: string // 图标URL、图片路径或emoji
  iconBg?: string // 图标背景色（emoji或单色图标时使用）
  isImage?: boolean // 是否为图片路径
}

export interface NavCategory {
  name: string
  icon: string // Font Awesome 图标类名
  items: NavItem[]
}

export const navCategories: NavCategory[] = [
  {
    name: '常用工具',
    icon: 'fas fa-command',
    items: [
      {
        name: 'ChatGPT',
        description: 'OpenAI出品的AI对话助手',
        url: 'https://chat.openai.com',
        icon: '🤖',
        iconBg: '#10a37f',
      },
      {
        name: 'GitHub',
        description: '全球最大的代码托管平台',
        url: 'https://github.com',
        icon: '🐙',
        iconBg: '#24292e',
      },
      {
        name: 'Notion',
        description: '强大的笔记与协作工具',
        url: 'https://notion.so',
        icon: '📝',
        iconBg: '#000000',
      },
      {
        name: 'Figma',
        description: '在线协作设计工具',
        url: 'https://figma.com',
        icon: '🎨',
        iconBg: '#f24e1e',
      },
    ],
  },
  {
    name: '媒体',
    icon: 'fas fa-play-circle',
    items: [
      {
        name: '博客',
        description: '我的个人技术博客',
        url: 'https://blog.cikcc.com',
        icon: '📖',
        iconBg: '#ff6b6b',
      },
      {
        name: 'Bilibili',
        description: '分享生活的小事',
        url: 'https://space.bilibili.com',
        icon: '📺',
        iconBg: '#fb7299',
      },
      {
        name: '爱发电',
        description: '分享有趣有料的文章与资源',
        url: 'https://afdian.net',
        icon: '⚡',
        iconBg: '#946ce6',
      },
      {
        name: '公众号',
        description: '第一时间获取动态',
        url: '/wechat',
        icon: '💬',
        iconBg: '#07c160',
      },
    ],
  },
  {
    name: '开发资源',
    icon: 'fas fa-code',
    items: [
      {
        name: 'Vue.js',
        description: '渐进式JavaScript框架',
        url: 'https://vuejs.org',
        icon: '💚',
        iconBg: '#42b883',
      },
      {
        name: 'Vite',
        description: '下一代前端构建工具',
        url: 'https://vitejs.dev',
        icon: '⚡',
        iconBg: '#646cff',
      },
      {
        name: 'Tailwind CSS',
        description: '实用优先的CSS框架',
        url: 'https://tailwindcss.com',
        icon: '🎨',
        iconBg: '#38bdf8',
      },
      {
        name: 'MDN',
        description: 'Web开发权威文档',
        url: 'https://developer.mozilla.org',
        icon: '📚',
        iconBg: '#1e293b',
      },
    ],
  },
  {
    name: '设计网站',
    icon: 'fas fa-palette',
    items: [
      {
        name: 'Dribbble',
        description: '设计师作品分享平台',
        url: 'https://dribbble.com',
        icon: '🏀',
        iconBg: '#ea4c89',
      },
      {
        name: 'Behance',
        description: 'Adobe创意作品展示',
        url: 'https://behance.net',
        icon: '🎭',
        iconBg: '#1769ff',
      },
      {
        name: 'Pinterest',
        description: '图片灵感收集平台',
        url: 'https://pinterest.com',
        icon: '📌',
        iconBg: '#e60023',
      },
      {
        name: 'Unsplash',
        description: '高质量免费图片素材',
        url: 'https://unsplash.com',
        icon: '📷',
        iconBg: '#000000',
      },
    ],
  },
  {
    name: 'AI工具',
    icon: 'fas fa-robot',
    items: [
      {
        name: 'Claude',
        description: 'Anthropic的AI助手',
        url: 'https://claude.ai',
        icon: '🧠',
        iconBg: '#d4a574',
      },
      {
        name: 'Midjourney',
        description: 'AI图像生成工具',
        url: 'https://midjourney.com',
        icon: '🖼️',
        iconBg: '#000000',
      },
      {
        name: 'Perplexity',
        description: 'AI搜索引擎',
        url: 'https://perplexity.ai',
        icon: '🔍',
        iconBg: '#20808d',
      },
      {
        name: 'Gamma',
        description: 'AI演示文稿生成',
        url: 'https://gamma.app',
        icon: '📊',
        iconBg: '#8b5cf6',
      },
    ],
  },
  {
    name: '效率工具',
    icon: 'fas fa-rocket',
    items: [
      {
        name: 'Raycast',
        description: '高效Mac启动器',
        url: 'https://raycast.com',
        icon: '🚀',
        iconBg: '#ff6363',
      },
      {
        name: '1Password',
        description: '密码管理工具',
        url: 'https://1password.com',
        icon: '🔐',
        iconBg: '#0094f5',
      },
      {
        name: 'CleanShot',
        description: '强大的截图工具',
        url: 'https://cleanshot.com',
        icon: '📸',
        iconBg: '#6366f1',
      },
      {
        name: 'Arc Browser',
        description: '新一代浏览器',
        url: 'https://arc.net',
        icon: '🌐',
        iconBg: '#414efa',
      },
    ],
  },
]
