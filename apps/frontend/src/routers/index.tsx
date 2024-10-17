import { lazy } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'

import { Demo01Page } from '../pages/Demo01'

const Home = lazy(() => import('../pages/Home'))
const About = lazy(() => import('../pages/About'))

const router = createBrowserRouter(
  [
    // {
    //   path: '/',
    //   element: <Home />
    // },
    {
      element: <About />,
      path: '/about'
    },
    {
      element: <Demo01Page />,
      path: 'demo01'
    },
    {
      element: <Navigate to="/demo01" />,
      // 重定向
      path: '*'
    }
  ],
  { basename: window.__POWERED_BY_QIANKUN__ ? '/micro-app/3' : '/' }
)

export default router
