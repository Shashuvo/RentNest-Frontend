export type IUser = {
    success: boolean,
    statusCode: number,
    message: string,
    data: {
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

export type NavbarProps = {
    user: IUser
}

export type LoginState = {
    success: boolean,
    statusCode: number,
    message: string,
    data: {
        accessToken: string,
        refreshToken: string
    }
}

export type RegisterState = {
    success: boolean,
    statusCode: number,
    message: string,
    data: {
        id: string,
        name: string,
        email: string,
        role: string,
        status: string,
        phone: string | null,
        address: string | null,
        photoUrl: string | null,
        createdAt: string,
        updatedAt: string
    }
}

export type Review = {
    id: string,
    rating: number,
    comment: string,
    propertyId: string,
    tenantId: string,
    createdAt: string,
    updatedAt: string,

    tenant: {
        id: string,
        name: string,
        email: string,
        role: string,
        status: string,
        phone: string | null,
        address: string | null,
        photoUrl: string | null,
        createdAt: string,
        updatedAt: string
    }
}

export type ReviewState = {
    success: boolean,
    statusCode: number,
    message: string,
    data: {
        averageRating: number,
        total: number,
        reviews: Review[]
    }
}

export type Property = {
    id: string,
    title: string,
    description: string,
    address: string,
    city: string,
    area: number | null,
    price: number,
    bedrooms: number,
    bathrooms: number,
    images: string[],
    isAvailable: boolean,
    landlordId: string,
    categoryId: string,
    createdAt: string,
    updatedAt: string,

    category: {
        id: string,
        name: string,
        createdAt: string
    },

    landlord: {
        id: string,
        name: string,
        email: string,
        role: string,
        status: string,
        phone: string | null,
        address: string | null,
        photoUrl: string | null,
        createdAt: string,
        updatedAt: string
    },

    reviews: Review[],

    _count: {
        reviews: number,
        rentalRequests: number
    }
}

export type PropertyState = {
    success: boolean,
    statusCode: number,
    message: string,
    data: Property[],
    meta: {
        page: number,
        limit: number,
        total: number,
        totalPages: number
    }
}

export type PropertyDetailState = {
    success: boolean,
    statusCode: number,
    message: string,
    data: Property
}

export type Category = {
    id: string
    name: string
    createdAt: string
}

export type CategoryState = {
    success: boolean
    statusCode: number
    message: string
    data: Category[]
}

export type GetPropertiesParams = {
    page?: number
    limit?: number
    sortBy?: string
    sortOrder?: string
    searchTerm?: string
    city?: string
    categoryId?: string
    bedrooms?: string
    minPrice?: string
    maxPrice?: string
}