
export type UserType = {
    _id: string,
    username: string,
    walletAddress: string,
    profileImage: string,
}

export type NftType = {
    _id: string
    name: string
    description: string
    file: string
    price: number
    creator: string
    timestamp: Date | string
    bids: Array<Bid>
    likes: number
    listed: boolean
}

export type NotificationsType = {
    id: string
    data: string
    time: string
    sender: UserType | null
    isRead: boolean
}

export type Bid = {
    by: string
    amount: number
}