import { FC, ReactNode, createContext, useContext, useState } from 'react'
import io from 'socket.io-client'

const url = import.meta.env.VITE_URL
const socket = io(url)

const SocketContext = createContext<any | null>(null)

interface IChildren { children: ReactNode }

export const SocketProvider:FC<IChildren> = ({children}) => {
    return (
        <SocketContext.Provider value={{socket}}>
            {children}
        </SocketContext.Provider>
    )
}

export const useSocketContext = () => useContext(SocketContext)