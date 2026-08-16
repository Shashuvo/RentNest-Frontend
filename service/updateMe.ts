import { cookies } from "next/headers";

export const updateMe = async (payload: {
    name: string;
    phone?: string;
    address?: string;
    photoUrl?: string;
}) => {
    const cookieStore = await cookies();

    const accessToken =
        cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        return {
            success: false,
            message: "User not logged in! Please login.",
        };
    }

    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/auth/update-me`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Cookie: `accessToken=${accessToken}`,
            },
            body: JSON.stringify(payload),
            cache: "no-store",
        }
    );

    const result = await res.json();

    return result;
};