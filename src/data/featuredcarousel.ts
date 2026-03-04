/*
 * @Description: 精选项目轮播数据
 * @Author: Cik
 * @Date: 2026-02-27
 */

import type { Project } from '@/types'

// 导入图片资源
import cikblogCover from '@/assets/img/cikblogCik-cover.webp'
import ciktabCover from '@/assets/img/ciktabCik-cover.webp'
import ciknavCover from '@/assets/img/ciknav-cik-cover.webp'
import coverImg from '@/assets/img/cover.webp'

export const featuredProjects: Project[] = [
  {
    id: 'featured-1',
    title: 'CikBlog',
    description: '一个基于 Go + Vue3 构建的现代化内容管理与分享平台',
    tech: ['Vue 3', 'TypeScript', 'Element'],
    link: 'https://blog.cikcc.com',
    image: cikblogCover,
    featured: true,
  },
  {
    id: 'featured-2',
    title: 'CikTab新标签页',
    description: '一款简约美观、功能强大的浏览器起始主页',
    tech: ['PHP'],
    link: 'https://web.cikcc.com',
    image: ciktabCover,
    featured: true,
  },
  {
    id: 'featured-3',
    title: 'CIKNav',
    description: '专注优质网址,优质资源分享',
    tech: ['PHP', 'WordPress'],
    link: 'https://nav.cikcc.com',
    image: ciknavCover,
    featured: true,
  },
  {
    id: 'featured-4',
    title: '封面生成器（CikCover）',
    description: '提供丰富的模板和自定义选项，帮助用户快速生成专业封面，支持导出。',
    tech: ['Vue 3'],
    link: 'https://cover.cikcc.com',
    image: coverImg,
    featured: true,
  },
]

export default featuredProjects
