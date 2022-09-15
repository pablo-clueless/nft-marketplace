import { FC, ReactNode, createContext, useContext, useState } from 'react'

declare global {
    interface Window {
        ethereum: any
        web3: any
    }
}
interface IChildren {
    children: ReactNode
}

const AppContext = createContext<any | null>(null)

const initialState = { login: false }

export const ContextProvider: FC<IChildren> = ({children}) => {
    const [isClicked, setIsClicked] = useState<any>(initialState)
    const [walletAddress, setWalletAddress] = useState<string>('')

    const handleClicked = (clicked: string) => {
        setIsClicked({...initialState, [clicked]: true })
    }

    const handleUnclicked = (clicked: string) => {
        setIsClicked({...initialState, [clicked]: false })
    }

    const values = {isClicked, handleClicked, handleUnclicked, walletAddress, setWalletAddress}
    return (
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext)