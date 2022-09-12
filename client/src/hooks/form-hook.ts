import { ChangeEvent, useReducer } from 'react'

import { Action } from '../interfaces'

export const useFormInputs = (initialState: any) => {
    const reducer = (state: typeof initialState, action: Action) => {
        switch(action.type) {
            case 'text':
                return {
                    ...state,
                    [action.name]: action.value
                }
            case 'check':
                return {
                    ...state,
                    [action.name]: action.value
                }
            case 'reset':
                return initialState
            default:
                return state
        }
    }

    const [inputs, dispatch] = useReducer(reducer, initialState)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({type: 'text', name: e.target.name, value: e.target.value})
    }

    const handleToggle = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({type: 'text', name: e.target.name, value: e.target.checked})
    }
    
    return {inputs, bind: {onChange: handleChange}, toggle: {onChange: handleToggle}}
}