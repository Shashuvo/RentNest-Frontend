"use server";

import { cookies } from "next/headers";

export const uploadProfileImage = async (
    file: File
) => {
    const cookieStore = await cookies();

    const accessToken =
        cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        return {
            success: false,
            message: "User not logged in! Please login.",
        };
    }

    const formData = new FormData();

    formData.append("image", file);

    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/upload/profile-image`,
        {
            method: "POST",
            headers: {
                Cookie: `accessToken=${accessToken}`,
            },
            body: formData,
            cache: "no-store",
        }
    );

    const result = await res.json();

    return result;
};