import { FC } from 'react'
import { useLocation } from 'react-router-dom'

export const NotFoundPage: FC = () => {
  // 获取当前路由
  const location = useLocation()

  return (
    <div>
      <p>404 Not Found</p>
      <p>{JSON.stringify(location)}</p>
    </div>
  )
}
