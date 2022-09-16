import React, { ChangeEvent, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useSocketContext } from '../contexts'
import { useHttpRequest } from '../hooks'
import { Button, Input } from './'
import hero from '../assets/images/hero.jpg'

const Hero:React.FC = () => {
    const { socket, notifications } = useSocketContext()
    const { error, fetcher, loading } = useHttpRequest()
    
    const search = async(e: ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value
        console.log(query)
    }
    
    const notifyTest = () => {
        socket.emit('message', 'Test message')
    }

  return (
    <div className={style.wrapper}>
        <div className={style.container}>
            <p className={style.title}>Create awesome NFTs on the Goerli testnet.</p>
            <p className='text-md'>
                ****** is the premiere marketplace for NFTs, which are digital assets your truly own.
            </p>
            <div className='my-8'>
                <Link to='/create'>
                    <Button type='button' label='Create NFT' />
                </Link>
            </div>
            <div className='my-4'>
                <Input type='text' name='search' onChange={search} placeholder='Search by collection, user or NFT' />
            </div>
        </div>
        <div className={style.container2}>
            <div className={style.circle}>
                <div className={style.circle2}>
                    <img src={`${hero}`} alt='' className={style.image} />
                </div>
            </div>
            <div className={style.desc}>
                <p>Name: #009</p>
                <p className='ml-20'>Price: 10ETH</p>
            </div>
                <Button type='button' label='Notify' onClick={notifyTest} />
        </div>
    </div>
  )
}

const style = {
    wrapper: `w-full md:h-[800px] flex flex-col-reverse md:flex-row my-4`,
    container: `w-full md:w-2/5 h-full flex flex-col px-6`,
    container2: `w-full md:w-3/5 h-full flex flex-col items-center my-8`,
    title: `text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-primary to-blue-300 mb-8`,
    circle: `w-300 md:w-400 h-300 md:h-400 grid place-items-center bg-gradient-to-br from-primary to-blue-300 border border-primary rounded-full p-1`,
    circle2: `w-full h-full bg-white grid place-items-center border border-primary rounded-full`,
    image: `w-full h-full object-cover rounded-full`,
    desc: `flex flex-col text-3xl font-semibold text-transparent gap-2 mt-4 bg-clip-text bg-gradient-to-tl from-blue-300 to-pink-600`
}

export default Hero