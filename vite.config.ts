/*
 * @Description: Vite 构建配置文件
 * @Author: Cik
 * @Date: 2026-02-27
 */

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    vue(),
    // 自动导入 Vue 和组件库 API
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'],
      resolvers: [ElementPlusResolver()],
      dts: 'src/types/auto-imports.d.ts',
    }),
    // 自动导入组件
    Components({
      resolvers: [ElementPlusResolver()],
      dts: 'src/types/components.d.ts',
    }),
  ],
  server: {
    host: '0.0.0.0', // 允许通过 IP 地址访问
    port: 5173,
    open: true, // 自动打开浏览器
    cors: true, // 允许跨域
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/variables.scss" as *;`
      }
    }
  },
  // SSR 配置
  ssr: {
    // 在 SSR 中将这些包作为外部依赖，避免 CSS 导入问题
    noExternal: ['element-plus', '@fortawesome/fontawesome-free']
  },
  build: {
    rollupOptions: {
      output: {
        // 按类型分类静态资源
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.')
          let extType = info[info.length - 1]
          
          if (/\.(png|jpe?g|gif|svg|webp|ico)$/i.test(assetInfo.name)) {
            extType = 'img'
          } else if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name)) {
            extType = 'fonts'
          }
          
          return `assets/${extType}/[name]-[hash][extname]`
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        // 分包策略（SSG 模式下需排除 vue 核心模块）
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Element Plus 单独分包
            if (id.includes('element-plus')) {
              return 'element-plus'
            }
            // 图表库单独分包
            if (id.includes('chart.js') || id.includes('vue-chartjs')) {
              return 'charts'
            }
          }
        }
      }
    },
    // 优化选项
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  // SSG 配置
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    crittersOptions: {
      reduceInlineStyles: false
    },
    includedRoutes(paths) {
      // 返回需要预渲染的路由路径，排除 catch-all 路由
      return paths.filter(path => !path.includes(':pathMatch') && path !== '/404')
    },
    onBeforePageRender(route, indexHTML) {
      // 自定义 404 页面
      if (route === '/404') {
        return indexHTML.replace('<title>CikWeb</title>', '<title>404 - 页面未找到</title>')
      }
      return indexHTML
    }
  }
})
