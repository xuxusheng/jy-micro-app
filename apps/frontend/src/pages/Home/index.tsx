import React from 'react'

const Home = () => {
  return (
    <div
      style={{
        height: window.__POWERED_BY_QIANKUN__ ? 'calc(100vh - 56px)' : '100vh',
        width: '100vw'
      }}
    ></div>
  )
}

export default Home
