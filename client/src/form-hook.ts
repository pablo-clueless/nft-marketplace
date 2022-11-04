import { ChangeEvent, useCallback, useReducer } from 'react'

import { Action } from './interfaces'

const formReducer = (state: any, action: Action) => {
    switch(action.type) {
        case 'INPUT_CHANGE':
            let formIsValid = true;
            for(const inputId of state.inputs) {
                if(inputId === action.inputId) {
                    formIsValid = formIsValid && action.isValid
                } else {
                    formIsValid = formIsValid && state.inputs[inputId].isValid
                }
            }
            return {
                ...state,
                [action.inputId]: {value: action.value, isValid: action.isValid},
                isValid: formIsValid
            }
        default:
            return state
    }
}

const useFormInputs = (initialState: any, initialFormValidity: boolean) => {
    const [formState, dispatch] = useReducer(formReducer, { inputs: initialState, isValid: initialFormValidity})

    const handleChange = useCallback((id: string, value: any, isValid: boolean) => {
        dispatch({type: 'INPUT_CHANGE', value: value, isValid: isValid, inputId: id, validators: []})
    },[])

    return [formState, handleChange]
}