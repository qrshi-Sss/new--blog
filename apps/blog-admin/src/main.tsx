import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { Spin } from 'antd'
import App from './App.tsx'

import './styles/var.scss'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  // 生产用
  <React.Fragment>
    <Suspense
      fallback={
        <Spin
          size="large"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        />
      }
    >
      <App />
    </Suspense>
  </React.Fragment>,
  // 开发环境用 严格模式会对函数组件副作用运行两次
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
)
