import React, { FormEvent } from 'react'
import axios from 'axios'

import { Button, Input } from '../components'
import { useFormInputs } from '../hooks/form-hook'
import { useAppContext } from '../contexts/AppContext'
import { PASSWORD_REGEX } from '../libs'
import { art1 } from '../assets'

const initialState = {username: '', password: ''}

const Signup = () => {
  const { walletAddress, setWalletAddress } = useAppContext()
  const { inputs, bind } = useFormInputs(initialState)
  const { username, password } = inputs

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

    if(!walletAddress) return alert('Please connect your MetaMask account')
    if(!username || !password) return alert('Please fill all fields')
    if(!PASSWORD_REGEX.test(password)) return alert('Please use a strong password')

    const payload = { username, walletAddress, password }
  }

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <p className={style.title}>Welcome</p>

        <button onClick={connectWallet} className={style.metamaskButton}>
          {!walletAddress ? 'Connect Wallet' : 'Wallet Connected'}
        </button>

        <form onSubmit={handleSubmit} className={style.form}>
          <Input label='Username' type='text' name='username' {...bind} placeholder='@username' />
          <Input label='Password' type='password' name='password' {...bind} placeholder='*********' />
          <Button type='submit' label='Signup' />
        </form>
      </div>
    </div>
  )
}

const style = {
  container: `w-screen grid place-items-center px-6`,
  wrapper: `w-full flex flex-col items-center`,
  title: `text-3xl font-bold text-primary text-center mb-6`,
  form: `w-full sm:w-500 flex flex-col items-center gap-6`,
  metamaskButton: `bg-black px-4 py-2 text-lg text-white mt-6 mb-12
  `,
}

export default Signup