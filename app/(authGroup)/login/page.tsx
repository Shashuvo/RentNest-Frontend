import Link from "next/link"
import { House, ShieldCheck } from "lucide-react"

import LoginForm from "../_components/LoginForm";

const LoginPage = () => {
    return (
        <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background px-4">
            {/* Ambient background glows */}
            <div
                className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
                aria-hidden="true"
            />
            <div
                className="pointer-events-none absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-accent/10 blur-3xl"
                aria-hidden="true"
            />

            <div className="relative w-full max-w-md">
                {/* Logo */}
                <Link
                    href="/"
                    className="mb-8 flex items-center justify-center gap-2.5 font-semibold text-lg"
                >
                    <span className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm transition-transform duration-200 hover:scale-105">
                        <House className="size-4.5" strokeWidth={2.5} />
                    </span>
                    <span className="font-serif text-xl tracking-tight text-foreground">
                        Rent<span className="text-primary">Nest</span>
                    </span>
                </Link>

                <div className="space-y-6 rounded-3xl border border-border bg-card p-8 shadow-[0_24px_60px_-24px_hsl(var(--primary)/0.35)]">
                    <div className="space-y-2 text-center">
                        <div className="mx-auto mb-2 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-background px-3 py-1.5 text-xs font-medium tracking-wide text-primary">
                            <ShieldCheck className="size-3.5" />
                            Secure Login
                        </div>

                        <h1 className="font-serif text-3xl tracking-[-0.03em] text-foreground">
                            Welcome back.
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            Enter your credentials to access your account
                        </p>
                    </div>

                    <LoginForm />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;