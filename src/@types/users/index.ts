export interface UserInterface {
    id?: number
    user_name: string
    password: string
    created_at?: string
    updated_at?: string
}

export interface UserSessionInterface extends Omit<UserInterface, 'password'> {
    password?: string
}
