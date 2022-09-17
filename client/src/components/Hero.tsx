import React, { ChangeEvent } from 'react'
import { Link } from 'react-router-dom'

import { useHttpRequest } from '../hooks'
import { Button, Input } from './'
import hero from '../assets/images/hero.jpg'

const Hero:React.FC = () => {
    const { error, fetcher, loading } = useHttpRequest()
    
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
                You can quicly mint NFTs and create your collection on Goerli for low fees.
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
                    <div className={style.circle3}>
                        <img src={`${hero}`} alt='' className={style.image} />
                    </div>
                </div>
            </div>
            <div className={style.desc}>
                <p>Minting...</p>

                <div className='flex items-center gap-8 mt-6'>
                    <div className='flex flex-col items-center'>
                        <p className='text-base'>Monkey Art #010</p>
                        <p className='text-xs'>@pablo_clueless</p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <p className='text-base'>4.5 ETH</p>
                        <p className='text-xs'>Gas free</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

const style = {
    wrapper: `w-full md:h-[800px] flex flex-col-reverse md:flex-row my-4`,
    container: `w-full md:w-2/5 h-full flex flex-col px-6`,
    container2: `w-full md:w-3/5 h-full flex flex-col items-center my-8`,
    title: `text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-primary to-blue-300 mb-8`,
    circle: `w-300 md:w-400 h-300 md:h-400 grid place-items-center bg-gradient-to-br from-primary to-blue-300 border border-primary rounded-full p-2`,
    circle2: `w-full h-full bg-white grid place-items-center border border-primary rounded-full`,
    circle3: `w-4/5 h-4/5 bg-white grid place-items-center border border-primary rounded-full relative`,
    image: `w-full h-full object-cover rounded-full`,
    desc: `flex flex-col items-center text-3xl font-semibold text-transparent gap-2 mt-4 bg-clip-text bg-gradient-to-tl from-blue-300 to-pink-600`
}

export default Hero