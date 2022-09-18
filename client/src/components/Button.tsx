import React from 'react'

interface IButton {
  type: 'button' | 'reset' | 'submit'
  label: string
  onClick?: () => void
  variant?: 'outlined' | 'contained'
  icon?: React.ReactNode
  disabled?: boolean
}

const Button:React.FC<IButton> = ({type, label, onClick, variant, icon, disabled}) => {

  if(variant === 'outlined') {
    return (
    <button type={type} onClick={onClick} className={style.outlined} disabled={disabled}>
      {icon} {label}
    </button>
    )
  }

  return (
    <button type={type} onClick={onClick} className={style.contained} disabled={disabled}>
      {icon} {label}
    </button>
  )
}

const style = {
  outlined: `flex items-center justify-center gap-2 bg-transparent text-primary text-sm font-semibold py-2 px-4 border border-primary my-2 shake disabled:bg-gray-400 disabled:text-black`,
  contained: `flex items-center justify-center gap-2 bg-primary text-white text-sm font-bold py-2 px-4 my-2 drop-shadow-md shake disabled:bg-gray-400 disabled:text-black`
}

export default Button