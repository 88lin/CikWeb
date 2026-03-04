/*
 * @Description: 主题数据配置
 * @Author: Cik
 * @Date: 2026-03-02
 */

import type { Theme } from '@/types'

// 导入图片资源
import cikLogo from '@/assets/img/Cik!cover.png'
import cikgen from '@/assets/img/cikgen.png'

export const themes: Theme[] = [
  {
    name: 'CikWeb',
    description: '静态业务个人主页主题',
    url: 'https://github.com/cikheo/CikWeb',
    logo: cikLogo,
    tag: '开源',
  },
  {
    name: 'CikGen',
    description: '随机密码生成器',
    url: 'https://github.com/cikheo/CikGen',
    logo: cikgen,
    tag: '开源',
  },
]

export default themes
