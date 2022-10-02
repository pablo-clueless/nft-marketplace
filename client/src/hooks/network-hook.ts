import { useEffect, useState } from 'react'

export const useNetwork = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine)

    const updateNetwork = () => {
        setIsOnline(navigator.onLine)
    }

    useEffect(() => {
        addEventListener('online', updateNetwork)
        removeEventListener('offline', updateNetwork)

        return () => {
            addEventListener('online', updateNetwork)
            removeEventListener('online', updateNetwork)
        }
    },[])

    return { isOnline, since: new Date().toLocaleString()}
}