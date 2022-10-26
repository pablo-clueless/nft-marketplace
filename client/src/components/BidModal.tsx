import React, { FormEvent, useEffect } from 'react'
import { toast } from 'react-toastify'

import { useFormInputs, useHttpRequest } from '../hooks'
import { useSocketContext } from '../contexts'
import { BidDetails } from '../interfaces'
import { Spinner } from '../assets'
import { Button, Input } from './'

const initialState = { bidAmount: 0 }
const url = import.meta.env.VITE_URL

const BidModal:React.FC<BidDetails> = ({nftId, name, amount, bidId, username, userId, action, onClose}) => {
    const { clearErr, error, fetcher, loading } = useHttpRequest()
    const { inputs, bind } = useFormInputs(initialState)
    const { bidAmount } = inputs
    const { socket } = useSocketContext()

    const handleBids = async(e: FormEvent): Promise<any> => {
        e.preventDefault()
        if(!userId) return toast.error('Please login to make a bid')
        if(!bidAmount || bidAmount <= amount) return toast.error('Bid price should be higher than starting price')
        const payload = { nftId, name, amount: bidAmount, bidId, id: userId, action }
        const headers = { 'Content-Type': 'application/json' }
        try {
            const res = await fetcher(`${url}/nft/bid`, 'PUT', JSON.stringify(payload), headers)
            if(!res) return
            const data = `${username} made a bid for ${name} at ${bidAmount} ETH`
            socket.emit('bid-made', data)
            onClose()
            toast.success('')
        } catch (error) {}
    }

    useEffect(() => {
        error && toast.error(`${error}`)
    },[error])

  return (
    <div className={style.backdrop} onClick={onClose}>
        <div className={style.container} onClick={(e) => e.stopPropagation()}>
            <p className={style.title}>Make bid for {name}</p>
            <form onSubmit={handleBids} className={style.form}>
                <Input label='Price' type='number' name='bidAmount' {...bind} min={amount} />
                <Button type='submit' label={loading ? <Spinner /> : 'Make Bid'}/>
            </form>
        </div>
    </div>
  )
}

const style  = {
    backdrop: `w-screen h-screen fixed top-0 left-0 bg-half-transparent backdrop-blur-sm grid place-items-center z-50`,
    container: `w-11/12 md:w-600 flex flex-col items-center bg-white rounded drop-shadow-2xl py-4 pop`,
    form: `flex flex-col items-center gap-3`,
    title: `text-2xl text`
}

export default BidModal