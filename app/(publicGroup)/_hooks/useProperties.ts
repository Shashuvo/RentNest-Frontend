import { useEffect, useState } from "react"
import type { Category, Property } from "@/lib/types"
import { getAllProperties, getAllCategories } from "../_actions/propertyAction"

export type Filters = {
    searchTerm: string
    city: string
    categoryId: string
    bedrooms: string
    minPrice: string
    maxPrice: string
    sortBy: string
    sortOrder: string
    page: number
}

export const defaultFilters: Filters = {
    searchTerm: "",
    city: "",
    categoryId: "any",
    bedrooms: "any",
    minPrice: "",
    maxPrice: "",
    sortBy: "createdAt",
    sortOrder: "desc",
    page: 1,
}

const LIMIT = 8

export function useProperties(filters: Filters) {
    const [properties, setProperties] = useState<Property[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    const [total, setTotal] = useState(0)
    const [totalPages, setTotalPages] = useState(1)
    const [loading, setLoading] = useState(true)

    // Categories only need to load once
    useEffect(() => {
        let ignore = false

        getAllCategories()
            .then((result) => {
                if (!ignore) setCategories(result.data ?? [])
            })
            .catch(console.error)

        return () => {
            ignore = true
        }
    }, [])

    // Properties refetch whenever filters change (debounced)
    useEffect(() => {
        let ignore = false

        const timeout = setTimeout(() => {
            setLoading(true)

            getAllProperties({ ...filters, limit: LIMIT })
                .then((result) => {
                    if (ignore) return
                    setProperties(result.data)
                    setTotal(result.meta.total)
                    setTotalPages(result.meta.totalPages)
                })
                .catch((error) => {
                    if (!ignore) {
                        console.error(error)
                        setProperties([])
                    }
                })
                .finally(() => {
                    if (!ignore) setLoading(false)
                })
        }, 400)

        return () => {
            ignore = true
            clearTimeout(timeout)
        }
    }, [filters])

    return { properties, categories, total, totalPages, loading }
}