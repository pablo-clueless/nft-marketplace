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
  outlined: `flex items-center justify-center gap-2 bg-transparent text-primary text-sm font-semibold py-2 px-4 border border-primary my-2 shake`,
  contained: `flex items-center justify-center gap-2 bg-primary text-white text-sm font-bold py-2 px-4 my-2 drop-shadow-md shake`
}

export default Button