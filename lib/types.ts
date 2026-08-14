export type IUser = {
    success: boolean,
    statusCode: number,
    message: string,
    data: {
        profile: {
            id: string,
            name: string,
            email: string,
            role: string,
            status: string,
            phone: string | null,
            address: string | null,
            photoUrl: string | null,
            createdAt: string,
            updatedAt: string,
        }
    }
}

export type NavbarProps = {
    user: IUser
}