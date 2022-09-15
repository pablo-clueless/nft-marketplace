import React from 'react'
import { useParams } from 'react-router-dom'

const NFT = () => {
    const { id } = useParams()
    
  return (
    <div>NFT</div>
  )
}

export default NFT