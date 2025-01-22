import { createHashRouter } from 'react-router-dom'
import { HomePage } from '../pages/Home'

const router = createHashRouter(
  [
    {
      element: <HomePage />,
      path: '*'
    }
  ],
  {
    // basename: '/shaoshan/whjyczlcqd'
  }
  // { basename: window.__POWERED_BY_QIANKUN__ ? '/micro-app/3' : '/' }
)

export default router
