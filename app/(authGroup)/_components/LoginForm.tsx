"use client"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { loginAction } from "../_actions/authAction";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

const LoginForm = () => {

    const [state, action, pending] = useActionState(loginAction, false);

    useEffect(() => {
        if (!state) return;

        if (state.success) {
            toast.success(state.message || "Login Successful.")
        }
        if (!state.success) {
            toast.error(state.message || "Login Failed.")
        }
    }, [state]);

    return (
        <form action={action} className="space-y-4">
            <input
                className="w-full rounded-md border bg-transparent px-3 py-2.5 text-sm outline-none transition focus:border-primary"
                type="email"
                name="email"
                placeholder="Email"
                required
            />

            <input
                className="w-full rounded-md border bg-transparent px-3 py-2.5 text-sm outline-none transition focus:border-primary"
                type="password"
                name="password"
                placeholder="Password"
                required
            />

            <Button type="submit" className="w-full">
                {
                    pending ? "Submitting..." : "Login"
                }
            </Button>

            <p className="text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link
                    href="/register"
                    className="font-medium text-foreground hover:underline"
                >
                    Register
                </Link>
            </p>
        </form>
    );
};

export default LoginForm;