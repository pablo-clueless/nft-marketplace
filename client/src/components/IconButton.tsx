import React from 'react'

interface Icon {
    icon: React.ReactNode
    onClick?: () => void
    badge?: boolean
    count?: number
}

const IconButton:React.FC<Icon> = ({icon, onClick, badge, count}) => {
  return (
    <button onClick={onClick} className={style.button}>
      {badge ? <span className={style.count}>{count && count}</span> : null}
        {icon}
    </button>
  )
}

const style = {
  button: `p-2 rounded-full bg-slate-100 text-xl text-primary relative`,
  count: `rounded-full w-3 h-3 p-2 flex items-center justify-center bg-primary absolute top-0 -right-1 text-[8px] text-white`
} 

export default IconButton