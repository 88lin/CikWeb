/*
 * @Description: 路由配置
 * @Author: Cik
 * @Date: 2026-02-27
 */

import type { RouteRecordRaw } from 'vue-router'

// 导出路由配置（供 ViteSSG 使用）
export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/Home.vue'),
    meta: {
      description: '分享技术知识、数字生活与个人项目',
      keywords: 'Vue, TypeScript, Vite, 个人主页, SSG, Cik, CIKCC CODING',
    },
  },
  {
    path: '/blog',
    name: 'Blog',
    component: () => import('@/pages/Blog.vue'),
    meta: {
      description: '最新技术文章和思考',
      keywords: '博客, 技术文章, 开发',
    },
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/pages/About.vue'),
    meta: {
      description: '了解更多关于我的信息',
      keywords: '关于, 个人简介, 联系方式',
    },
  },

  {
    path: '/wechat',
    name: 'WeChat',
    component: () => import('@/pages/WeChat.vue'),
    meta: {
      description: '关注我的微信公众号获取更多内容',
      keywords: '微信, 公众号, 关注',
    },
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: () => import('@/pages/Privacy.vue'),
    meta: {
      description: '隐私政策和使用条款',
      keywords: '隐私政策, 使用条款',
    },
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/pages/NotFound.vue'),
    meta: {
      description: '抱歉，您访问的页面不存在',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  },
]
