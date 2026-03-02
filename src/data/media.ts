/*
 * @Description: 社交媒体数据配置
 * @Author: Cik
 * @Date: 2026-02-27
 */

import type { Media } from '@/types'

// 导入图片资源
import githubLogo from '@/assets/img/github.svg'
import wechatLogo from '@/assets/img/wechat.svg'
import bilibiliLogo from '@/assets/img/Bilibili.svg'

export const mediaList: Media[] = [
  {
    name: 'GitHub',
    logo: githubLogo,
    url: 'https://github.com/cikheo',
    description: '开源项目与代码分享',
  },
  {
    name: '微信公众号',
    logo: wechatLogo,
    url: '/wechat',
    description: '技术文章与生活随笔',
  },
  {
    name: 'Bilibili',
    logo: bilibiliLogo,
    url: 'https://space.bilibili.com/1212627088',
    description: '视频教程与日常分享',
  },
]

export default mediaList