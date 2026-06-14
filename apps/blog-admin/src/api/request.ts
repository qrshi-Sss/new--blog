import axios from 'axios'
import { message, Modal } from 'antd'

const request = axios.create({
  baseURL: import.meta.env.VITE_API_SERVER_URL + import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
})

request.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

request.interceptors.response.use(
  (response) => {
    const res = response.data
    if (res.code && res.code == 200) {
      return res.data
    }
    if (res.code === 401) {
      sessionStorage.removeItem('token')
      Modal.confirm({
        title: '提示',
        content: res.message || '登录过期，请重新登录',
        icon: null,
        okText: '确认',
        cancelButtonProps: { style: { display: 'none' } },
        onOk: () => {
          window.location.href = '/login'
        },
      })
    }
    message.error(res.message || '未知异常')
    return Promise.reject(new Error(res.message || '未知异常'))
  },
  (error) => {
    message.error(error.message || '未知异常')
    return Promise.reject(error)
  },
)

export default request
