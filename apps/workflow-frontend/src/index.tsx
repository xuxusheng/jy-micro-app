import React from 'react'
import ReactDOM from 'react-dom/client'

import './public-path'
import './index.css'
import App from './App'

interface Props {
  container?: HTMLElement
}

let root: ReactDOM.Root
const render = (props: Props) => {
  const element = (props.container || document).querySelector(
    '#root'
  ) as HTMLElement

  root = ReactDOM.createRoot(element)
  root.render(<App />)
}

// 项目独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render({})
}

// 在 qiankun 中作为子应用运行时的钩子函数
export async function bootstrap() {
  console.log('[jy-micro-app] react app bootstraped')
}

export async function mount(props: Props) {
  console.log('[jy-micro-app] react app mount')
  render(props)
}

export async function unmount() {
  console.log('[jy-micro-app] react app unmount')
  root.unmount()
}
