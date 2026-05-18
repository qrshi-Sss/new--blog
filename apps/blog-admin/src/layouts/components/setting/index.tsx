import { useState, useImperativeHandle, forwardRef } from 'react'
import { Drawer, Form, Input, Radio } from 'antd'

export interface SettingsDrawerRef {
  show: () => void
  close: () => void
}

export interface SettingsDrawerProps {}

const SettingsDrawer = forwardRef<SettingsDrawerRef, SettingsDrawerProps>(({}, ref) => {
  const [open, setOpen] = useState(false)

  useImperativeHandle(ref, () => ({
    show: () => {
      setOpen(true)
    },
    close: () => {
      setOpen(false)
    },
  }))

  return (
    <Drawer
      title="系统设置"
      closable={{ 'aria-label': 'Close Button' }}
      onClose={() => setOpen(false)}
      open={open}
    >
      <Form>
        <Form.Item label="布局方式" name="layout">
          <Radio.Group>
            <Radio value="vertical">垂直布局</Radio>
            <Radio value="horizontal">水平布局</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Drawer>
  )
})

export default SettingsDrawer
