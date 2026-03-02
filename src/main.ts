/*
 * @Description: 应用主入口文件
 * @Author: Cik
 * @Date: 2026-02-27
 */

import { ViteSSG } from 'vite-ssg'
import { createPinia } from 'pinia'
import App from './App.vue'
import { routes } from './router'

// 控制台品牌信息
const showBrandInfo = () => {
  const styles = [
    'color: #409EFF',
    'background: #f5f7fa',
    'font-size: 14px',
    'font-weight: bold',
    'padding: 10px 20px',
    'border-radius: 4px',
  ].join(';')

  console.log('%c CikWeb ', styles)
  console.log('基于 Vue 3 + TypeScript + Vite 构建')
  console.log('GitHub: https://github.com/cikheo/CikWeb')
  console.log('作者: Cik (https://cikcc.com)')
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
