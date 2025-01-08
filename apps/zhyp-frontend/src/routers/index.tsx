import { createHashRouter } from 'react-router-dom'
import { HomePage } from '../pages/Home'

const router = createHashRouter(
  [
    // {
    //   element: <Home />,
    //   path: '/'
    // },
    // {
    //   element: <About />,
    //   path: '/about'
    // },
    // {
    //   element: <WorkflowPage />,
    //   path: 'workflow'
    // },
    {
      element: <HomePage />,
      path: '*'
    }
    // {
    //   element: <Navigate to="/demo01" />,
    //   重定向
    // path: '*'
    // }
  ],
  {
    // basename: '/shaoshan/whjyczlcqd'
  }
  // { basename: window.__POWERED_BY_QIANKUN__ ? '/micro-app/3' : '/' }
)

export default router
