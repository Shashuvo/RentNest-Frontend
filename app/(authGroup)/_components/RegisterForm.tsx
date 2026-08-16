"use client";

import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import {
    Eye,
    EyeOff,
    Lock,
    Mail,
    MapPin,
    Phone,
    User,
    Building2,
    Home,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { registerAction } from "../_actions/authAction";

const inputClass =
    "h-11 w-full rounded-full border border-border bg-background pl-10 pr-4 text-sm shadow-sm outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary";

const fieldLabelClass =
    "mb-2 block text-[11px] font-medium uppercase tracking-wider text-muted-foreground";

const RegisterForm = () => {
    const [state, action, pending] = useActionState(registerAction, false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
        <form action={action} className="space-y-5">

            {/* Name */}
            <div>
                <label htmlFor="name" className={fieldLabelClass}>
                    Full Name
                </label>
                <div className="relative">
                    <User className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                        id="name"
                        className={inputClass}
                        type="text"
                        name="name"
                        placeholder="Full Name"
                    />
                </div>
            </div>

            {/* Email */}
            <div>
                <label htmlFor="email" className={fieldLabelClass}>
                    Email
                </label>
                <div className="relative">
                    <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                        id="email"
                        className={inputClass}
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                    />
                </div>
            </div>

            {/* Password & Confirm Password */}
            <div className="grid gap-4 sm:grid-cols-2">
                <div>
                    <label htmlFor="password" className={fieldLabelClass}>
                        Password
                    </label>
                    <div className="relative">
                        <Lock className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                            id="password"
                            className={`${inputClass} pr-11`}
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="••••••••"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((v) => !v)}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? (
                                <EyeOff className="size-4" />
                            ) : (
                                <Eye className="size-4" />
                            )}
                        </button>
                    </div>
                </div>

                <div>
                    <label htmlFor="confirmPassword" className={fieldLabelClass}>
                        Confirm Password
                    </label>
                    <div className="relative">
                        <Lock className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                            id="confirmPassword"
                            className={`${inputClass} pr-11`}
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            placeholder="••••••••"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword((v) => !v)}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                        >
                            {showConfirmPassword ? (
                                <EyeOff className="size-4" />
                            ) : (
                                <Eye className="size-4" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Phone & Address */}
            <div className="grid gap-4 sm:grid-cols-2">
                <div>
                    <label htmlFor="phone" className={fieldLabelClass}>
                        Phone Number
                    </label>
                    <div className="relative">
                        <Phone className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                            id="phone"
                            className={inputClass}
                            type="tel"
                            name="phone"
                            placeholder="+880 1XXX-XXXXXX"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="address" className={fieldLabelClass}>
                        Address
                    </label>
                    <div className="relative">
                        <MapPin className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                            id="address"
                            className={inputClass}
                            type="text"
                            name="address"
                            placeholder="Location"
                        />
                    </div>
                </div>
            </div>

            {/* Role */}
            <div className="space-y-2.5">
                <p className={fieldLabelClass + " mb-0"}>
                    I want to register as
                </p>

                <div className="grid grid-cols-2 gap-2 rounded-full border border-border bg-muted/40 p-1.5">

                    <label className="cursor-pointer">
                        <input
                            type="radio"
                            name="role"
                            value="TENANT"
                            defaultChecked
                            className="peer sr-only"
                        />

                        <div className="flex items-center justify-center gap-2 rounded-full px-3 py-2.5 text-sm font-medium text-muted-foreground transition-all duration-200 peer-checked:bg-primary peer-checked:text-primary-foreground peer-checked:shadow-sm">
                            <Home className="size-4" />
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

                        <div className="flex items-center justify-center gap-2 rounded-full px-3 py-2.5 text-sm font-medium text-muted-foreground transition-all duration-200 peer-checked:bg-primary peer-checked:text-primary-foreground peer-checked:shadow-sm">
                            <Building2 className="size-4" />
                            Landlord
                        </div>
                    </label>

                </div>
            </div>

            {/* Register Button */}
            <Button
                type="submit"
                size="lg"
                className="w-full rounded-full shadow-sm"
                disabled={pending}
            >
                {pending ? "Creating Account..." : "Create Account"}
            </Button>

            {/* Login Link */}
            <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                    href="/login"
                    className="font-medium text-primary transition-colors hover:text-primary/80"
                >
                    Login
                </Link>
            </p>

        </form>
    );
};

export default RegisterForm;