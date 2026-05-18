'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, BookOpen, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import type { DocListItemType } from '@/lib/api'

interface SidebarMobileProps {
  categoryId: string
  categoryName: string
  docslist: DocListItemType[]
  currentDocId: string
}

export default function SidebarMobile({
  categoryId,
  categoryName,
  docslist,
  currentDocId,
}: SidebarMobileProps) {
  const [open, setOpen] = useState(false)

  return (
    <Drawer open={open} onOpenChange={setOpen} direction="left">
      <DrawerTrigger asChild>
        <Button variant="ghost" className="lg:hidden">
          <Menu className="h-5 w-5" />
          <span>menu</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-full max-w-[280px]">
        <DrawerHeader className="border-b pb-4 text-left">
          <DrawerTitle className="flex items-center text-lg font-semibold">
            <BookOpen className="mr-2 h-5 w-5" />
            {categoryName}
          </DrawerTitle>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-1">
            {docslist.map((doc) => (
              <Link
                key={doc.id}
                href={`/docs/${categoryId}/${doc.id}`}
                onClick={() => setOpen(false)}
                className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                  currentDocId === doc.id
                    ? 'bg-primary font-medium text-primary-foreground'
                    : 'text-foreground/80 hover:bg-muted hover:text-foreground'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="truncate">{doc.title}</span>
                  {currentDocId === doc.id && <ChevronRight className="h-4 w-4 flex-shrink-0" />}
                </div>
              </Link>
            ))}
          </div>

          {docslist.length === 0 && (
            <div className="py-8 text-center">
              <BookOpen className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground">该分类下暂无文档</p>
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  )
}
