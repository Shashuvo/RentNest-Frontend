"use server";

import { CategoryState } from "@/lib/types";

const API = process.env.BACKEND_API_URL;

export async function getAllCategories(): Promise<CategoryState> {
    const response = await fetch(`${API}/api/categories`, {
        next: {
            revalidate: 3600,
            tags: ["categories"],
        },
    });

    const result = (await response.json()) as CategoryState;

    if (!response.ok) {
        throw new Error(
            result.message || "Failed to fetch categories"
        );
    }

    return result;
}