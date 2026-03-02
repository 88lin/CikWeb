/*
 * @Description: 应用主入口文件
 * @Author: Cik
 * @Date: 2026-02-27
 */

import { ViteSSG } from 'vite-ssg'
import { createPinia } from 'pinia'
import App from './App.vue'
import { routes } from './router'

// 控制台欢迎语美化
const showBrandInfo = () => {
  // ASCII Art Logo
  const logo = `
   ██████╗██╗██╗  ██╗██╗    ██╗███████╗██████╗ 
  ██╔════╝██║██║ ██╔╝██║    ██║██╔════╝██╔══██╗
  ██║     ██║█████╔╝ ██║ █╗ ██║█████╗  ██████╔╝
  ██║     ██║██╔═██╗ ██║███╗██║██╔══╝  ██╔══██╗
  ╚██████╗██║██║  ██╗╚███╔███╔╝███████╗██████╔╝
   ╚═════╝╚═╝╚═╝  ╚═╝ ╚══╝╚══╝ ╚══════╝╚═════╝ 
  `
  
  // 渐变样式
  const gradientStyle = [
    'background: linear-gradient(135deg, #8B5CF6 0%, #EC4899 50%, #F59E0B 100%)',
    'color: white',
    'font-size: 14px',
    'font-weight: bold',
    'padding: 12px 24px',
    'border-radius: 8px',
    'text-shadow: 0 1px 2px rgba(0,0,0,0.2)',
  ].join(';')
  
  // 输出 Logo
  console.log('%c' + logo, 'color: #8B5CF6; font-family: monospace;')
  
  // 输出标题
  console.log('%c 🚀 CikWeb v3.6.1 ', gradientStyle)
}

// Vite SSG 配置
export const createApp = ViteSSG(
  App,
  { routes },
  ({ app, router, isClient }) => {
    const pinia = createPinia()
    app.use(pinia)

    // 仅在客户端加载样式和显示品牌信息
    if (isClient) {
      // 动态导入样式文件（避免 SSR 问题）
      import('element-plus/theme-chalk/index.css')
      import('@fortawesome/fontawesome-free/css/all.css')
      
      showBrandInfo()
    }

    // 路由钩子 - 更新页面标题和滚动
    router.beforeEach((to, _from, next) => {
      if (isClient) {
        // 更新页面标题
        const title = to.meta.title as string
        if (title) {
          document.title = title
        }
        // 滚动到顶部
        window.scrollTo(0, 0)
      }
      next()
    })
  }
)
