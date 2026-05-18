import { useState, useEffect } from 'react'
import { Form, Input, Button, message } from 'antd'
import { LockOutlined, PhoneOutlined, SafetyOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { startTransition } from 'react'
import { register, getCaptcha } from '@/api/module/system'
import './index.scss'

interface RegisterForm {
  phone: string
  password: string
  confirmPassword: string
  code: string
}

const Register: React.FC = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [captchaImg, setCaptchaImg] = useState('')
  const [captchaUuid, setCaptchaUuid] = useState('')

  const loadCaptcha = async () => {
    try {
      const { img, uuid } = await getCaptcha()
      setCaptchaImg(`data:image/svg+xml;base64,${btoa(img)}`)
      setCaptchaUuid(uuid)
    } catch {
      message.error('获取验证码失败')
    }
  }

  useEffect(() => {
    loadCaptcha()
  }, [])

  const handleRegister = async (values: RegisterForm) => {
    const { phone, password, code } = values
    setLoading(true)
    try {
      await register({ phone, password, code, uuid: captchaUuid })
      message.success('注册成功，请登录')
      startTransition(() => {
        navigate('/login')
      })
    } catch (error: any) {
      message.error(error?.message || '注册失败，请重试')
      loadCaptcha()
      form.setFieldValue('code', '')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="register-page">
      <div className="register-card">
        <h2 className="register-title">账号注册</h2>
        <Form form={form} onFinish={handleRegister} size="large">
          <Form.Item
            name="phone"
            rules={[
              { required: true, message: '请输入手机号' },
              { pattern: /^\d{11}$/, message: '请输入正确的手机号' },
            ]}
          >
            <Input prefix={<PhoneOutlined />} placeholder="输入手机号" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: '请输入密码' },
              { min: 6, message: '密码至少6位' },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="输入密码" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: '请确认密码' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('两次输入的密码不一致'))
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="确认密码" />
          </Form.Item>
          <Form.Item name="code" rules={[{ required: true, message: '请输入验证码' }]}>
            <div style={{ display: 'flex', gap: 8 }}>
              <Input prefix={<SafetyOutlined />} placeholder="输入验证码" style={{ flex: 1 }} />
              <img
                src={captchaImg}
                alt="验证码"
                onClick={loadCaptcha}
                style={{
                  width: 100,
                  height: 40,
                  borderRadius: 4,
                  cursor: 'pointer',
                  border: '1px solid #d9d9d9',
                }}
              />
            </div>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              注册
            </Button>
          </Form.Item>
        </Form>
        <div className="register-footer">
          <span onClick={() => startTransition(() => navigate('/login'))}>已有账号？去登录</span>
        </div>
      </div>
    </div>
  )
}

export default Register
