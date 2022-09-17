
export type UserType = {
    _id: string,
    username: string,
    walletAddress: string,
    profileImage: string,
}

export type NotificationsType = {
    id: string
    data: string
    time: string
    sender: UserType | null
    isRead: boolean
}