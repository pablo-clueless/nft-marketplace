
export type UserType = {
    _id: string,
    username: string,
    walletAddress: string,
    profileImage: string,
}

export type NotificationsType = {
    id: string
    content: string
    timestamp: Date | string
    sender: UserType | null
}