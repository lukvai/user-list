export interface User {
    id: number
    name: string
    email: string
    gender: string
    status: string
}

export interface UserPost {
    body: string
    id: number
    title: string
    user_id: number
}
