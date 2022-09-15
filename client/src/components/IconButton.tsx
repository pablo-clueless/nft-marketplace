import React from 'react'

interface Icon {
    icon: React.ReactNode
    onClick?: () => void
}

const IconButton:React.FC<Icon> = ({icon, onClick}) => {
  return (
    <button onClick={onClick} className={style}>
        {icon}
    </button>
  )
}

const style = `p-2 rounded-full bg-slate-100 text-xl text-primary`

export default IconButton