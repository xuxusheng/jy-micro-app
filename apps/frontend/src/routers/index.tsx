import { createHashRouter } from 'react-router-dom'

import { NotFoundPage } from '../pages/404Page'
import { About } from '../pages/About'
import { Demo01Page } from '../pages/Demo01'
import Home from '../pages/Home'

const router = createHashRouter(
  [
    {
      element: <Home />,
      path: '/'
    },
    {
      element: <About />,
      path: '/about'
    },
    {
      element: <Demo01Page />,
      path: 'workflow'
    },
    {
      element: <NotFoundPage />,
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
