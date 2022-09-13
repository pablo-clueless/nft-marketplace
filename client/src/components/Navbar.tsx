import React from 'react'
import { Link } from 'react-router-dom'

import { useAppSelector } from '../hooks/redux-hook'
import { useAppContext } from '../contexts/AppContext'
import { Button } from './'

const Navbar = () => {
  const { handleClicked } = useAppContext()
  const { isLoggedIn } = useAppSelector(store => store.user)

  return (
    <nav className='w-full flex items-center justify-between px-12 py-8'>
      <div></div>
      <div className='flex items-center gap-4'>
        {!isLoggedIn && <Button type='button' label='Login' onClick={() => handleClicked('login')} variant='outlined' />}
        {!isLoggedIn && <Link to='/signup'><Button type='button' label='Signup' /></Link>}
      </div>
    </nav>
  )
}

export default Navbar