import { createSlice } from '@reduxjs/toolkit'

import { User } from '../../interfaces'

interface IUser { user: User | null, isLoggedIn: boolean }

const initialState = { user: null, isLoggedIn: false } as IUser

const user = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, {payload}) => {
            state.user = payload
            state.isLoggedIn = true
            localStorage.setItem('user', JSON.stringify(payload))
        },
        logout: (state) => {
            state.user = initialState.user
            state.isLoggedIn = false
            localStorage.removeItem('user')
        }
    }
})

export const { login, logout } = user.actions
export default user.reducer