"use server";

import { cookies } from "next/headers";

import {
    Category,
    Property,
    RentalRequest,
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

export type AdminUser = {
    id: string;
    name: string;
    email: string;
    role: string;
    status: "ACTIVE" | "BANNED";
    phone: string | null;
    address: string | null;
    photoUrl: string | null;
    createdAt: string;
    updatedAt: string;
};

export type AdminUsersState = {
    success: boolean;
    statusCode: number;
    message: string;
    data: AdminUser[];
};

export type AdminUserState = {
    success: boolean;
    statusCode: number;
    message: string;
    data: AdminUser;
};

export type AdminPropertiesState = {
    success: boolean;
    statusCode: number;
    message: string;
    data: Property[];
};

export type AdminRentalsState = {
    success: boolean;
    statusCode: number;
    message: string;
    data: RentalRequest[];
};

export type CreateCategoryState = {
    success: boolean;
    statusCode: number;
    message: string;
    data: Category;
};

export type DeleteCategoryState = {
    success: boolean;
    statusCode: number;
    message: string;
    data: null;
};

// Get all users
export const getAllUsers =
    async (): Promise<AdminUsersState> => {
        const headers = await getAuthHeaders();

        const response = await fetch(
            `${API}/api/admin/users`,
            {
                method: "GET",
                headers,
                cache: "no-store",
            }
        );

        const result =
            (await response.json()) as AdminUsersState;

        if (!response.ok) {
            throw new Error(
                result.message ||
                "Failed to fetch users."
            );
        }

        return result;
    };

// Update user status
export const updateUserStatus = async (
    userId: string,
    status: "ACTIVE" | "BANNED"
): Promise<AdminUserState> => {
    const headers = await getAuthHeaders();

    const response = await fetch(
        `${API}/api/admin/users/${userId}`,
        {
            method: "PATCH",
            headers,
            body: JSON.stringify({ status }),
        }
    );

    const result =
        (await response.json()) as AdminUserState;

    if (!response.ok) {
        throw new Error(
            result.message ||
            "Failed to update user status."
        );
    }

    return result;
};

// Get all properties
export const getAllPropertiesForAdmin =
    async (): Promise<AdminPropertiesState> => {
        const headers = await getAuthHeaders();

        const response = await fetch(
            `${API}/api/admin/properties`,
            {
                method: "GET",
                headers,
                cache: "no-store",
            }
        );

        const result =
            (await response.json()) as AdminPropertiesState;

        if (!response.ok) {
            throw new Error(
                result.message ||
                "Failed to fetch properties."
            );
        }

        return result;
    };

// Get all rentals
export const getAllRentalsForAdmin =
    async (): Promise<AdminRentalsState> => {
        const headers = await getAuthHeaders();

        const response = await fetch(
            `${API}/api/admin/rentals`,
            {
                method: "GET",
                headers,
                cache: "no-store",
            }
        );

        const result =
            (await response.json()) as AdminRentalsState;

        if (!response.ok) {
            throw new Error(
                result.message ||
                "Failed to fetch rentals."
            );
        }

        return result;
    };

// Create category
export const createCategory = async (
    name: string
): Promise<CreateCategoryState> => {
    const headers = await getAuthHeaders();

    const response = await fetch(
        `${API}/api/categories`,
        {
            method: "POST",
            headers,
            body: JSON.stringify({ name }),
        }
    );

    const result =
        (await response.json()) as CreateCategoryState;

    if (!response.ok) {
        throw new Error(
            result.message ||
            "Failed to create category."
        );
    }

    return result;
};

// Delete category
export const deleteCategory = async (
    categoryId: string
): Promise<DeleteCategoryState> => {
    const headers = await getAuthHeaders();

    const response = await fetch(
        `${API}/api/categories/${categoryId}`,
        {
            method: "DELETE",
            headers,
        }
    );

    const result =
        (await response.json()) as DeleteCategoryState;

    if (!response.ok) {
        throw new Error(
            result.message ||
            "Failed to delete category."
        );
    }

    return result;
};

// Get all categories
export const getAllCategoriesForAdmin =
    async (): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: Category[];
    }> => {
        const response = await fetch(
            `${API}/api/categories`,
            {
                method: "GET",
                cache: "no-store",
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.message ||
                "Failed to fetch categories."
            );
        }

        return result;
    };

export type DeletePropertyState = {
    success: boolean;
    statusCode: number;
    message: string;
    data: null;
};

export const deletePropertyForAdmin = async (
    propertyId: string
): Promise<DeletePropertyState> => {
    const headers = await getAuthHeaders();

    const response = await fetch(
        `${API}/api/landlord/properties/${propertyId}`,
        {
            method: "DELETE",
            headers,
        }
    );

    const result =
        (await response.json()) as DeletePropertyState;

    if (!response.ok) {
        throw new Error(
            result.message ||
            "Failed to delete property."
        );
    }

    return result;
};

export type UpdateRentalStatusState = {
    success: boolean;
    statusCode: number;
    message: string;
    data: RentalRequest;
};

export const updateRentalStatusForAdmin = async (
    requestId: string,
    status: RentalRequest["status"]
): Promise<UpdateRentalStatusState> => {
    const headers = await getAuthHeaders();

    const response = await fetch(
        `${API}/api/admin/rentals/${requestId}`,
        {
            method: "PATCH",
            headers,
            body: JSON.stringify({ status }),
        }
    );

    const result =
        (await response.json()) as UpdateRentalStatusState;

    if (!response.ok) {
        throw new Error(
            result.message ||
                "Failed to update rental status."
        );
    }

    return result;
};