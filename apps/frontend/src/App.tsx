import { ConfigProvider, Modal } from 'antd'

import './App.css'

import zhCN from 'antd/locale/zh_CN'
import React, { useState } from 'react'
import { RouterProvider } from 'react-router-dom'

import router from './routers'

function App() {
  return (
    <div className="App">
      <ConfigProvider locale={zhCN}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <RouterProvider router={router} />
        </React.Suspense>
      </ConfigProvider>
    </div>
  )
}

export default App
