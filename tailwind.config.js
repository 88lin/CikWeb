/*
 * @Description: Tailwind CSS 配置文件
 * @Author: Cik
 * @Date: 2026-02-27
 */

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#409eff',
        secondary: '#909399',
      },
    },
  },
  plugins: [],
  // DaisyUI 配置
  daisyui: {
    themes: [
      {
        light: {
          "primary": "#409eff",
          "secondary": "#909399",
          "accent": "#67c23a",
          "neutral": "#303133",
          "base-100": "#ffffff",
          "info": "#909399",
          "success": "#67c23a",
          "warning": "#e6a23c",
          "error": "#f56c6c",
        },
        dark: {
          "primary": "#409eff",
          "secondary": "#b0b0b0",
          "accent": "#67c23a",
          "neutral": "#e0e0e0",
          "base-100": "#1a1a1a",
          "base-200": "#2d2d2d",
          "base-300": "#404040",
          "info": "#b0b0b0",
          "success": "#67c23a",
          "warning": "#e6a23c",
          "error": "#f56c6c",
        },
      },
    ],
    darkTheme: "dark",
    base: true,
    styled: true,
    utils: true,
  },
}
