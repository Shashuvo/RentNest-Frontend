"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import {
    PropertyDetailState,
    PropertyState,
} from "@/lib/types";

const API = process.env.BACKEND_API_URL;

const getAuthHeaders = async () => {
    const cookieStore = await cookies();

    const accessToken =
        cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        throw new Error("You are not logged in.");
    }

    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
    };
};

// Get my properties
export async function getMyProperties(): Promise<PropertyState> {
    const headers = await getAuthHeaders();

    const response = await fetch(
        `${API}/api/landlord/properties`,
        {
            method: "GET",
            headers,
            cache: "no-store",
        }
    );

    const result =
        (await response.json()) as PropertyState;

    if (!response.ok) {
        throw new Error(
            result.message ||
            "Failed to fetch properties"
        );
    }

    return result;
}

// Create property
export async function createProperty(
    payload: {
        title: string;
        description: string;
        address: string;
        city: string;
        area: number | null;
        price: number;
        bedrooms: number;
        bathrooms: number;
        categoryId: string;
    }
): Promise<PropertyDetailState> {
    const headers = await getAuthHeaders();

    console.log("CREATE PAYLOAD:", payload);

    const response = await fetch(
        `${API}/api/landlord/properties`,
        {
            method: "POST",
            headers,
            body: JSON.stringify(payload),
        }
    );

    const result = await response.json();


    if (!response.ok) {
        throw new Error(
            result.message ||
            "Failed to create property"
        );
    }

    revalidatePath("/");
    revalidatePath("/properties");

    return result as PropertyDetailState;
}

// Update property
export async function updateProperty(
    propertyId: string,
    payload: {
        title: string;
        description: string;
        address: string;
        city: string;
        area: number | null;
        price: number;
        bedrooms: number;
        bathrooms: number;
        categoryId: string;
    }
): Promise<PropertyDetailState> {
    const headers = await getAuthHeaders();

    const response = await fetch(
        `${API}/api/landlord/properties/${propertyId}`,
        {
            method: "PUT",
            headers,
            body: JSON.stringify(payload),
        }
    );

    const result =
        (await response.json()) as PropertyDetailState;

    if (!response.ok) {
        throw new Error(
            result.message ||
            "Failed to update property"
        );
    }

    revalidatePath("/");
    revalidatePath("/properties");
    revalidatePath(`/properties/${propertyId}`);

    return result;
}

// Delete property
export async function deleteProperty(
    propertyId: string
) {
    const headers = await getAuthHeaders();

    const response = await fetch(
        `${API}/api/landlord/properties/${propertyId}`,
        {
            method: "DELETE",
            headers,
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.message ||
            "Failed to delete property"
        );
    }

    revalidatePath("/");
    revalidatePath("/properties");
    revalidatePath(`/properties/${propertyId}`);

    return result;
}

// Upload property images
export async function uploadPropertyImages(
    files: File[]
): Promise<string[]> {
    const cookieStore = await cookies();

    const accessToken =
        cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        throw new Error("You are not logged in.");
    }

    const formData = new FormData();

    files.forEach((file) => {
        formData.append("images", file);
    });

    const response = await fetch(
        `${API}/api/upload/images`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: formData,
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.message ||
            "Failed to upload images."
        );
    }

    return result.data.map(
        (image: { url: string }) => image.url
    );
}