import React from 'react'

import { Card } from './'
import { NFT_LIST } from '../assets'
import image from '../assets/images/hero.jpg'

const Discover = () => {
  return (
    <div className={style.container}>
        <p className={style.title}>Discover</p>
        <div className={style.options}></div>
        <div className={style.wrapper}>
            {NFT_LIST.map((nft) => (
                <Card key={nft.id} {...nft} />
            ))}
        </div>
    </div>
  )
}

const style  = {
    container: `w-full flex flex-col bg-slate-400 px-6 py-3`,
    title: `text-2xl font-bold text-slate-900`,
    options: `w-full flex items-center my-4`,
    wrapper: `w-full flex flex-wrap justify-center md:justify-start gap-6 my-6`
}

export default Discover