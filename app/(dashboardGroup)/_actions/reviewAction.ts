"use server";

import { cookies } from "next/headers";
import {
    CreateReviewPayload,
    CreateReviewState,
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

export async function createReview(
    payload: CreateReviewPayload
): Promise<CreateReviewState> {
    const headers = await getAuthHeaders();

    const response = await fetch(`${API}/api/reviews`, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
    });

    const result =
        (await response.json()) as CreateReviewState;

    if (!response.ok) {
        throw new Error(
            result.message || "Failed to submit review."
        );
    }

    return result;
}