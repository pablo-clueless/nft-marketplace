import React from 'react'
import { motion } from 'framer-motion'

import { Card } from './'
import { NFT_LIST } from '../assets'

const container = {hidden: {opacity: 0 },show: {opacity: 1,transition: {staggerChildren: 0.75}}}
const item = {hidden: {opacity: 0},show: {opacity: 1}}

const Discover = () => {
  return (
    <div className={style.container}>
        <p className={style.title}>Discover</p>
        <motion.ul variants={container} initial='hidden' whileInView='show' className={style.wrapper}>
            {NFT_LIST.map((nft) => (
              <motion.li  variants={item} key={nft._id}>
                <Card {...nft} />
              </motion.li>
            ))}
        </motion.ul>
    </div>
  )
}

const style  = {
    container: `w-full flex flex-col bg-slate-200 px-6 py-3`,
    title: `text-2xl font-bold text-slate-900`,
    wrapper: `w-full flex flex-wrap justify-center md:justify-start gap-6 my-6`,
}

export default Discover