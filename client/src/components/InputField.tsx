import React, { ChangeEvent, useReducer, useEffect } from 'react'

import { validate } from '../utils/validator'
import { Action, IInput } from '../interfaces'

const inputReducer = (state: any, action: Action) => {
  switch(action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.value,
        isValid: validate(action.value, action.validators)
      }
    case 'TOUCH':
      return {
        ...state,
        isTouched: true
      }
    default:
      return state
  }
}

const Input:React.FC<IInput> = ({element, id, label, type, placeholder, onInput, validators, errorText}) => {
  const [inputState, dispatch] = useReducer(inputReducer, { value: '', isTouched: false, isValid: false})

  const { value, isValid } = inputState

  useEffect(() => {
    onInput(id, value, isValid)
  },[id, value, isValid, onInput])

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({type: 'CHANGE', inputId: e.target.id, value: e.target.value, isValid: true,validators: validators})
  }

  const handleTouch = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({type: 'TOUCH', inputId: e.target.id, value: null, isValid: false, validators: validators})
  }

  element === 'input' ? (
    <input id={id} type={type} placeholder={placeholder} onChange={handleChange} onBlur={handleTouch} value={value} />
  ) : (
    <textarea id={id} rows={4} onChange={handleChange} onBlur={handleTouch} value={value} />
  )

  return (
  <div className={`w-full bg-transparent my-1 border ${!inputState.isValid && inputState.isTouched && 'border-red-400'}`}>
    <label htmlFor={id}>{label}</label>
    {element}
    {!inputState.isValid && inputState.isTouched && <p>{errorText}</p>}
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