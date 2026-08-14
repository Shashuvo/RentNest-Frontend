"use client";

import Link from "next/link";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { registerAction } from "../_actions/authAction";

const RegisterForm = () => {
    const [state, action, pending] = useActionState(registerAction, false);

    useEffect(() => {
        if (!state) return;

        if (state.success) {
            toast.success(
                state.message || "Registration Successful."
            );
        } else {
            toast.error(
                state.message || "Registration Failed."
            );
        }
    }, [state]);

    return (
        <form action={action} className="space-y-4">

            {/* Name */}
            <div>
                <input
                    className="w-full rounded-md border bg-transparent px-3 py-2.5 text-sm outline-none transition focus:border-primary"
                    type="text"
                    name="name"
                    placeholder="Full Name"
                />
            </div>

            {/* Email */}
            <div>
                <input
                    className="w-full rounded-md border bg-transparent px-3 py-2.5 text-sm outline-none transition focus:border-primary"
                    type="email"
                    name="email"
                    placeholder="Email"
                />
            </div>

            {/* Password */}
            <div>
                <input
                    className="w-full rounded-md border bg-transparent px-3 py-2.5 text-sm outline-none transition focus:border-primary"
                    type="password"
                    name="password"
                    placeholder="Password"
                />
            </div>

            {/* Confirm Password */}
            <div>
                <input
                    className="w-full rounded-md border bg-transparent px-3 py-2.5 text-sm outline-none transition focus:border-primary"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                />
            </div>

            {/* Phone */}
            <div>
                <input
                    className="w-full rounded-md border bg-transparent px-3 py-2.5 text-sm outline-none transition focus:border-primary"
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                />
            </div>

            {/* Address */}
            <div>
                <input
                    className="w-full rounded-md border bg-transparent px-3 py-2.5 text-sm outline-none transition focus:border-primary"
                    type="text"
                    name="address"
                    placeholder="Address"
                />
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
                            name="role"
                            value="TENANT"
                            defaultChecked
                            className="peer sr-only"
                        />

                        <div className="rounded-md px-3 py-2 text-center text-sm text-muted-foreground transition peer-checked:bg-primary peer-checked:text-white">
                            Tenant
                        </div>
                    </label>

                    <label className="cursor-pointer">
                        <input
                            type="radio"
                            name="role"
                            value="LANDLORD"
                            className="peer sr-only"
                        />

                        <div className="rounded-md px-3 py-2 text-center text-sm text-muted-foreground transition peer-checked:bg-primary peer-checked:text-white">
                            Landlord
                        </div>
                    </label>

                </div>
            </div>

            {/* Register Button */}
            <Button
                type="submit"
                className="w-full"
                disabled={pending}
            >
                {pending ? "Creating Account..." : "Register"}
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