import React from 'react'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import router from './routers'

function App() {
  return (
    <div className="App">
      <React.Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </React.Suspense>
    </div>
  )
}

export default App
