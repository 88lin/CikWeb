/*
 * @Description: 赞助者数据配置
 * @Author: Cik
 * @Date: 2026-02-27
 */

import type { Sponsor } from '@/types'

// 导入图片资源
import wechatPayQr from '@/assets/img/wechat-pay.png'
import alipayPayQr from '@/assets/img/alipay-pay.webp'

// 页面配置
export const sponsorPageConfig = {
  // 页面标题
  title: '赞助支持',
  subtitle: '你的支持是我持续创作的动力',
  
  // 赞助方式
  methods: [
    {
      id: 'wechat',
      name: '微信赞赏',
      icon: 'fab fa-weixin',
      color: '#07c160',
      qrCode: wechatPayQr,
      description: '扫码支持'
    },
    {
      id: 'alipay',
      name: '支付宝',
      icon: 'fab fa-alipay',
      color: '#1677ff',
      qrCode: alipayPayQr,
      description: '扫码支持'
    }
  ],
  
  // 赞助权益
  benefits: [
    {
      icon: 'fas fa-heart',
      title: '支持期间博客关于界面展示打赏名单',
    },
    {
      icon: 'fas fa-star',
      title: '支持期间享受博客友情链接页面“正在发电”分类席位',
    },
    {
      icon: 'fas fa-gift',
      title: '支持期间享受主页页面“正在发电”分类席位',
    },
    {
      icon: 'fas fa-crown',
      title: '支持期间个人主页的赞助页面名单展示',
    }
  ],

}

// 赞助者列表
export const sponsors: Sponsor[] = [
  {
    name: '多像笑话',
    amount: 50,
    date: '2025-02-25',
  },
  {
    name: '柠檬',
    amount: 15,
    date: '2025-07-24',
  },
  {
    name: '微笑',
    amount: 2.5,
    date: '2025-12-23',
  },
]

export default sponsors
