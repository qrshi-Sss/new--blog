'use client'

import React, { useEffect, useState } from 'react'

interface Heading {
  level: number
  text: string
  id: string
  children?: Heading[]
}

interface TocNavigationProps {
  headings: Heading[]
  className?: string
}

export function TocNavigation({ headings, className }: TocNavigationProps) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const handleHashChange = () => {
      const hash = decodeURIComponent(window.location.hash.slice(1))
      if (hash) {
        const element = document.getElementById(hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
          setActiveId(hash)
        }
      }
    }

    if (window.location.hash) {
      setTimeout(handleHashChange, 500)
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useEffect(() => {
    const handleLoad = () => {
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname + window.location.search)
        setActiveId('')
      }
    }

    handleLoad()

    window.addEventListener('load', handleLoad)
    return () => window.removeEventListener('load', handleLoad)
  }, [])

  const scrollToHeading = (id: string) => {
    window.history.pushState(null, '', `#${encodeURIComponent(id)}`)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActiveId(id)
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-80px 0px -80% 0px',
        threshold: 0,
      },
    )

    const observeHeadings = () => {
      const flatHeadings: string[] = []
      const getIds = (items: Heading[]) => {
        items.forEach((item) => {
          flatHeadings.push(item.id)
          if (item.children) getIds(item.children)
        })
      }
      getIds(headings)

      flatHeadings.forEach((id) => {
        const element = document.getElementById(id)
        if (element) observer.observe(element)
      })
    }

    observeHeadings()
    return () => observer.disconnect()
  }, [headings])

  const renderHeading = (heading: Heading, isChild = false, parentIndex?: number) => {
    const hasChildren = heading.children && heading.children.length > 0
    const headingId = heading.id || heading.text.toLowerCase().replace(/\s+/g, '-')
    const uniqueKey = parentIndex !== undefined ? `${parentIndex}-${headingId}` : headingId
    const isActive = activeId === headingId

    return (
      <div key={uniqueKey} className={isChild ? 'ml-3' : ''}>
        <button
          onClick={() => scrollToHeading(headingId)}
          className={`block w-full cursor-pointer rounded-md px-2 py-1.5 text-left text-sm transition-colors ${
            isActive
              ? 'bg-primary/10 font-bold text-primary'
              : isChild
                ? 'text-foreground/70 hover:bg-muted/50 hover:text-primary'
                : 'text-foreground/80 hover:bg-muted/50 hover:text-primary'
          }`}
          style={{ paddingLeft: `${(heading.level - 1) * 8 + 8}px` }}
        >
          {heading.text}
        </button>

        {hasChildren && (
          <div className="mt-1">
            {heading.children!.map((child, index) => renderHeading(child, true, index))}
          </div>
        )}
      </div>
    )
  }

  if (headings.length === 0) {
    return (
      <div
        className={`rounded-2xl border border-border bg-card p-6 lg:border-0 lg:bg-transparent lg:p-0 ${className || ''}`}
      >
        <h3 className="mb-4 text-lg font-semibold text-foreground lg:hidden">目录</h3>
        <p className="text-sm text-muted-foreground">暂无目录</p>
      </div>
    )
  }

  return (
    <div
      className={`rounded-2xl border border-border bg-card p-6 lg:border-0 lg:bg-transparent lg:p-0 ${className || ''}`}
    >
      <h3 className="mb-4 text-lg font-semibold text-foreground lg:hidden">目录</h3>
      <nav className="space-y-1 lg:[&_button]:rounded-none lg:[&_button]:bg-transparent lg:[&_button]:px-0 lg:[&_button]:py-1 lg:[&_button:hover]:bg-transparent">
        {headings.map((heading) => renderHeading(heading))}
      </nav>
    </div>
  )
}

export default TocNavigation
