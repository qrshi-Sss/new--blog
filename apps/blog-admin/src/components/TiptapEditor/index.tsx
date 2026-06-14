import { useEffect, useState, useCallback } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import { Markdown } from 'tiptap-markdown'
import Toolbar from './Toolbar'
import './TiptapEditor.scss'

interface TiptapEditorProps {
  value?: string
  onChange?: (markdown: string) => void
  placeholder?: string
}

const TiptapEditor = ({ value, onChange, placeholder }: TiptapEditorProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false)

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen((prev) => !prev)
  }, [])

  // ESC to exit fullscreen
  useEffect(() => {
    if (!isFullscreen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsFullscreen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isFullscreen])

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: {
          HTMLAttributes: { class: 'code-block' },
        },
      }),
      Placeholder.configure({
        placeholder: placeholder || '请输入文档内容',
      }),
      Image.configure({
        HTMLAttributes: { class: 'editor-image' },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: 'editor-link' },
      }),
      Underline,
      Markdown.configure({
        html: false,
        transformPastedText: true,
        transformCopiedText: true,
      }),
    ],
    content: value || '',
    onUpdate: ({ editor }) => {
      const markdown = editor.storage.markdown.getMarkdown()
      onChange?.(markdown)
    },
  })

  // Sync external value changes (e.g. when editing a different doc)
  useEffect(() => {
    if (!editor) return
    const currentMarkdown = editor.storage.markdown.getMarkdown()
    if (value !== undefined && value !== currentMarkdown) {
      editor.commands.setContent(value)
    }
  }, [value, editor])

  return (
    <div className={`tiptap-editor-wrapper${isFullscreen ? ' tiptap-editor-fullscreen' : ''}`}>
      {editor && (
        <Toolbar
          editor={editor}
          isFullscreen={isFullscreen}
          onToggleFullscreen={toggleFullscreen}
        />
      )}
      <EditorContent editor={editor} className="tiptap-editor-content" />
    </div>
  )
}

export default TiptapEditor
