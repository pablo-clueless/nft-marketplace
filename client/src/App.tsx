import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

import { Home, Signup } from './pages'
import { AddNFT, Loader, Login, Navbar } from './components'
import { useAppContext } from './contexts/AppContext'

declare global {
  interface window {
      ethereum: any
      web3: any
  }
}

const App = () => {
  const { isClicked } = useAppContext()
  
  return (
    <div className='bg-white'>
      <div className='static top-0 left-0 z-50'>
        <Navbar />
      </div>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </Suspense>

      {isClicked.add && <AddNFT />}
      {isClicked.login && <Login />}
    </div>
  )
}

export default App