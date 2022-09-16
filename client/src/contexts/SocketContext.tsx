import { FC, ReactNode, createContext, useContext, useEffect } from 'react'
import io from 'socket.io-client'

import { useAppDispatch } from '../hooks'
import { addNofitication } from '../store/features/notifications'

const url = import.meta.env.VITE_URL
const socket = io(url)

const SocketContext = createContext<any | null>(null)

interface IChildren { children: ReactNode }

export const SocketProvider:FC<IChildren> = ({children}) => {
    const dispatch = useAppDispatch()
    
    useEffect(() => {
        socket.on('response', (data: any) => dispatch(addNofitication(data)))
    },[socket])

    const values = {socket}

    return (
        <SocketContext.Provider value={values}>
            {children}
        </SocketContext.Provider>
    )
}

export const useSocketContext = () => useContext(SocketContext)