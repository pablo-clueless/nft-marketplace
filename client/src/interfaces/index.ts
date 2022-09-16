
export interface MetaData {
    name: string
    description: string
    image: string
}

export  interface HeaderObject {
    key: string | undefined
    value: string | undefined
}

export interface PinataRequestBody {
    name: string
    description: string
    status: 'initial' | 'loading' | 'fulfilled' | 'rejected'
    profileImage: File | null
}

export interface User {
    _id: string
    username: string
    walletAddress: string
    profileImage: string
}

export interface NFTCard {
    _id: string
    name: string
    description: string
    file: string
    price: number
    creator: User | string | null
    likes: number
}

export interface Action {
    type: string
    name: string
    value: any
}

export interface BidDetails {
    nftId: string
    name: string
    userId: string
    amount: number
    bidId?: string
    action: string
    username: string
    onClose: () => void
}