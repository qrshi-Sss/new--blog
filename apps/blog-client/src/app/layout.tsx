import type { Metadata } from 'next'
import '@/styles/globals.css'
import { Geist } from 'next/font/google'
import { cn } from '@/utils'
import Header from '@/components/Header'

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: '4Zero4',
  description: 'blog',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={cn('font-sans', geist.variable, 'scrollbar-hide')}>
      <body className="pt-(--header-height)">
        <Header />
        <main className="h-[calc(100vh-var(--header-height))] w-full">{children}</main>
      </body>
    </html>
  )
}
