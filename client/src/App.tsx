import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

import { Community, Create, Explore, Home, NFT, Profile, Resources, Settings, Signup } from './pages'
import { Loader, Login, Navbar } from './components'
import { useAppContext, useSocketContext } from './contexts'

declare global {
  interface window {
      ethereum: any
      web3: any
  }
}

const App = () => {
  const { isClicked } = useAppContext()
  const { socket } = useSocketContext()

  socket.on('connect', () => console.log())
  
  return (
    <div className='bg-white'>
      <div className='static top-0 left-0 z-50'>
        <Navbar />
      </div>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/explore' element={<Explore />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/user/:id' element={<Profile />} />
          <Route path='/create' element={<Create />} />
          <Route path='/nft/:id' element={<NFT />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/community' element={<Community />} />
          <Route path='/resources' element={<Resources />} />
        </Routes>
      </Suspense>

      {isClicked.login && <Login />}
    </div>
  )
}

export default App