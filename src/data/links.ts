/*
 * @Description: 友情链接数据配置
 * @Author: Cik
 * @Date: 2026-02-27
 */

// 导入图片资源
import ltcyAvatar from '@/assets/img/ltcy.png'

// 友情链接页面配置
export const linksPageConfig = {
  title: '正在发电',
  subtitle: '正在赞助博主的朋友们',
  buttonText: '进一步了解',
  buttonLink: '/sponsor'
}

// 友情链接数据
export interface LinkItem {
  name: string
  url: string
  avatar: string
  description: string
  tag?: string  // 可选标签，如 "感谢 Cik"
}

export const links: LinkItem[] = [
  {
    name: '零图创意',
    url: 'https://desgin.cikcc.com',
    avatar: ltcyAvatar,
    description: '优质设计资源素材免费下载',
    tag: '感谢 Cik'
  },
]

export default links
