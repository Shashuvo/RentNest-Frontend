"use server";

import { cookies } from "next/headers";

import {
    CheckoutSessionState,
    PaymentDetailState,
    PaymentState,
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

export async function createCheckoutSession(
    rentalRequestId: string
): Promise<CheckoutSessionState> {
    const headers = await getAuthHeaders();

    const response = await fetch(`${API}/api/payments/create`, {
        method: "POST",
        headers,
        body: JSON.stringify({
            rentalRequestId,
        }),
    });

    const result =
        (await response.json()) as CheckoutSessionState;

    if (!response.ok) {
        throw new Error(
            result.message || "Failed to create checkout session."
        );
    }

    return result;
}

export async function getMyPayments(): Promise<PaymentState> {
    const headers = await getAuthHeaders();

    const response = await fetch(`${API}/api/payments`, {
        method: "GET",
        headers,
        cache: "no-store",
    });

    const result = (await response.json()) as PaymentState;

    if (!response.ok) {
        throw new Error(
            result.message || "Failed to fetch payments."
        );
    }

    return result;
}

export async function getPaymentById(
    paymentId: string
): Promise<PaymentDetailState> {
    const headers = await getAuthHeaders();

    const response = await fetch(
        `${API}/api/payments/${paymentId}`,
        {
            method: "GET",
            headers,
            cache: "no-store",
        }
    );

    const result =
        (await response.json()) as PaymentDetailState;

    if (!response.ok) {
        throw new Error(
            result.message || "Failed to fetch payment."
        );
    }

    return result;
}