import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { useAppContext } from '../contexts/AppContext'
import { Button } from './'

const Navbar = () => {
  const { handleClicked } = useAppContext()
  // const { isLoggedIn } = useSelector(store => store.user)

  return (
    <nav className='w-full flex items-center justify-between px-16 py-8'>
      <div></div>
      <div className='hidden md:flex items-center gap-4'>
        {NAVLINKS.map((link, index) => (
          <NavLink key={index} to={`/${link.link}`} className={({isActive}) => isActive ? activeStyle : inctiveStyle}>
            {link.title}
          </NavLink>
        ))}
      </div>
      <div className='flex items-center gap-4'>
        <Button type='button' label='Login' onClick={() => handleClicked('login')} variant='outlined' />
        <Link to='/signup'>
          <Button type='button' label='Signup' />
        </Link>
      </div>
    </nav>
  )
}

const activeStyle = `text-sm text-primary hover:text-slate-600 ease-in-out duration-500`
const inctiveStyle = `text-sm hover:text-primary text-slate-600 ease-in-out duration-500`

const NAVLINKS = [
  { title: 'WhitePaper', link: 'whitepaper' }, 
  { title: 'How it works', link: 'help' },
  { title: 'Mission', link: 'about' }
]

export default Navbar