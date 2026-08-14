"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
    registerSchema,
    RegisterFormData,
} from "@/lib/validations/auth";

const RegisterForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            role: "TENANT",
        },
    });

    const onSubmit = (data: RegisterFormData) => {
        console.log(data);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
        >
            {/* Name */}
            <div>
                <input
                    className="w-full rounded-md border bg-transparent px-3 py-2.5 text-sm outline-none transition focus:border-primary"
                    type="text"
                    placeholder="Full Name"
                    {...register("name")}
                />

                {errors.name && (
                    <p className="mt-1 text-sm text-red-500!">
                        {errors.name.message}
                    </p>
                )}
            </div>

            {/* Email */}
            <div>
                <input
                    className="w-full rounded-md border bg-transparent px-3 py-2.5 text-sm outline-none transition focus:border-primary"
                    type="email"
                    placeholder="Email"
                    {...register("email")}
                />

                {errors.email && (
                    <p className="mt-1 text-sm text-red-500!">
                        {errors.email.message}
                    </p>
                )}
            </div>

            {/* Password */}
            <div>
                <input
                    className="w-full rounded-md border bg-transparent px-3 py-2.5 text-sm outline-none transition focus:border-primary"
                    type="password"
                    placeholder="Password"
                    {...register("password")}
                />

                {errors.password && (
                    <p className="mt-1 text-sm text-red-500!">
                        {errors.password.message}
                    </p>
                )}
            </div>

            {/* Confirm Password */}
            <div>
                <input
                    className="w-full rounded-md border bg-transparent px-3 py-2.5 text-sm outline-none transition focus:border-primary"
                    type="password"
                    placeholder="Confirm Password"
                    {...register("confirmPassword")}
                />

                {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-500!">
                        {errors.confirmPassword.message}
                    </p>
                )}
            </div>

            {/* Phone */}
            <div>
                <input
                    className="w-full rounded-md border bg-transparent px-3 py-2.5 text-sm outline-none transition focus:border-primary"
                    type="tel"
                    placeholder="Phone Number"
                    {...register("phone")}
                />

                {errors.phone && (
                    <p className="mt-1 text-sm text-red-500!">
                        {errors.phone.message}
                    </p>
                )}
            </div>

            {/* Address */}
            <div>
                <input
                    className="w-full rounded-md border bg-transparent px-3 py-2.5 text-sm outline-none transition focus:border-primary"
                    type="text"
                    placeholder="Address"
                    {...register("address")}
                />

                {errors.address && (
                    <p className="mt-1 text-sm text-red-500!">
                        {errors.address.message}
                    </p>
                )}
            </div>

            {/* Role */}
            <div className="space-y-2">
                <p className="text-sm font-medium">
                    I want to register as
                </p>

                <div className="grid grid-cols-2 gap-2 rounded-md border p-1">
                    <label className="cursor-pointer">
                        <input
                            type="radio"
                            value="TENANT"
                            {...register("role")}
                            className="peer sr-only"
                        />

                        <div className="rounded-md px-3 py-2 text-center text-sm text-muted-foreground transition peer-checked:bg-primary peer-checked:text-white">
                            Tenant
                        </div>
                    </label>

                    <label className="cursor-pointer">
                        <input
                            type="radio"
                            value="LANDLORD"
                            {...register("role")}
                            className="peer sr-only"
                        />

                        <div className="rounded-md px-3 py-2 text-center text-sm text-muted-foreground transition peer-checked:bg-primary peer-checked:text-white">
                            Landlord
                        </div>
                    </label>
                </div>

                {errors.role && (
                    <p className="text-sm text-red-500!">
                        {errors.role.message}
                    </p>
                )}
            </div>

            {/* Register Button */}
            <Button type="submit" className="w-full">
                Register
            </Button>

            {/* Login Link */}
            <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                    href="/login"
                    className="font-medium text-primary hover:underline"
                >
                    Login
                </Link>
            </p>
        </form>
    );
};

export default RegisterForm;