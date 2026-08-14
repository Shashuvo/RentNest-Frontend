import { z } from "zod";

export const registerSchema = z
    .object({
        name: z
            .string()
            .min(2, "Name must be at least 2 characters")
            .max(50, "Name must be less than 50 characters")
            .regex(
                /^[\p{L}\s]+$/u,
                "Name can only contain letters and spaces"
            ),

        email: z
            .string()
            .email("Please enter a valid email address"),

        password: z
            .string()
            .min(8, "Password must be at least 8 characters"),

        confirmPassword: z
            .string()
            .min(1, "Please confirm your password"),

        phone: z
            .string()
            .optional(),

        address: z
            .string()
            .optional(),

        role: z.enum(["TENANT", "LANDLORD"]),
    })
    .refine(
        (data) => data.password === data.confirmPassword,
        {
            message: "Passwords do not match",
            path: ["confirmPassword"],
        }
    );

export type RegisterFormData = z.infer<typeof registerSchema>;


export const loginSchema = z.object({
    email: z
        .string()
        .email("Please enter a valid email address"),

    password: z
        .string()
        .min(1, "Password is required"),
});