import { createBrowserRouter, Navigate } from 'react-router-dom'
import { lazy } from 'react'
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
      path: '/about',
      element: <About />
    },
    {
      path: 'demo01',
      element: <Demo01Page />
    },
    {
      // 重定向
      path: '*',
      element: <Navigate to="/demo01" />
    }
  ],
  { basename: window.__POWERED_BY_QIANKUN__ ? '/micro-app/3' : '/' }
)

export default router
