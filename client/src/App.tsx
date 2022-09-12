import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

import { Home, Signup } from './pages'
import { Loader, Login, Navbar } from './components'
import { useAppContext } from './contexts/AppContext'

const App = () => {
  const { isClicked } = useAppContext()
  
  return (
    <div className='bg-white'>
      <div>
        <Navbar />
      </div>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </Suspense>

      {isClicked.login && <Login />}
    </div>
  )
}

export default App