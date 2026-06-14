import type { Editor } from '@tiptap/react'
import {
  BoldOutlined,
  ItalicOutlined,
  StrikethroughOutlined,
  UnderlineOutlined,
  OrderedListOutlined,
  UnorderedListOutlined,
  CodeOutlined,
  LinkOutlined,
  UndoOutlined,
  RedoOutlined,
  MinusOutlined,
  FileImageOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
} from '@ant-design/icons'
import { Tooltip, Button, Space, Divider, Input, Popover, message } from 'antd'
import { useState } from 'react'

interface ToolbarProps {
  editor: Editor
  isFullscreen: boolean
  onToggleFullscreen: () => void
}

const Toolbar = ({ editor, isFullscreen, onToggleFullscreen }: ToolbarProps) => {
  const [linkUrl, setLinkUrl] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [linkOpen, setLinkOpen] = useState(false)
  const [imageOpen, setImageOpen] = useState(false)

  const handleAddLink = () => {
    if (!linkUrl.trim()) {
      message.warning('请输入链接地址')
      return
    }
    editor
      .chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href: linkUrl.trim() })
      .run()
    setLinkUrl('')
    setLinkOpen(false)
  }

  const handleAddImage = () => {
    if (!imageUrl.trim()) {
      message.warning('请输入图片地址')
      return
    }
    editor.chain().focus().setImage({ src: imageUrl.trim() }).run()
    setImageUrl('')
    setImageOpen(false)
  }

  const ToolbarButton = ({
    tip,
    icon,
    active,
    disabled,
    onClick,
  }: {
    tip: string
    icon: React.ReactNode
    active?: boolean
    disabled?: boolean
    onClick: () => void
  }) => (
    <Tooltip title={tip}>
      <Button
        type={active ? 'primary' : 'text'}
        size="small"
        icon={icon}
        disabled={disabled}
        onClick={onClick}
      />
    </Tooltip>
  )

  return (
    <div className="tiptap-toolbar">
      <Space size={2} wrap>
        <ToolbarButton
          tip="加粗"
          icon={<BoldOutlined />}
          active={editor.isActive('bold')}
          onClick={() => editor.chain().focus().toggleBold().run()}
        />
        <ToolbarButton
          tip="斜体"
          icon={<ItalicOutlined />}
          active={editor.isActive('italic')}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        />
        <ToolbarButton
          tip="下划线"
          icon={<UnderlineOutlined />}
          active={editor.isActive('underline')}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        />
        <ToolbarButton
          tip="删除线"
          icon={<StrikethroughOutlined />}
          active={editor.isActive('strike')}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        />

        <Divider type="vertical" />

        <ToolbarButton
          tip="一级标题"
          icon={<span style={{ fontWeight: 700 }}>H1</span>}
          active={editor.isActive('heading', { level: 1 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        />
        <ToolbarButton
          tip="二级标题"
          icon={<span style={{ fontWeight: 700 }}>H2</span>}
          active={editor.isActive('heading', { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        />
        <ToolbarButton
          tip="三级标题"
          icon={<span style={{ fontWeight: 700 }}>H3</span>}
          active={editor.isActive('heading', { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        />

        <Divider type="vertical" />

        <ToolbarButton
          tip="无序列表"
          icon={<UnorderedListOutlined />}
          active={editor.isActive('bulletList')}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        />
        <ToolbarButton
          tip="有序列表"
          icon={<OrderedListOutlined />}
          active={editor.isActive('orderedList')}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        />

        <Divider type="vertical" />

        <ToolbarButton
          tip="引用"
          icon={<span style={{ fontStyle: 'italic', fontWeight: 700 }}>"</span>}
          active={editor.isActive('blockquote')}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        />
        <ToolbarButton
          tip="代码块"
          icon={<CodeOutlined />}
          active={editor.isActive('codeBlock')}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        />
        <ToolbarButton
          tip="分割线"
          icon={<MinusOutlined />}
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        />

        <Divider type="vertical" />

        <Popover
          content={
            <Space.Compact style={{ width: 280 }}>
              <Input
                placeholder="输入链接地址"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                onPressEnter={handleAddLink}
              />
              <Button type="primary" onClick={handleAddLink}>
                确定
              </Button>
            </Space.Compact>
          }
          trigger="click"
          open={linkOpen}
          onOpenChange={(v) => {
            setLinkOpen(v)
            if (v) setLinkUrl(editor.getAttributes('link').href || '')
          }}
        >
          <Tooltip title="插入链接">
            <Button
              type={editor.isActive('link') ? 'primary' : 'text'}
              size="small"
              icon={<LinkOutlined />}
            />
          </Tooltip>
        </Popover>

        <Popover
          content={
            <Space.Compact style={{ width: 280 }}>
              <Input
                placeholder="输入图片地址"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                onPressEnter={handleAddImage}
              />
              <Button type="primary" onClick={handleAddImage}>
                确定
              </Button>
            </Space.Compact>
          }
          trigger="click"
          open={imageOpen}
          onOpenChange={(v) => {
            setImageOpen(v)
            if (v) setImageUrl('')
          }}
        >
          <Tooltip title="插入图片">
            <Button type="text" size="small" icon={<FileImageOutlined />} />
          </Tooltip>
        </Popover>

        <Divider type="vertical" />

        <ToolbarButton
          tip="撤销"
          icon={<UndoOutlined />}
          disabled={!editor.can().undo()}
          onClick={() => editor.chain().focus().undo().run()}
        />
        <ToolbarButton
          tip="重做"
          icon={<RedoOutlined />}
          disabled={!editor.can().redo()}
          onClick={() => editor.chain().focus().redo().run()}
        />

        <Divider type="vertical" />

        <ToolbarButton
          tip={isFullscreen ? '退出全屏' : '全屏编辑'}
          icon={isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
          onClick={onToggleFullscreen}
        />
      </Space>
    </div>
  )
}

export default Toolbar
