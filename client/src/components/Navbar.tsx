import React from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineBell, HiOutlineShoppingBag, HiOutlineUser } from 'react-icons/hi'

import { useAppSelector } from '../hooks/redux-hook'
import { useAppContext } from '../contexts/AppContext'
import { Button, IconButton } from './'

const Navbar = () => {
  const { handleClicked } = useAppContext()
  const { user, isLoggedIn } = useAppSelector(store => store.user)
  const { notifications } = useAppSelector(store => store.notification)
  const id = user?._id

  return (
    <nav className='w-full flex items-center justify-between px-12 py-8'>
      <div></div>
      <div className='flex items-center gap-4'>
        {isLoggedIn && <IconButton icon={<HiOutlineBell />} badge count={notifications.length} />}
        {isLoggedIn && <Link to={`/explore`}><IconButton icon={<HiOutlineShoppingBag />} /></Link>}
        {isLoggedIn && <Link to={`/user/${id}`}><IconButton icon={<HiOutlineUser />} /></Link>}
        {!isLoggedIn && <Button type='button' label='Login' onClick={() => handleClicked('login')} variant='outlined' />}
        {!isLoggedIn && <Link to='/signup'><Button type='button' label='Signup' /></Link>}
      </div>
    </nav>
  )
}

export default Navbar