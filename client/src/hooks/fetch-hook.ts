import { useState } from 'react'

export const useHttpRequest = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<any>(null)

    const fetcher = async(url: string, method: string, body?: any, headers?: HeadersInit): Promise<any> => {
        setLoading(true)

        try {
            const response = await fetch(url,{ method, body, headers })
            const data = await response.json()
            if(!response.ok) throw new Error(data?.message)
            setLoading(false)
            return data
        } catch (error) {
            setLoading(false)
            setError(error)
        }
    }

    const clearErr = () => setError(null)

    return {clearErr, error, fetcher, loading}
}