import React from 'react'
import { FiHeart } from 'react-icons/fi'

import { NFTCard } from '../interfaces'

const Card:React.FC<NFTCard> = ({_id, name, file, price, creator, likes}) => {
  return (
    <div className={style.container}>
      <div className={style.imageWrapper}>
        <img src={file} alt={name} className={style.image} />
      </div>
      <div className={style.wrapper}>
        <p className={style.name}>{name}</p>
        <p className='text-xs mb-2'><>By {creator}</></p>
        <div className='flex items-center justify-between'>
          <p className='text-sm'>{price}ETH</p>
          <button className={style.bidButton} onClick={() => alert(`Bid placed for item ${name} at ${price}eth`)}>
            Place Bid
          </button>
        </div>
      </div>
      <button className={style.button}>
        <FiHeart className='fill-red-600 text-red-600 text-lg' />
        {likes}
      </button>
    </div>
  )
}

const style = {
  container: `w-300 rounded cursor-pointer text-sm text-slate-900 hover:scale-105 ease duration-300 my-2 relative card`,
  imageWrapper: `w-full h-200 rounded-md`,
  image: `w-full h-full object-cover rounded-md ease-in-out transition-all duration-500`,
  wrapper: `w-full flex flex-col px-2 mt-2`,
  name: `text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-primary to-slate-600`,
  button: `bg-slate-300 flex items-center gap-2 rounded-full p-2 text-xs text-slate-900 absolute top-1 left-1`,
  bidButton: `bg-gradient-to-l from-primary to-blue-500 p-1 text-white`
}

export default Card