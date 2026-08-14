"use server";

import { LoginState, RegisterState } from "@/lib/types";
import { loginSchema, registerSchema } from "@/lib/validations/auth";
import { cookies } from "next/headers";

export const loginAction = async (prevState: LoginState, formData: FormData) => {
    const validation = loginSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
    });

    if (!validation.success) {
        return {
            success: false,
            message: validation.error.issues[0].message,
        };
    }

    const { email, password } = validation.data;

    const payload = {
        email,
        password,
    };

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        }
    );

    const result = await res.json();

    if (result.success) {
        const cookieStore = await cookies();

        cookieStore.set(
            "accessToken",
            result.data.accessToken,
            {
                httpOnly: true,
                maxAge: 60 * 60 * 24,
                sameSite: "lax",
            }
        );

        cookieStore.set(
            "refreshToken",
            result.data.refreshToken,
            {
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 7,
                sameSite: "lax",
            }
        );
    }

    return result;
};


export const registerAction = async (prevState: RegisterState, formData: FormData) => {
    const payload = {
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPassword"),
        phone: formData.get("phone"),
        address: formData.get("address"),
        role: formData.get("role"),
    };

    // Validate with Zod
    const validation = registerSchema.safeParse(payload);

    if (!validation.success) {
        return {
            success: false,
            message: validation.error.issues[0].message,
        };
    }

    // Only send validated data to backend
    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/auth/register`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(validation.data),
        }
    );

    const result = await res.json();

    return result;
};