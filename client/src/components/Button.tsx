import React from 'react'

interface IButton {
  type: 'button' | 'reset' | 'submit'
  label: string
  onClick?: () => void
  variant?: 'outlined' | 'contained'
  icon?: React.ReactNode
}

const Button:React.FC<IButton> = ({type, label, onClick, variant, icon}) => {

  if(variant === 'outlined') {
    return (
    <button type={type} onClick={onClick} className={style.outlined}>
      {icon} {label}
    </button>
    )
  }

  return (
    <button type={type} onClick={onClick} className={style.contained}>
      {icon} {label}
    </button>
  )
}

const style = {
  outlined: `flex items-center justify-center gap-2  bg-transparent hover:bg-slate-600 text-slate-600 text-sm font-semibold hover:text-white py-2 px-4 border border-slate-600 hover:border-transparent rounded my-2`,
  contained: `flex items-center justify-center gap-2 bg-slate-600 hover:bg-slate-800 text-white text-sm font-bold py-2 px-4 rounded my-2`
}

export default Button