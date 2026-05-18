// app/not-found.tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex h-[calc(100vh-var(--header-height))] items-center justify-center">
      <div className="space-y-6 text-center">
        <h1 className="text-9xl font-bold text-gray-900">404</h1>

        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-gray-700">页面未找到</h2>
          <p className="text-gray-500">抱歉，您访问的页面不存在或已被移除</p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
        >
          <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          返回首页
        </Link>
      </div>
    </div>
  )
}
