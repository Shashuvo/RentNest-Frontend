"use client"

import { useEffect } from "react"
import Link from "next/link"
import {
    AlertTriangle,
    House,
    RefreshCcw,
    Wrench,
    Zap,
} from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="relative flex min-h-screen w-full items-center overflow-hidden bg-background px-6 lg:px-12 xl:px-16">
            {/* Ambient background glows */}
            <div
                className="pointer-events-none absolute -left-40 top-0 h-[32rem] w-[32rem] rounded-full bg-destructive/10 blur-3xl"
                aria-hidden="true"
            />
            <div
                className="pointer-events-none absolute -right-48 bottom-0 h-[26rem] w-[26rem] rounded-full bg-primary/10 blur-3xl"
                aria-hidden="true"
            />
            <div
                className="pointer-events-none absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,hsl(var(--destructive)/0.06),transparent_65%)]"
                aria-hidden="true"
            />

            {/* Scattered particles */}
            <span className="pointer-events-none absolute left-[18%] top-[22%] h-1.5 w-1.5 rounded-full bg-destructive/40" aria-hidden="true" />
            <span className="pointer-events-none absolute left-[72%] top-[16%] h-1 w-1 rounded-full bg-primary/30" aria-hidden="true" />
            <span className="pointer-events-none absolute left-[85%] top-[62%] h-2 w-2 rounded-full bg-destructive/25" aria-hidden="true" />
            <span className="pointer-events-none absolute left-[10%] top-[70%] h-1 w-1 rounded-full bg-primary/30" aria-hidden="true" />

            <div className="relative mx-auto grid w-full max-w-6xl items-center gap-16 lg:grid-cols-[0.95fr_1.05fr]">
                {/* Broken house visual */}
                <div className="relative flex h-[28rem] items-center justify-center">
                    {/* Soft ground shadow */}
                    <div
                        className="pointer-events-none absolute bottom-6 h-8 w-72 rounded-full bg-foreground/5 blur-2xl"
                        aria-hidden="true"
                    />

                    {/* Outer rotating dashed ring */}
                    <div className="absolute size-88 animate-[spin_50s_linear_infinite] rounded-full border border-dashed border-destructive/15 sm:size-[26rem]" />

                    {/* Secondary counter-rotating ring */}
                    <div className="absolute size-72 animate-[spin_35s_linear_infinite_reverse] rounded-full border border-dotted border-destructive/10 sm:size-80" />

                    <div className="relative flex size-80 items-center justify-center rounded-full border border-destructive/10 bg-gradient-to-b from-destructive/10 via-destructive/5 to-transparent shadow-[0_0_140px_-15px_hsl(var(--destructive)/0.35)] sm:size-88">
                        {/* Inner dashed ring */}
                        <div className="absolute inset-8 rounded-full border border-dashed border-destructive/15" />

                        {/* Central house, shaking / distressed */}
                        <div className="relative flex size-24 items-center justify-center rounded-3xl bg-card shadow-2xl ring-1 ring-destructive/15 sm:size-28">
                            <House
                                className="size-12 text-destructive sm:size-14"
                                strokeWidth={1.4}
                            />

                            {/* Crack line across the house */}
                            <svg
                                className="pointer-events-none absolute inset-0 h-full w-full"
                                viewBox="0 0 100 100"
                                aria-hidden="true"
                            >
                                <path
                                    d="M 30 10 L 45 40 L 35 50 L 60 90"
                                    fill="none"
                                    stroke="hsl(var(--destructive) / 0.5)"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </div>

                        {/* Sparks / warning bolt */}
                        <span className="absolute -right-3 top-10 flex size-11 rotate-12 animate-pulse items-center justify-center rounded-2xl bg-card text-destructive shadow-xl ring-1 ring-border/60">
                            <Zap className="size-5" strokeWidth={1.75} />
                        </span>

                        <span className="absolute -left-5 bottom-16 flex size-9 -rotate-12 items-center justify-center rounded-full bg-card text-destructive/70 shadow-lg ring-1 ring-border/60">
                            <AlertTriangle className="size-4.5" strokeWidth={1.75} />
                        </span>

                        <span className="absolute right-6 bottom-0 flex size-8 rotate-6 items-center justify-center rounded-full bg-card text-muted-foreground shadow-lg ring-1 ring-border/60">
                            <Wrench className="size-4" strokeWidth={1.75} />
                        </span>

                        {/* Error chip */}
                        <span className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 rounded-full bg-destructive px-5 py-1.5 text-sm font-semibold tracking-wide text-destructive-foreground shadow-2xl shadow-destructive/30">
                            Error
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="flex flex-col items-start text-left">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-destructive/15 bg-card px-3.5 py-1.5 text-xs font-medium tracking-wide text-destructive shadow-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive/60" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-destructive" />
                        </span>
                        Something Went Wrong
                    </div>

                    <h1 className="font-serif text-5xl leading-[1.02] tracking-[-0.035em] text-foreground sm:text-6xl lg:text-[4rem]">
                        We hit a
                        <br />
                        <span className="bg-linear-to-r from-destructive via-destructive to-destructive/50 bg-clip-text text-transparent">
                            rough patch.
                        </span>
                    </h1>

                    <p className="mt-6 max-w-md text-base leading-7 text-muted-foreground">
                        An unexpected error occurred while loading this page.
                        Try refreshing, or head back to somewhere familiar.
                    </p>

                    {error?.message && (
                        <div className="mt-4 w-full max-w-md rounded-xl border border-destructive/15 bg-destructive/5 px-4 py-3">
                            <p className="truncate font-mono text-xs text-destructive/80">
                                {error.message}
                            </p>
                            {error.digest && (
                                <p className="mt-1 text-[11px] text-muted-foreground">
                                    Digest: {error.digest}
                                </p>
                            )}
                        </div>
                    )}

                    <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                        <Button
                            size="lg"
                            onClick={() => reset()}
                            className="group rounded-full bg-destructive px-7 text-destructive-foreground shadow-lg shadow-destructive/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-destructive/90 hover:shadow-xl hover:shadow-destructive/30"
                        >
                            <RefreshCcw className="mr-2 h-4 w-4 transition-transform duration-500 group-hover:rotate-180" />
                            Try Again
                        </Button>

                        <Button
                            asChild
                            variant="outline"
                            size="lg"
                            className="rounded-full border-primary/20 px-7 text-primary shadow-sm hover:bg-primary hover:text-primary-foreground"
                        >
                            <Link href="/">
                                <House className="mr-2 h-4 w-4" />
                                Back to Home
                            </Link>
                        </Button>
                    </div>

                    {/* Helpful links */}
                    <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border/60 pt-6 text-sm">
                        <span className="text-muted-foreground">Or try:</span>
                        <Link
                            href="/properties"
                            className="font-medium text-foreground transition-colors hover:text-primary"
                        >
                            Browse Properties
                        </Link>
                        <Link
                            href="/about"
                            className="font-medium text-foreground transition-colors hover:text-primary"
                        >
                            About Us
                        </Link>
                        <Link
                            href="/login"
                            className="font-medium text-foreground transition-colors hover:text-primary"
                        >
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}