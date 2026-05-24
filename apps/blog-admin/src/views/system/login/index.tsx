import { Form, Input, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { startTransition } from 'react'
import { login } from '@/api/module/system'
import type { LoginDataType } from '@/api/module/system/type'
import { useUserStore } from '@/store/user'
import './index.scss'

const Login: React.FC = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const setUserInfo = useUserStore((s) => s.setUserInfo)

  const handleLogin = async (values: LoginDataType) => {
    try {
      const { token, userInfo } = await login(values)
      sessionStorage.setItem('token', token)
      setUserInfo(userInfo)
      message.success('登录成功')
      startTransition(() => {
        navigate('/home')
      })
    } catch (error: any) {
      message.error(error?.message || '登录失败，请检查账号密码')
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="login-title">账号登录</h2>
        <Form
          form={form}
          onFinish={handleLogin}
          initialValues={{ phone: '16607227030', password: '123456qwer' }}
          size="large"
        >
          <Form.Item
            name="phone"
            rules={[
              { required: true, message: '请输入账号' },
              { pattern: /^\d{11}$/, message: '请输入正确的手机号' },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="输入账号" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="输入密码" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              登录
            </Button>
          </Form.Item>
        </Form>
        <div className="login-footer">
          <span onClick={() => startTransition(() => navigate('/register'))}>没有账号？去注册</span>
        </div>
      </div>
    </div>
  )
}

export default Login
