import React, { useState } from 'react'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import router from './routers'
import { ConfigProvider, Modal } from 'antd'

import zhCN from 'antd/locale/zh_CN'

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
