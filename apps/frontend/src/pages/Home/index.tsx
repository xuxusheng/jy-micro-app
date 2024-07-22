import React from 'react'
import Flow from '../../components/Flow'

const Home = () => {
  return (
    <div
      style={{
        width: '100vw',
        height: window.__POWERED_BY_QIANKUN__ ? 'calc(100vh - 56px)' : '100vh'
      }}
    >
      <Flow />
    </div>
  )
}

export default Home
