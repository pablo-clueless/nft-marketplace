import React, { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaGoogle, FaGithub } from 'react-icons/fa'

import { useAppContext } from '../contexts/AppContext'
import { useFormInputs } from '../hooks/form-hook'
import { Button, Input } from './'

const initial = {opacity: 0,scale: 0.5}
const animate = {opacity: 1,scale: 1}
const transition = {default: {duration: 0.5, ease: [0, 0.71, 0.2, 1.01]}}
const scale = {type: 'spring',stiffness: 100,dumping: 5,restDelta: 0.001}

const initialState = { username: '', password: ''}

const Login:React.FC = () => {
  const { handleUnclicked } = useAppContext()
  const { inputs, bind } = useFormInputs(initialState)
  const { username, password } = inputs

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if(!username || !password) return alert('Please fill all fields')
    console.log({username, password})
  }

  return (
    <div className={style.backdrop} onClick={() => handleUnclicked('login')}>
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
            <Button type='submit' label='Login' />
          </form>
          
          <div className='flex flex-col items-center gap-2 my-4'>
            <Button type='button' label='Signin with Google' icon={<FaGoogle/>} />
            <Button type='button' label='Signin with Github' icon={<FaGithub/>} />
          </div>
        </div>
        <div className='w-full h-1/2'></div>
      </motion.div> 
    </div>
  )
}

const style = {
  backdrop: `w-screen h-screen fixed top-0 left-0 bg-white bg-opacity-30 backdrop-blur-sm grid place-items-center`,
  wrapper: `w-11/12 md:w-600 flex flex-col-reverse sm:flex-row items-center bg-white rounded py-4 drop-shadow-2xl px-2`,
  formWrapper: `w-full flex flex-col items-center`,
  form: `w-4/5 sm:w-full flex flex-col`,
  link: `text-xs text-slate-600 my-3`
}

export default Login