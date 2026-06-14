import { useState, useImperativeHandle, forwardRef, useRef, useEffect } from 'react'
import { Modal, Form, Input, Select, message } from 'antd'
import TiptapEditor from '@/components/TiptapEditor'
import { createDoc, updateDoc } from '@/api/module/content'
import type { DocItem, CategoryItem } from '@/api/module/content/type'
import { PublishedStatus } from '@/enums/content'

const { TextArea } = Input

export interface DocModalRef {
  show: (doc?: DocItem) => void
  close: () => void
}

interface DocModalProps {
  categories: CategoryItem[]
  defaultCategoryId?: number
  onSuccess?: () => void
}

const DocModal = forwardRef<DocModalRef, DocModalProps>(
  ({ categories, defaultCategoryId, onSuccess }, ref) => {
    const [open, setOpen] = useState(false)
    const [editingDoc, setEditingDoc] = useState<DocItem | null>(null)
    const [mdContent, setMdContent] = useState('')
    const [confirmLoading, setConfirmLoading] = useState(false)
    const [form] = Form.useForm()
    const submitLockRef = useRef(false)

    useImperativeHandle(ref, () => ({
      show: (doc?: DocItem) => {
        if (doc) {
          setEditingDoc(doc)
          form.setFieldsValue({
            title: doc.title,
            summary: doc.summary || '',
            categoryId: doc.categoryId,
            status: doc.status,
          })
          setMdContent(doc.content)
        } else {
          setEditingDoc(null)
          form.resetFields()
          form.setFieldsValue({ categoryId: defaultCategoryId, status: PublishedStatus.Published })
          setMdContent('')
        }
        setOpen(true)
      },
      close: () => {
        setOpen(false)
        setEditingDoc(null)
        form.resetFields()
        setMdContent('')
      },
    }))

    useEffect(() => {
      if (open) {
        form.setFieldsValue({ content: mdContent })
      }
    }, [mdContent, open, form])

    const handleOk = async () => {
      if (submitLockRef.current) return
      try {
        const values = await form.validateFields()
        if (!mdContent.trim()) {
          message.error('请输入文档内容')
          return
        }
        submitLockRef.current = true
        setConfirmLoading(true)
        const payload = { ...values, content: mdContent }
        if (editingDoc) {
          await updateDoc(editingDoc.id, payload)
          message.success('文档已更新')
        } else {
          await createDoc(payload)
          message.success('文档已创建')
        }
        setOpen(false)
        setEditingDoc(null)
        form.resetFields()
        setMdContent('')
        onSuccess?.()
      } catch (error: any) {
        if (error?.errorFields) return
        message.error(error?.message || '操作失败')
      } finally {
        submitLockRef.current = false
        setConfirmLoading(false)
      }
    }

    const handleCancel = () => {
      setOpen(false)
      setEditingDoc(null)
      form.resetFields()
      setMdContent('')
    }

    return (
      <Modal
        title={editingDoc ? '编辑文档' : '新增文档'}
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={confirmLoading}
        okText="保存"
        cancelText="取消"
        width={900}
        destroyOnClose
      >
        <Form form={form} layout="horizontal" labelCol={{ span: 2 }} preserve={false}>
          <Form.Item
            name="title"
            label="标题"
            rules={[{ required: true, message: '请输入文档标题' }]}
          >
            <Input placeholder="请输入文档标题" maxLength={100} />
          </Form.Item>
          <Form.Item
            name="categoryId"
            label="分类"
            rules={[{ required: true, message: '请选择分类' }]}
          >
            <Select placeholder="请选择分类">
              {categories.map((cat) => (
                <Select.Option key={cat.id} value={cat.id}>
                  {cat.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="summary" label="摘要">
            <TextArea placeholder="请输入文档摘要" rows={2} maxLength={300} />
          </Form.Item>
          <Form.Item
            label="内容"
            required
            rules={[
              {
                validator: () =>
                  mdContent.trim()
                    ? Promise.resolve()
                    : Promise.reject(new Error('请输入文档内容')),
              },
            ]}
          >
            <TiptapEditor
              value={mdContent}
              onChange={setMdContent}
              placeholder="请输入文档内容"
            />
          </Form.Item>
          <Form.Item name="status" label="状态" rules={[{ required: true, message: '请选择状态' }]}>
            <Select placeholder="请选择状态">
              <Select.Option value={PublishedStatus.Draft}>草稿</Select.Option>
              <Select.Option value={PublishedStatus.Published}>已发布</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    )
  },
)

DocModal.displayName = 'DocModal'

export default DocModal
