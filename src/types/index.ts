/*
 * @Description: 全局类型定义
 * @Author: Cik
 * @Date: 2026-02-27
 */

// 项目数据类型
export interface Project {
  id: string
  title: string
  description: string
  tech: string[]
  link: string
  image: string
  github?: string
  featured?: boolean
}

// 社交媒体类型
export interface Media {
  name: string
  icon?: string
  logo?: string  // 自定义logo图片路径，优先于icon显示
  url: string
  description?: string  // 描述文字
}

// 工具推荐类型
export interface Tool {
  name: string
  description: string
  url: string
  icon?: string
  logo?: string
  category?: string
}

// 博客文章类型
export interface Post {
  title: string
  link: string
  pubDate: string
  description: string
  author?: string
}
