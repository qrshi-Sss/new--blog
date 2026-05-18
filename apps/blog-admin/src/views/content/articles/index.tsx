import { useState, useEffect, useCallback, useRef } from 'react'
import { Table, Button, Space, Modal, Tag, message, Popconfirm, Card } from 'antd'
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  MenuOutlined,
  FolderOutlined,
  FileTextOutlined,
} from '@ant-design/icons'
import Sortable from 'sortablejs'
import type { ColumnsType } from 'antd/es/table'
import {
  getCategories,
  deleteCategory,
  updateCategorySort,
  getDocs,
  deleteDoc,
} from '@/api/module/content'
import type { CategoryItem, DocItem } from '@/api/module/content/type'
import DocModal from './components/DocModal'
import CategoryModal from './components/CategoryModal'
import type { DocModalRef } from './components/DocModal'
import type { CategoryModalRef } from './components/CategoryModal'
import { PublishedStatus } from '@/enums/content'
import './index.scss'

const { confirm } = Modal

const ArticlesPage: React.FC = () => {
  const [categories, setCategories] = useState<CategoryItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(null)
  const [docs, setDocs] = useState<DocItem[]>([])
  const [docLoading, setDocLoading] = useState(false)

  const docModalRef = useRef<DocModalRef>(null)
  const categoryModalRef = useRef<CategoryModalRef>(null)

  const sortableRef = useRef<Sortable | null>(null)
  const categoryListRef = useRef<HTMLDivElement>(null)

  const fetchCategories = useCallback(async () => {
    try {
      const data = await getCategories()
      setCategories(data)
      if (data.length > 0 && !selectedCategory) {
        setSelectedCategory(data[0])
      }
    } catch {
      message.error('获取分类列表失败')
    }
  }, [selectedCategory])

  const fetchDocs = useCallback(async (categoryId: number) => {
    setDocLoading(true)
    try {
      const data = await getDocs(categoryId)
      setDocs(data)
    } finally {
      setDocLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  useEffect(() => {
    if (selectedCategory) {
      fetchDocs(selectedCategory.id)
    }
  }, [selectedCategory, fetchDocs])

  useEffect(() => {
    if (!categoryListRef.current) return

    sortableRef.current = Sortable.create(categoryListRef.current, {
      handle: '.drag-handle',
      animation: 200,
      ghostClass: 'bg-blue-50',
      onEnd: async (evt) => {
        const items = Array.from(evt.from.children).map((el, index) => ({
          id: Number(el.getAttribute('data-category-id')),
          sortOrder: index,
        }))

        try {
          await updateCategorySort(items)
          setCategories((prev) => {
            const updated = [...prev]
            const [moved] = updated.splice(evt.oldIndex!, 1)
            updated.splice(evt.newIndex!, 0, moved)
            return updated.map((item, index) => ({ ...item, sortOrder: index }))
          })
          message.success('排序已保存')
        } catch {
          message.error('排序保存失败')
          fetchCategories()
        }
      },
    })

    return () => {
      if (sortableRef.current) {
        sortableRef.current.destroy()
        sortableRef.current = null
      }
    }
  }, [fetchCategories])

  useEffect(() => {
    if (categoryListRef.current) {
      const items = categoryListRef.current.querySelectorAll('[data-category-id]')
      items.forEach((el, index) => {
        const categoryId = categories[index]?.id
        if (categoryId) {
          el.setAttribute('data-category-id', String(categoryId))
        }
      })
    }
  }, [categories])

  const handleAddCategory = () => {
    categoryModalRef.current?.show()
  }

  const handleEditCategory = (category: CategoryItem) => {
    categoryModalRef.current?.show(category)
  }

  const handleDeleteCategory = async (category: CategoryItem) => {
    confirm({
      title: '确认删除',
      content: `确定要删除分类"${category.name}"吗？该分类下的所有文档也将被删除。`,
      okText: '确认删除',
      okType: 'danger',
      cancelText: '取消',
      onOk: async () => {
        try {
          await deleteCategory(category.id)
          message.success('分类已删除')
          if (selectedCategory?.id === category.id) {
            setSelectedCategory(null)
          }
          fetchCategories()
        } catch {
          message.error('删除分类失败')
        }
      },
    })
  }

  const handleAddDoc = () => {
    docModalRef.current?.show()
  }

  const handleEditDoc = (doc: DocItem) => {
    docModalRef.current?.show(doc)
  }

  const handleDeleteDoc = async (doc: DocItem) => {
    confirm({
      title: '确认删除',
      content: `确定要删除文档"${doc.title}"吗？`,
      okText: '确认删除',
      okType: 'danger',
      cancelText: '取消',
      onOk: async () => {
        try {
          await deleteDoc(doc.id)
          message.success('文档已删除')
          if (selectedCategory) {
            fetchDocs(selectedCategory.id)
          }
          fetchCategories()
        } catch {
          message.error('删除文档失败')
        }
      },
    })
  }

  const docColumns: ColumnsType<DocItem> = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      ellipsis: true,
      render: (text: string) => (
        <Space>
          <FileTextOutlined />
          <span>{text}</span>
        </Space>
      ),
    },
    {
      title: '分类',
      dataIndex: ['category', 'name'],
      key: 'category',
      width: 120,
      render: (name: string) => <Tag color="blue">{name}</Tag>,
    },
    {
      title: '摘要',
      dataIndex: 'summary',
      key: 'summary',
      ellipsis: true,
      width: 200,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: PublishedStatus) =>
        status === PublishedStatus.Published ? (
          <Tag color="green">已发布</Tag>
        ) : (
          <Tag color="orange">草稿</Tag>
        ),
    },
    {
      title: '浏览量',
      dataIndex: 'views',
      key: 'views',
      width: 80,
      align: 'center',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 180,
      render: (text: string) => new Date(text).toLocaleString('zh-CN'),
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_: unknown, record: DocItem) => (
        <Space>
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEditDoc(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确认删除"
            description={`确定删除"${record.title}"？`}
            onConfirm={() => handleDeleteDoc(record)}
            okText="确认"
            cancelText="取消"
          >
            <Button type="link" size="small" danger icon={<DeleteOutlined />}>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <div className="articles-page">
      <Card
        title={
          <Space>
            <FolderOutlined />
            <span>分类</span>
          </Space>
        }
        extra={
          <Button type="primary" size="small" icon={<PlusOutlined />} onClick={handleAddCategory}>
            新增
          </Button>
        }
        className="articles-category-card"
      >
        <div className="category-list" ref={categoryListRef}>
          {categories.map((cat) => {
            const isSelected = selectedCategory?.id === cat.id
            return (
              <div
                key={cat.id}
                data-category-id={cat.id}
                className={`category-item${isSelected ? ' category-item--selected' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                <Space size={8}>
                  <MenuOutlined className="drag-handle category-drag-handle" />
                  <span className={`category-name${isSelected ? ' category-name--selected' : ''}`}>
                    {cat.name}
                  </span>
                </Space>
                <Space className="category-actions" size={4} onClick={(e) => e.stopPropagation()}>
                  <Button
                    type="text"
                    size="small"
                    icon={<EditOutlined />}
                    onClick={() => handleEditCategory(cat)}
                  />
                  <Button
                    type="text"
                    size="small"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleDeleteCategory(cat)}
                  />
                </Space>
              </div>
            )
          })}
          {categories.length === 0 && <div className="category-empty">暂无分类</div>}
        </div>
      </Card>

      <Card
        title={
          <Space>
            <FileTextOutlined />
            <span>{selectedCategory?.name || '文档列表'}</span>
          </Space>
        }
        extra={
          selectedCategory && (
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAddDoc}>
              新增文档
            </Button>
          )
        }
        className="articles-doc-card"
      >
        <Table
          columns={docColumns}
          dataSource={docs}
          rowKey="id"
          loading={docLoading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `共 ${total} 条`,
          }}
          locale={{ emptyText: '该分类下暂无文档' }}
        />
      </Card>

      <CategoryModal ref={categoryModalRef} onSuccess={fetchCategories} />
      <DocModal
        ref={docModalRef}
        categories={categories}
        defaultCategoryId={selectedCategory?.id}
        onSuccess={() => {
          if (selectedCategory) fetchDocs(selectedCategory.id)
          fetchCategories()
        }}
      />
    </div>
  )
}

export default ArticlesPage
