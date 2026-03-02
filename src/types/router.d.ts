/*
 * @Description: 路由类型定义
 * @Author: Cik
 * @Date: 2026-02-27
 */

import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    description?: string
    keywords?: string
  }
}
