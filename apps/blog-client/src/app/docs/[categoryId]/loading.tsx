export default function DocsLoading() {
  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row lg:gap-8">
        {/* Sidebar skeleton */}
        <div className="sticky top-(--header-height) z-1 w-full shrink-0 self-start bg-white pt-4 pb-4 lg:h-[calc(100vh-var(--header-height))] lg:w-64 lg:overflow-y-auto lg:pt-4">
          <div className="space-y-3">
            <div className="h-6 w-32 animate-pulse rounded bg-gray-200" />
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-4 w-full animate-pulse rounded bg-gray-100" />
            ))}
          </div>
        </div>

        {/* Content skeleton */}
        <div className="min-w-0 flex-1 lg:pt-4 lg:pb-4">
          <div className="space-y-4">
            <div className="h-8 w-3/4 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-gray-100" />
            <div className="h-4 w-4/5 animate-pulse rounded bg-gray-100" />
            <div className="mt-6 h-48 w-full animate-pulse rounded bg-gray-100" />
            <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-gray-100" />
          </div>
        </div>
      </div>
    </div>
  )
}
