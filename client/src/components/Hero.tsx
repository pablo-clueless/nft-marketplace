import React, { ChangeEvent, useState } from 'react'
import { Link } from 'react-router-dom'

import { useAppContext } from '../contexts/AppContext'
import { Button, Input } from './'
import hero from '../assets/images/hero.jpg'

const Hero:React.FC = () => {
    const { handleClicked } = useAppContext()

    const search = async(e: ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value
        console.log(query)
    }

  return (
    <div className={style.wrapper}>
        <div className={style.container}>
            <p className={style.title}>Create awesome NFTs on the Goerli testnet.</p>
            <p className='text-md'>
                ****** is the premiere marketplace for NFTs, which are digital assets your truly own.
            </p>
            <div className='my-8'>
                <Button type='button' label='Create NFT' onClick={() => handleClicked('add')} />
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
        </div>
    </div>
  )
}

const style = {
    wrapper: `w-full md:h-700 flex flex-col-reverse md:flex-row my-4`,
    container: `w-full md:w-2/5 h-full flex flex-col px-6`,
    container2: `w-full md:w-3/5 h-full flex flex-col items-center my-8`,
    title: `text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-primary to-blue-300 mb-8`,
    circle: `w-300 md:w-400 h-300 md:h-400 grid place-items-center bg-gradient-to-br from-primary to-blue-300 border border-primary rounded-full p-1`,
    circle2: `w-full h-full bg-white grid place-items-center border border-primary rounded-full`,
    image: `w-full h-full object-cover rounded-full`
}

export default Hero