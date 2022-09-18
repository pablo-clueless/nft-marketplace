import React, { FormEvent, useEffect } from 'react'
import { toast } from 'react-toastify'

import { Button, Input } from '../components'
import { useFormInputs, useHttpRequest } from '../hooks'
import { useAppContext } from '../contexts/AppContext'
import { PASSWORD_REGEX } from '../libs'
import { metamask, signup_bg } from '../assets'

const initialState = {username: '', password: ''}
const url = import.meta.env.VITE_URL

const Signup = () => {
  const { walletAddress, setWalletAddress } = useAppContext()
  const { inputs, bind } = useFormInputs(initialState)
  const { username, password } = inputs
  const { clearErr, error, fetcher, loading } = useHttpRequest()

  const connectWallet = async() => {
    try {
      if(window.ethereum) {
        const accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
        const account = accounts[0]
        setWalletAddress(account)
      } else return alert('Please install a MetaMask wallet to use this app')
    } catch (error: any) {
      alert(error?.message)
    }
  }

  const handleSubmit = async(e: FormEvent) => {
    e.preventDefault()

    if(!walletAddress) return toast.error('Please connect your MetaMask account')
    if(!username || !password) return toast.error('Please fill all fields')
    if(!PASSWORD_REGEX.test(password)) return toast.error('Please use a strong password')

    const payload = { username, walletAddress, password }
    const headers = { 'Content-Type': 'application/json' }

    try {
      const data = await fetcher(`${url}/user/signup`, 'POST', JSON.stringify(payload), headers)
      if(data) return toast.success(`${data?.message}`)
    } catch (error) {}
  }

  useEffect(() => {
    if(error) toast.error(`${error}`)
  },[error])

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <p className={style.title}>Signup</p>
        <p className='text-lg text-center'>Conect your MetaMask wallet & get ready to explore the amazing word of NFTs.</p>

        <button onClick={connectWallet} className={style.metamaskButton}>
          {!walletAddress ?
          <span className='flex items-center gap-2'>
            <img src={`${metamask}`} className='w-8' /> Connect Wallet
          </span>  :
          <span className='flex items-center gap-2'>
            <img src={`${metamask}`} className='w-8' /> Wallet Connected
          </span> }
        </button>

        <form onSubmit={handleSubmit} className={style.form}>
          <Input label='Username' type='text' name='username' {...bind} placeholder='@username' />
          <Input label='Password' type='password' name='password' {...bind} placeholder='*********' />
          <Button type='submit' label='Signup' disabled={loading} />
        </form>
      </div>
      <div className={style.wrapper2}>
        <div className={style.textWrapper}>
          <div className={style.imageWrapper}>
            <img src={`${signup_bg}`} alt='' className={style.image} />
          </div>
          <p>Create an account and get access to mint and sell digital assets</p>
        </div>
      </div>
    </div>
  )
}

const style = {
  container: `w-screen md:h-[819px] flex`,
  wrapper: `w-full h-full flex flex-col items-center justify-center px-4`,
  wrapper2: `w-full h-full hidden md:block`,
  title: `text-3xl font-bold text-primary text-center mb-6`,
  form: `w-full sm:w-500 flex flex-col items-center gap-6`,
  metamaskButton: `bg-black px-4 py-2 text-lg text-white mt-6 mb-12 jelly`,
  textWrapper: `w-full h-full bg-primary flex flex-col items-center justify-center gap-4 text-center px-4 text-3xl text-white`,
  imageWrapper: `w-300 h-300 rounded-full border-4 border-white`,
  image: `w-full h-full object-cover rounded-full`
}

export default Signup