import { createBrowserRouter } from 'react-router-dom'

import { About } from '../pages/About'
import { Demo01Page } from '../pages/Demo01'
import Home from '../pages/Home'

const router = createBrowserRouter(
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
    }
    // {
    //   element: <Navigate to="/demo01" />,
    //   重定向
    // path: '*'
    // }
  ],
  {
    basename: '/shaoshan/whjyczlcqd'
  }
  // { basename: window.__POWERED_BY_QIANKUN__ ? '/micro-app/3' : '/' }
)

export default router
