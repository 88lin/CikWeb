/*
 * @Description: 项目展示数据配置
 * @Author: Cik
 * @Date: 2026-02-27
 */

// 导入图片资源
import ciktabCover from '@/assets/img/ciktabCik-cover.webp'
import img0227 from '@/assets/img/0227-cik.webp'
import img0228 from '@/assets/img/0228-cik.webp'
import cikblogCover from '@/assets/img/cikblogCik-cover.webp'
import img0301 from '@/assets/img/0301-cik.webp'
import img03001 from '@/assets/img/03001-cik.webp'

export interface ProjectShowItem {
  id: string
  tag: string                    // 分类标签
  title: string                  // 项目标题
  description: string            // 项目描述
  primaryBtn: {                  // 主按钮
    text: string
    link: string
    enabled: boolean             // 是否启用
  }
  secondaryBtn: {                // 次要按钮
    text: string
    link: string
    enabled: boolean             // 是否启用
  }
  thirdBtn: {                    // 第三按钮
    text: string
    link: string
    enabled: boolean             // 是否启用
  }
  images: string[]               // 项目图片数组（3张图片堆叠展示）
  featured: boolean              // 是否展示
}

export const projectShowData: ProjectShowItem[] = [
  {
    id: 'ciktab',
    tag: '浏览器标签页',
    title: 'CIKTab新标签页',
    description: '一款简约美观、功能强大的浏览器起始主页，极致个性化的配置，满足您的各项要求，提高工作效率！',
    primaryBtn: {
      text: '立即访问',
      link: 'https://web.cikcc.com',
      enabled: true
    },
    secondaryBtn: {
      text: 'edge扩展',
      link: 'https://microsoftedge.microsoft.com/addons/detail/ciktab%E6%96%B0%E6%A0%87%E7%AD%BE%E9%A1%B5/kfnlnnhhochcdimnefhbgmakcfkeknak',
      enabled: true
    },
    thirdBtn: {
      text: 'Chrome扩展',
      link: 'https://chromewebstore.google.com/detail/ciktab%E6%96%B0%E6%A0%87%E7%AD%BE%E9%A1%B5/fmomgheplihlaegelkkiplkfmfpcfnlj',
      enabled: true
    },
    images: [
      ciktabCover,
      img0227,
      img0228,
    ],
    featured: true,
  },
  {
    id: 'cikweb-pro',
    tag: '博客',
    title: 'CikBlog',
    description: '一个基于 Go + Vue3 构建的现代化内容管理与分享平台',
    primaryBtn: {
      text: '访问',
      link: 'https://blog.cikcc.com',
      enabled: true
    },
    secondaryBtn: {
      text: '关于',
      link: 'https://github.com/cikheo/CikWeb',
      enabled: true
    },
    thirdBtn: {
      text: '查看文档',
      link: 'https://blog.cikcc.com/about',
      enabled: false
    },
    images: [
      cikblogCover,
      img0301,
      img03001,
    ],
    featured: true,
  },
  {
    id: 'cik-blog',
    tag: '技术博客',
    title: 'Cik技术博客',
    description: '分享前端开发、Vue生态、TypeScript实践等技术文章，记录学习与成长的点滴。',
    primaryBtn: {
      text: '访问博客',
      link: 'https://blog.cikcc.com',
      enabled: true
    },
    secondaryBtn: {
      text: 'RSS订阅',
      link: 'https://blog.cikcc.com/rss.xml',
      enabled: true
    },
    thirdBtn: {
      text: '文章归档',
      link: 'https://blog.cikcc.com/archives',
      enabled: false
    },
    images: [
      cikblogCover,
      img0301,
      img03001,
    ],
    featured: false,
  },
]

export default projectShowData
