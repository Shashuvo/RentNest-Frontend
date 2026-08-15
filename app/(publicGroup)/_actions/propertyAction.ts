"use server"

import type { ReviewState } from "@/lib/types"

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

export const getPropertyById = async (id: string) => {
    const res = await fetch(`${API}/api/properties/${id}`, {
        next: { revalidate: 300, tags: ["properties", `property-${id}`] },
    })

    if (!res.ok) {
        return null
    }

    return res.json()
}

export const getPropertyReviews = async (propertyId: string): Promise<ReviewState | null> => {
    const res = await fetch(`${API}/api/reviews/${propertyId}`, {
        next: { revalidate: 300, tags: ["reviews", `reviews-${propertyId}`] },
    })

    if (!res.ok) {
        return null
    }

    return res.json()
}