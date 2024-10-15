import React from 'react'

const Home = () => {
  return (
    <div
      style={{
        width: '100vw',
        height: window.__POWERED_BY_QIANKUN__ ? 'calc(100vh - 56px)' : '100vh'
      }}
    ></div>
  )
}

export default Home
