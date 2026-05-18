/** @type {import('next').NextConfig} */

console.log('=== 构建时环境变量检查 ===')
console.log('NEXT_PUBLIC_API_URL:', process.env.NEXT_PUBLIC_API_URL)
console.log('NEST_API_URL:', process.env.NEXT_PUBLIC_BASE_URL)
console.log('=============================')

export default {
  reactStrictMode: true,

  // Turbopack 原生配置（Next.js 16 新语法）
  turbopack: {
    rules: {
      // 匹配 assets/icons 下的 SVG 文件
      '*.svg': {
        condition: {
          all: [
            { not: 'foreign' }, // 排除 node_modules
            { path: /\/components\/icons\/.*\.svg$/ }, // 只匹配 icons 目录
          ],
        },
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },

  devIndicators: {
    // 关闭构建活动指示器
    buildActivity: false,
    // 关闭应用大小指示器
    appIsrStatus: false,
  },

  devIndicators: false, // 完全禁用所有开发指示器
}
