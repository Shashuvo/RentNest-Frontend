"use client";

import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { loginAction } from "../_actions/authAction";
import { useSearchParams } from "next/navigation";

const inputClass =
    "h-11 w-full rounded-full border border-border bg-background pl-10 pr-4 text-sm shadow-sm outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary";

const fieldLabelClass =
    "mb-2 block text-[11px] font-medium uppercase tracking-wider text-muted-foreground";

const LoginForm = () => {
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirectTo") ?? ""
    const [state, action, pending] = useActionState(loginAction.bind(null, redirectTo), false)
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (!state) return;

        if (state.success) {
            toast.success(
                state.message || "Login Successful."
            );
        } else {
            toast.error(
                state.message || "Login Failed."
            );
        }
    }, [state]);

    return (
        <form action={action} className="space-y-5">
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
                        required
                    />
                </div>
            </div>

            {/* Password */}
            <div>
                <div className="mb-2 flex items-center justify-between">
                    <label htmlFor="password" className={fieldLabelClass + " mb-0"}>
                        Password
                    </label>
                    <Link
                        href="/forgot-password"
                        className="text-xs font-medium text-primary transition-colors hover:text-primary/80"
                    >
                        Forgot password?
                    </Link>
                </div>
                <div className="relative">
                    <Lock className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                        id="password"
                        className={`${inputClass} pr-11`}
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="••••••••"
                        required
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

            <Button
                type="submit"
                size="lg"
                className="w-full rounded-full shadow-sm"
                disabled={pending}
            >
                {pending ? "Signing in..." : "Login"}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link
                    href="/register"
                    className="font-medium text-primary transition-colors hover:text-primary/80"
                >
                    Register
                </Link>
            </p>
        </form>
    );
};

export default LoginForm;