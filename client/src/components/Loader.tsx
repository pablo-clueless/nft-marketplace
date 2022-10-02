import React from 'react'

const Loader = () => {
  return (
    <div className='w-screen h-screen fixed top-0 left-0 bg-half-transparent backdrop-blur-sm grid place-items-center z-50 nb-backdrop'>
      <div className='nb-spinner'></div>
    </div>
  )
}

export default Loader