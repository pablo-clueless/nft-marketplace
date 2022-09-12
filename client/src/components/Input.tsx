import React, { ChangeEvent, ChangeEventHandler } from 'react'

interface IInput {
    name: string
    label: string
    type: string
    onChange: ChangeEventHandler<HTMLInputElement>
    placeholder?: string
}

const Input:React.FC<IInput> = ({name, label, type, onChange, placeholder}) => {
  return (
    <div className={style.formControl}>
        <label htmlFor={name} className={style.label}>{label}</label>
        <div className={style.inputWrapper}>
            <input type={type} name={name} onChange={onChange} placeholder={placeholder} className={style.input} />
        </div>
    </div>
  )
}

const style = {
    formControl: `w-full bg-transparent my-1`,
    label: `text-sm text-slate-600`,
    inputWrapper: `w-full h-8 bg-transparent border border-slate-600 focus-within:border-slate-300 rounded`,
    input: `w-full h-full bg-transparent outline-none border-none p-2 text-sm rounded placeholder:italic`,
}

export default Input