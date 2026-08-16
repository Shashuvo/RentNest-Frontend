import { z } from "zod";

export const updateProfileSchema = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name must be less than 50 characters")
        .regex(
            /^[\p{L}\s]+$/u,
            "Name can only contain letters and spaces"
        ),

    phone: z
        .string()
        .optional(),

    address: z
        .string()
        .max(250, "Address must be less than 250 characters")
        .optional(),
});

export type UpdateProfileFormValues = z.infer<
    typeof updateProfileSchema
>;