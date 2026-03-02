/*
 * @Description: 终端欢迎语与构建信息美化输出
 * @Author: Cik
 * @Date: 2026-03-02
 */

import type { Plugin } from 'vite'

// ANSI 颜色代码
const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  
  // 前景色
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
  yellow: '\x1b[33m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  white: '\x1b[37m',
  gray: '\x1b[90m',
  
  // 背景色
  bgMagenta: '\x1b[45m',
  bgCyan: '\x1b[46m',
}

// ASCII Art Logo
const logo = `
${colors.magenta}${colors.bold}
   ██████╗██╗██╗  ██╗██╗    ██╗███████╗██████╗ 
  ██╔════╝██║██║ ██╔╝██║    ██║██╔════╝██╔══██╗
  ██║     ██║█████╔╝ ██║ █╗ ██║█████╗  ██████╔╝
  ██║     ██║██╔═██╗ ██║███╗██║██╔══╝  ██╔══██╗
  ╚██████╗██║██║  ██╗╚███╔███╔╝███████╗██████╔╝
   ╚═════╝╚═╝╚═╝  ╚═╝ ╚══╝╚══╝ ╚══════╝╚═════╝ 
${colors.reset}`

// 分隔线
const divider = `${colors.gray}${'─'.repeat(54)}${colors.reset}`

// 获取当前时间
const getTime = () => {
  const now = new Date()
  return now.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

// 打印欢迎信息
export const printWelcome = (mode: string) => {
  const version = process.env.npm_package_version || '3.6.1'
  const isDev = mode === 'development'
  
  console.log(logo)
  console.log(divider)
  console.log()
  console.log(`  ${colors.cyan}${colors.bold}🚀 CikWeb${colors.reset} ${colors.dim}v${version}${colors.reset}`)
  console.log(`  ${colors.gray}静态多业务个人主页主题${colors.reset}`)
  console.log()
  console.log(divider)
  console.log()
  console.log(`  ${colors.yellow}⚡${colors.reset} ${colors.bold}技术栈${colors.reset}`)
  console.log(`     ${colors.green}Vue 3${colors.reset} + ${colors.blue}TypeScript${colors.reset} + ${colors.magenta}Vite${colors.reset} + ${colors.cyan}Tailwind CSS${colors.reset}`)
  console.log()
  console.log(`  ${colors.yellow}📦${colors.reset} ${colors.bold}模式${colors.reset}`)
  console.log(`     ${isDev ? `${colors.green}开发模式 (Development)${colors.reset}` : `${colors.magenta}生产构建 (Production SSG)${colors.reset}`}`)
  console.log()
  console.log(`  ${colors.yellow}🕐${colors.reset} ${colors.bold}时间${colors.reset}`)
  console.log(`     ${colors.gray}${getTime()}${colors.reset}`)
  console.log()
  console.log(divider)
  console.log()
  console.log(`  ${colors.gray}GitHub: ${colors.cyan}https://github.com/cikheo/CikWeb${colors.reset}`)
  console.log(`  ${colors.gray}Gitee:  ${colors.cyan}https://gitee.com/cikcc/cikweb${colors.reset}`)
  console.log(`  ${colors.gray}Author: ${colors.cyan}Cik <cikheo@cikcc.com>${colors.reset}`)
  console.log()
  console.log(divider)
  console.log()
}

// 打印构建完成信息
export const printBuildComplete = () => {
  console.log()
  console.log(divider)
  console.log()
  console.log(`  ${colors.green}${colors.bold}✨ 构建完成！${colors.reset}`)
  console.log()
  console.log(`  ${colors.gray}输出目录: ${colors.cyan}dist/${colors.reset}`)
  console.log(`  ${colors.gray}预览命令: ${colors.yellow}pnpm preview${colors.reset}`)
  console.log()
  console.log(divider)
  console.log()
}

// Vite 插件
export const welcomePlugin = (): Plugin => {
  return {
    name: 'vite-plugin-welcome',
    
    // 构建开始时打印欢迎语
    buildStart() {
      printWelcome('production')
    },
    
    // 构建完成时打印信息
    closeBundle() {
      printBuildComplete()
    },
    
    // 开发服务器配置完成时打印
    configureServer(server) {
      server.httpServer?.once('listening', () => {
        // 清空控制台并打印欢迎语
        setTimeout(() => {
          console.clear()
          printWelcome('development')
          
          const address = server.httpServer?.address()
          const port = typeof address === 'object' ? address?.port : 5173
          
          console.log(`  ${colors.green}${colors.bold}🌐 开发服务器已启动${colors.reset}`)
          console.log()
          console.log(`  ${colors.gray}本地:   ${colors.cyan}http://localhost:${port}/${colors.reset}`)
          console.log(`  ${colors.gray}网络:   ${colors.cyan}http://0.0.0.0:${port}/${colors.reset}`)
          console.log()
          console.log(divider)
          console.log()
        }, 100)
      })
    }
  }
}

export default welcomePlugin
