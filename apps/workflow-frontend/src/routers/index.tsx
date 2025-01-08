import { createHashRouter } from 'react-router-dom'

import { WorkflowPage } from '../pages/Workflow'

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
      element: <WorkflowPage />,
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
