"use server";

import { cookies } from "next/headers";
import {
    CreateRentalRequestPayload,
    CreateRentalRequestState,
    RentalRequestDetailState,
    RentalRequestState,
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

export async function createRentalRequest(
    payload: CreateRentalRequestPayload
): Promise<CreateRentalRequestState> {
    const headers = await getAuthHeaders();

    const response = await fetch(`${API}/api/rentals`, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
    });

    const result = (await response.json()) as CreateRentalRequestState;

    if (!response.ok) {
        throw new Error(
            result.message || "Failed to submit rental request."
        );
    }

    return result;
}

export async function getMyRentalRequests(): Promise<RentalRequestState> {
    const headers = await getAuthHeaders();

    const response = await fetch(`${API}/api/rentals`, {
        method: "GET",
        headers,
        cache: "no-store",
    });

    const result = (await response.json()) as RentalRequestState;

    if (!response.ok) {
        throw new Error(
            result.message || "Failed to fetch rental requests."
        );
    }

    return result;
}

export async function getMyRentalRequestById(
    requestId: string
): Promise<RentalRequestDetailState> {
    const headers = await getAuthHeaders();

    const response = await fetch(
        `${API}/api/rentals/${requestId}`,
        {
            method: "GET",
            headers,
            cache: "no-store",
        }
    );

    const result =
        (await response.json()) as RentalRequestDetailState;

    if (!response.ok) {
        throw new Error(
            result.message || "Failed to fetch rental request."
        );
    }

    return result;
}