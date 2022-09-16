import React, { ChangeEvent, ChangeEventHandler } from 'react'

interface IInput {
    name: string
    label?: string
    type: string
    onChange: ChangeEventHandler
    placeholder?: string
    min?: number
    max?: number
}

const Input:React.FC<IInput> = ({name, label, type, onChange, placeholder, min, max}) => {
  if(type === 'textarea') {
    return (
      <div className={style.formControl}>
        <label htmlFor={name} className={style.label}>{label}</label>
        <div className={style.textareaWrapper}>
          <textarea name={name} onChange={onChange} className={style.textarea} placeholder={placeholder} />
        </div>
      </div>
    )
  }
  
  if(type === 'number') {
    return (
      <div className={style.formControl}>
          <label htmlFor={name} className={style.label}>{label}</label>
          <div className={style.inputWrapper}>
              <input type={type} name={name} onChange={onChange} placeholder={placeholder} className={style.input} min={min} max={max} step={0.01} />
          </div>
      </div>
    )
  }
  
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
    inputWrapper: `w-full h-8 bg-transparent border border-slate-600 focus-within:border-slate-300`,
    textareaWrapper: `w-full h-100 bg-transparent border border-slate-600 focus-within:border-slate-300`,
    input: `w-full h-full bg-transparent outline-none border-none p-2 text-sm placeholder:italic`,
    textarea: `w-full h-full bg-transparent outline-none border-none p-2 text-sm placeholder:italic resize-none`,
}

export default Input