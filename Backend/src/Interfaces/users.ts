export interface user{
    firstname: string,
    lastname: string,
    email: string,
    password: string,
}

export interface loginUserDetails{
    userId: string,
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    isAdmin: boolean
}