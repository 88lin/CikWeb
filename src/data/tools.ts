/*
 * @Description: 工具推荐数据配置
 * @Author: Cik
 * @Date: 2026-02-27
 */

import type { Tool } from '@/types'

// 导入图片资源
import loginLogo from '@/assets/img/login.png'
import cikLogo from '@/assets/img/Cik!cover.png'

export const tools: Tool[] = [
  {
    name: 'Cik聚合',
    description: '聚合登录系统',
    url: 'https://login.cikcc.com',
    icon: 'cik-icon',
    category: '工具平台',
    logo: loginLogo,
  },
  {
    name: 'CikWeb',
    description: '静态业务个人主页主题',
    url: 'https://github.com/cikheo/CikWeb',
    icon: 'cikweb-icon',
    category: '主题模板',
    logo: cikLogo,
  },
  {
    name: 'CikCover',
    description: '专业的封面设计工具',
    url: 'https://cover.cikcc.com/',
    icon: 'vscode-icon',
    category: '开发工具',
    logo: '',
  },
]

export default tools
