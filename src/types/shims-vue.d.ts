/*
 * @Description: Vue 类型垫片
 * @Author: Cik
 * @Date: 2026-02-27
 */

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
