"use server";

import { cookies } from "next/headers";

import {
    LandlordRentalRequestState,
    UpdateRentalStatusPayload,
    UpdateRentalStatusState,
} from "@/lib/types";

const API = process.env.BACKEND_API_URL;

const getAuthHeaders = async () => {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        throw new Error("You are not logged in.");
    }

    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
    };
};

export async function getLandlordRequests(): Promise<LandlordRentalRequestState> {
    const headers = await getAuthHeaders();

    const response = await fetch(`${API}/api/landlord/requests`, {
        method: "GET",
        headers,
        cache: "no-store",
    });

    const result =
        (await response.json()) as LandlordRentalRequestState;

    if (!response.ok) {
        throw new Error(
            result.message || "Failed to fetch rental requests."
        );
    }

    return result;
}

export async function updateRentalStatus(
    requestId: string,
    payload: UpdateRentalStatusPayload
): Promise<UpdateRentalStatusState> {
    const headers = await getAuthHeaders();

    const response = await fetch(
        `${API}/api/landlord/requests/${requestId}`,
        {
            method: "PATCH",
            headers,
            body: JSON.stringify(payload),
        }
    );

    const result =
        (await response.json()) as UpdateRentalStatusState;

    if (!response.ok) {
        throw new Error(
            result.message || "Failed to update rental status."
        );
    }

    return result;
}