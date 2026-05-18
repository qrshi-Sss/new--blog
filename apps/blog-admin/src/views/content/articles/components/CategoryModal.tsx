import { useState, useImperativeHandle, forwardRef, useRef } from 'react'
import { Modal, Form, Input, message } from 'antd'
import { createCategory, updateCategory } from '@/api/module/content'
import type { CategoryItem } from '@/api/module/content/type'

export interface CategoryModalRef {
  show: (category?: CategoryItem | null) => void
  close: () => void
}

interface CategoryModalProps {
  onSuccess?: () => void
}

const CategoryModal = forwardRef<CategoryModalRef, CategoryModalProps>(({ onSuccess }, ref) => {
  const [open, setOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(null)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [form] = Form.useForm()
  const submitLockRef = useRef(false)

  useImperativeHandle(ref, () => ({
    show: (category?: CategoryItem | null) => {
      if (category) {
        setEditingCategory(category)
        form.setFieldsValue({
          name: category.name,
          description: category.description || '',
        })
      } else {
        setEditingCategory(null)
        form.resetFields()
      }
      setOpen(true)
    },
    close: () => {
      setOpen(false)
      setEditingCategory(null)
      form.resetFields()
    },
  }))

  const handleOk = async () => {
    if (submitLockRef.current) return
    try {
      const values = await form.validateFields()
      submitLockRef.current = true
      setConfirmLoading(true)
      const payload = { name: values.name, description: values.description }
      if (editingCategory) {
        await updateCategory(editingCategory.id, payload)
        message.success('分类已更新')
      } else {
        await createCategory(payload)
        message.success('分类已创建')
      }
      setOpen(false)
      setEditingCategory(null)
      form.resetFields()
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
    setEditingCategory(null)
    form.resetFields()
  }

  return (
    <Modal
      title={editingCategory ? '编辑分类' : '新增分类'}
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={confirmLoading}
      okText="保存"
      cancelText="取消"
      destroyOnClose
    >
      <Form form={form} layout="vertical" preserve={false}>
        <Form.Item
          name="name"
          label="分类名称"
          rules={[{ required: true, message: '请输入分类名称' }]}
        >
          <Input placeholder="请输入分类名称" maxLength={50} />
        </Form.Item>
        <Form.Item name="description" label="描述（可选）">
          <Input placeholder="请输入分类描述" maxLength={200} />
        </Form.Item>
      </Form>
    </Modal>
  )
})

CategoryModal.displayName = 'CategoryModal'

export default CategoryModal
