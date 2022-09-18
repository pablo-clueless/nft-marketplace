import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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
        addNofitication: (state, action: PayloadAction<any>) => {
            state.notifications.unshift(action.payload)
        },
        deleteNotification: (state, action: PayloadAction<any>) => {
            const itemId = action.payload
            state.notifications = state.notifications.filter(item => item.id !== itemId)
        },
        markAsRead: (state, action: PayloadAction<any>) => {
            const itemId = action.payload
            const item = state.notifications.find(item => item.id === itemId)
            let isRead = item?.isRead
            isRead = true
        }
    }
})

export const { addNofitication, deleteNotification, markAsRead } = notifications.actions
export default notifications.reducer