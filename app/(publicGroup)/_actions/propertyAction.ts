"use server"

const API = process.env.BACKEND_API_URL

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

const buildQuery = (params: Record<string, string | number | undefined>) => {
    const query = new URLSearchParams()

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== "" && value !== "any") {
            query.set(key, String(value))
        }
    })

    return query.toString()
}

export const getAllProperties = async (params: GetPropertiesParams = {}) => {
    const res = await fetch(`${API}/api/properties?${buildQuery(params)}`, {
        next: { revalidate: 300, tags: ["properties"] },
    })

    return res.json()
}

export const getAllCategories = async () => {
    const res = await fetch(`${API}/api/categories`, {
        next: { revalidate: 3600, tags: ["categories"] },
    })

    return res.json()
}