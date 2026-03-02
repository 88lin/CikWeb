/*
 * @Description: 主题数据配置
 * @Author: Cik
 * @Date: 2026-03-02
 */

import type { Theme } from '@/types'

// 导入图片资源
import cikLogo from '@/assets/img/Cik!cover.png'

export const themes: Theme[] = [
  {
    name: 'CikWeb',
    description: '静态业务个人主页主题',
    url: 'https://github.com/cikheo/CikWeb',
    logo: cikLogo,
    tag: '开源',
  },
]

export default themes
