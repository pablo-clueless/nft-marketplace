import React, { Suspense, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

import { Community, Create, Explore, Home, NFT, Profile, Resources, Settings, Signup } from './pages'
import { useAppContext } from './contexts'
import { Loader, Login, Navbar, NotificationsTab } from './components'
import { login } from './store/slices/user'
import { useAppDispatch } from './hooks'

declare global {
  interface window {
      ethereum: any
      web3: any
  }
}

const App = () => {
  const { isClicked } = useAppContext()
  const dispatch = useAppDispatch()

  useEffect(() => {
    let jsonItem = localStorage.getItem('user')
    if(!jsonItem) return
    let user = JSON.parse(jsonItem)
    dispatch(login(user))
  },[])
  
  return (
    <div className='bg-white'>
      <div className='static top-0 left-0 z-50'>
        <Navbar />
      </div>
      <ToastContainer position='top-center' autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
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
      {isClicked.notification && <NotificationsTab />}
    </div>
  )
}

export default App