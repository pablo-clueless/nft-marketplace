import React, { FormEvent, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaGoogle, FaGithub } from 'react-icons/fa'
import Cookies from 'universal-cookie'
import { FiX } from 'react-icons/fi'
import { toast } from 'react-toastify'

import { useAppContext } from '../contexts/AppContext'
import { useAppDispatch, useFormInputs, useHttpRequest } from '../hooks'
import { login } from '../store/slices/user'
import { Button, IconButton, Input } from './'
import { art1 } from '../assets'

const initial = {opacity: 0,scale: 0.5}
const animate = {opacity: 1,scale: 1}
const transition = {default: {duration: 0.5, ease: [0, 0.71, 0.2, 1.01]}}
const scale = {type: 'spring',stiffness: 100,dumping: 5,restDelta: 0.001}

const initialState = { username: '', password: ''}
const url = import.meta.env.VITE_URL

const Login:React.FC = () => {
  const { handleUnclicked } = useAppContext()
  const { inputs, bind } = useFormInputs(initialState)
  const { username, password } = inputs
  const dispatch = useAppDispatch()
  const cookies = new Cookies()
  const { clearErr, error, fetcher, loading} = useHttpRequest()

  const handleSubmit = async(e: FormEvent): Promise<any> => {
    e.preventDefault()
    if(!username || !password) return toast.error('Please fill all fields')
    const payload = { username, password }
    const headers = { 'Content-Type': 'application/json' }
    try {
      const data = await fetcher(`${url}/user/signin`, 'POST', JSON.stringify(payload), headers)
      if(!data || data === undefined) return
      const { token, user } = data
      dispatch(login(user))
      handleUnclicked('login')
      cookies.set('auth-token', token)
    } catch (error) {}
  }

  useEffect(() => {
    if(error) toast.error(`${error}`)
  },[error])

  return (
    <div className={style.backdrop} onClick={() => loading ? null : handleUnclicked('login')}>
      <motion.div initial={initial} whileInView={animate} transition={{default: transition, scale: scale}}
      className={style.wrapper} onClick={(e) => e.stopPropagation()}>
        <div className={style.formWrapper}>
          <p className='text-xl'>Welcome Back</p>

          <form onSubmit={handleSubmit} className={style.form}>
            <Input label='Username' type='text' name='username' {...bind} placeholder='@username' />
            <Input label='Password' type='password' name='password' {...bind} placeholder='******' />
            <p className={style.link}>Forgot your password?
              <Link to='/forgot-password' className='text-primary underline ml-1'>Reset it here.</Link>
            </p>
            <Button type='submit' label='Login' disabled={loading} />
          </form>
          
          <div className='flex flex-col items-center gap-2 my-4'>
            <Button type='button' label='Signin with Google' icon={<FaGoogle/>} />
            <Button type='button' label='Signin with Github' icon={<FaGithub/>} />
          </div>
        </div>
        <div className='w-full h-450 relative'>
          <img src={`${art1}`} alt='' className={style.image}  />
          <div className='absolute top-1 left-1 block md:hidden'>
            <IconButton icon={<FiX />} onClick={() => loading ? null : handleUnclicked('login')} />
          </div>
        </div>
      </motion.div> 
    </div>
  )
}

const style = {
  backdrop: `w-screen h-screen fixed top-0 left-0 bg-half-transparent backdrop-blur-sm grid place-items-center`,
  wrapper: `w-11/12 md:w-600 flex flex-col-reverse sm:flex-row items-center bg-white rounded drop-shadow-2xl`,
  formWrapper: `w-full flex flex-col items-center px-2`,
  form: `w-4/5 sm:w-full flex flex-col`,
  image: `w-full h-full object-cover rounded-r`,
  link: `text-xs text-slate-600 my-3`,
}

export default Login