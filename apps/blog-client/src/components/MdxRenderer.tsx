'use client'

import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { cn } from '@/utils'

interface MdxRendererProps {
  content: string
  className?: string
}

function extractTextFromNode(node: React.ReactNode): string {
  if (typeof node === 'string') {
    return node
  }
  if (typeof node === 'number') {
    return node.toString()
  }
  if (Array.isArray(node)) {
    return node.map(extractTextFromNode).join('')
  }
  if (React.isValidElement(node)) {
    return extractTextFromNode((node.props as { children?: React.ReactNode }).children)
  }
  return ''
}

function generateHeadingId(text: React.ReactNode): string {
  const textString = extractTextFromNode(text)
  return textString
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\u4e00-\u9fa5a-zA-Z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function MdxRenderer({ content, className }: MdxRendererProps) {
  return (
    <div className={cn('prose prose-lg dark:prose-invert max-w-none', className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ node, children, ...props }) => {
            const id = generateHeadingId(children)
            return (
              <h1
                id={id}
                className="mt-8 mb-4 scroll-mt-20 border-b border-border pb-2 text-4xl font-bold text-foreground"
                {...props}
              >
                {children}
              </h1>
            )
          },
          h2: ({ node, children, ...props }) => {
            const id = generateHeadingId(children)
            return (
              <h2
                id={id}
                className="mt-8 mb-4 scroll-mt-20 border-b border-border pb-2 text-3xl font-semibold text-foreground"
                {...props}
              >
                {children}
              </h2>
            )
          },
          h3: ({ node, children, ...props }) => {
            const id = generateHeadingId(children)
            return (
              <h3
                id={id}
                className="mt-6 mb-3 scroll-mt-20 text-2xl font-semibold text-foreground"
                {...props}
              >
                {children}
              </h3>
            )
          },
          h4: ({ node, children, ...props }) => {
            const id = generateHeadingId(children)
            return (
              <h4
                id={id}
                className="mt-6 mb-3 scroll-mt-20 text-xl font-semibold text-foreground"
                {...props}
              >
                {children}
              </h4>
            )
          },
          h5: ({ node, children, ...props }) => {
            const id = generateHeadingId(children)
            return (
              <h5
                id={id}
                className="mt-6 mb-3 scroll-mt-20 text-lg font-semibold text-foreground"
                {...props}
              >
                {children}
              </h5>
            )
          },
          h6: ({ node, children, ...props }) => {
            const id = generateHeadingId(children)
            return (
              <h6
                id={id}
                className="mt-6 mb-3 scroll-mt-20 text-base font-semibold text-foreground"
                {...props}
              >
                {children}
              </h6>
            )
          },
          p: ({ node, ...props }) => (
            <p className="my-4 text-base leading-relaxed text-foreground/90" {...props} />
          ),
          ul: ({ node, ...props }) => <ul className="my-4 list-disc space-y-2 pl-6" {...props} />,
          ol: ({ node, ...props }) => (
            <ol className="my-4 list-decimal space-y-2 pl-6" {...props} />
          ),
          li: ({ node, ...props }) => <li className="text-base text-foreground/90" {...props} />,
          blockquote: ({ node, ...props }) => (
            <blockquote
              className="my-4 border-l-4 border-primary bg-primary/5 py-2 pl-4 text-foreground/80 italic"
              {...props}
            />
          ),
          pre: ({ children }) => <>{children}</>,
          code: ({ node, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '')
            const language = match ? match[1] : ''
            const isInline = !match && !className?.includes('language-')

            if (isInline) {
              return (
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground">
                  {children}
                </code>
              )
            }

            return (
              <div className="relative my-6">
                {language && (
                  <div className="absolute top-0 right-0 rounded-bl-lg bg-primary px-3 py-1 font-mono text-xs text-primary-foreground">
                    {language}
                  </div>
                )}
                <pre className="overflow-x-auto rounded-lg bg-gray-900 p-4 font-mono text-sm text-gray-100">
                  <code>{String(children).replace(/\n$/, '')}</code>
                </pre>
              </div>
            )
          },
          table: ({ node, ...props }) => (
            <div className="my-6 overflow-x-auto">
              <table className="min-w-full divide-y divide-border" {...props} />
            </div>
          ),
          thead: ({ node, ...props }) => <thead className="bg-muted" {...props} />,
          tbody: ({ node, ...props }) => <tbody className="divide-y divide-border" {...props} />,
          tr: ({ node, ...props }) => (
            <tr className="transition-colors hover:bg-muted/50" {...props} />
          ),
          th: ({ node, ...props }) => (
            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground" {...props} />
          ),
          td: ({ node, ...props }) => (
            <td className="px-4 py-3 text-sm text-foreground/90" {...props} />
          ),
          a: ({ node, href, ...props }) => {
            if (href?.startsWith('#')) {
              return (
                <a
                  href={href}
                  className="text-primary underline underline-offset-4 transition-colors hover:text-primary/80"
                  onClick={(e) => {
                    e.preventDefault()
                    const element = document.querySelector(href!)
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' })
                    }
                  }}
                  {...props}
                />
              )
            }

            return (
              <a
                href={href}
                className="text-primary underline underline-offset-4 transition-colors hover:text-primary/80"
                target="_blank"
                rel="noopener noreferrer"
                {...props}
              />
            )
          },
          hr: ({ node, ...props }) => <hr className="my-8 border-t border-border" {...props} />,
          img: ({ node, ...props }) => (
            <img className="my-4 h-auto max-w-full rounded-lg" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

export default MdxRenderer
