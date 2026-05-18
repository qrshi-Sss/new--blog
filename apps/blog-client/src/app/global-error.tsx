'use client' // 必须声明为客户端组件，因为它使用了 onClick 事件处理

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <h2>页面出错了！</h2>
        <p>{error.message || '发生未知错误，请稍后重试。'}</p>
        <button onClick={() => reset()}>重试</button>
      </body>
    </html>
  )
}
