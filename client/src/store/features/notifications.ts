import { createSlice } from '@reduxjs/toolkit'

import { NotificationsType } from '../../types'

interface INotifications {
    notifications: Array<NotificationsType>
}

const initialState = {
    notifications: []
} as INotifications

const notifications = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        addNofitication: (state, { payload }) => {
            state.notifications.unshift(payload)
        },
        deleteNotification: (state, { payload }) => {
            state.notifications.filter(item => item.id !== payload)
        }
    }
})

export const { addNofitication, deleteNotification } = notifications.actions
export default notifications.reducer