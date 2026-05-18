// 从markdown内容中提取标题
export function extractHeadings(content: string) {
  // 移除代码块和行内代码避免标题被错误识别
  const cleanContent = content
    // 移除多行代码块 (``` ... ```)
    .replace(/```[\s\S]*?```/g, '')
    // 移除行内代码 (`code`)
    .replace(/`[^`]+`/g, '')
    // 可选：移除 HTML 注释
    .replace(/<!--[\s\S]*?-->/g, '')

  const headingRegex = /^(#{1,6})\s+(.+)$/gm
  const headings: Array<{ level: number; text: string; id: string }> = []

  let match
  while ((match = headingRegex.exec(cleanContent)) !== null) {
    const level = match[1].length
    const text = match[2].trim()
    const id = generateId(text)
    headings.push({ level, text, id })
  }

  return headings
}

function generateId(text: string): string {
  return (
    text
      .toLowerCase()
      .replace(/\s+/g, '-')
      // 保留字母、数字、中文和横杠，移除其他特殊符号
      .replace(/[^\u4e00-\u9fa5a-zA-Z0-9-]/g, '')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '')
  )
}

// 生成文档的目录结构
export function generateTableOfContents(
  headings: Array<{ level: number; text: string; id: string }>,
) {
  const toc: Array<{ level: number; text: string; id: string; children?: any[] }> = []
  const stack: Array<{ level: number; text: string; id: string; children?: any[] }> = []

  for (const heading of headings) {
    const item = { ...heading, children: [] }

    // 清理堆栈中比当前级别高的项
    while (stack.length > 0 && stack[stack.length - 1].level >= heading.level) {
      stack.pop()
    }

    if (stack.length === 0) {
      // 顶级标题
      toc.push(item)
    } else {
      // 子标题
      const parent = stack[stack.length - 1]
      if (!parent.children) {
        parent.children = []
      }
      parent.children.push(item)
    }

    stack.push(item)
  }

  return toc
}

// 格式化日期
export function formatDate(dateString: string) {
  if (!dateString) return ''

  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return dateString
  }
}
