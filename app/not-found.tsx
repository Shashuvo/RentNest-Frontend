"use client"

import Link from "next/link"
import {
    House,
    ArrowLeft,
    Search,
    DoorOpen,
    Home as HomeIcon,
    Sparkles,
    Wind,
} from "lucide-react"

import { Button } from "@/components/ui/button"

export default function NotFound() {
    return (
        <div className="relative flex min-h-screen w-full items-center overflow-hidden bg-background px-6 lg:px-12 xl:px-16">
            {/* Ambient background glows */}
            <div
                className="pointer-events-none absolute -left-40 top-0 h-128 w-lg rounded-full bg-primary/10 blur-3xl"
                aria-hidden="true"
            />
            <div
                className="pointer-events-none absolute -right-48 bottom-0 h-104 w-104 rounded-full bg-accent/10 blur-3xl"
                aria-hidden="true"
            />
            <div
                className="pointer-events-none absolute left-1/2 top-1/2 h-160 w-160 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,hsl(var(--primary)/0.07),transparent_65%)]"
                aria-hidden="true"
            />

            {/* Scattered particles */}
            <span className="pointer-events-none absolute left-[18%] top-[22%] h-1.5 w-1.5 rounded-full bg-primary/40" aria-hidden="true" />
            <span className="pointer-events-none absolute left-[72%] top-[16%] h-1 w-1 rounded-full bg-primary/30" aria-hidden="true" />
            <span className="pointer-events-none absolute left-[85%] top-[62%] h-2 w-2 rounded-full bg-accent/30" aria-hidden="true" />
            <span className="pointer-events-none absolute left-[10%] top-[70%] h-1 w-1 rounded-full bg-primary/30" aria-hidden="true" />

            <div className="relative mx-auto grid w-full max-w-6xl items-center gap-16 lg:grid-cols-[0.95fr_1.05fr]">
                {/* Broken house visual */}
                <div className="relative flex h-112 items-center justify-center">
                    {/* Soft ground shadow */}
                    <div
                        className="pointer-events-none absolute bottom-6 h-8 w-72 rounded-full bg-foreground/5 blur-2xl"
                        aria-hidden="true"
                    />

                    {/* Outer rotating dashed ring */}
                    <div className="absolute size-88 animate-[spin_50s_linear_infinite] rounded-full border border-dashed border-primary/15 sm:size-104" />

                    {/* Secondary counter-rotating ring */}
                    <div className="absolute size-72 animate-[spin_35s_linear_infinite_reverse] rounded-full border border-dotted border-primary/10 sm:size-80" />

                    <div className="relative flex size-80 items-center justify-center rounded-full border border-primary/10 bg-linear-to-b from-primary/10 via-primary/5 to-transparent shadow-[0_0_140px_-15px_hsl(var(--primary)/0.4)] sm:size-88">
                        {/* Inner dashed ring */}
                        <div className="absolute inset-8 rounded-full border border-dashed border-primary/15" />

                        {/* Left half of the house, tilted and drifting away */}
                        <div className="absolute -translate-x-10 -translate-y-4 -rotate-6 overflow-hidden drop-shadow-2xl transition-transform duration-700 hover:-translate-x-14 hover:-rotate-12">
                            <House
                                className="size-40 text-primary sm:size-48"
                                strokeWidth={1.3}
                                style={{ clipPath: "inset(0 50% 0 0)" }}
                            />
                        </div>

                        {/* Right half of the house, tilted the other way */}
                        <div className="absolute translate-x-10 translate-y-6 rotate-6 overflow-hidden drop-shadow-2xl transition-transform duration-700 hover:translate-x-14 hover:rotate-12">
                            <House
                                className="size-40 text-primary/40 sm:size-48"
                                strokeWidth={1.3}
                                style={{ clipPath: "inset(0 0 0 50%)" }}
                            />
                        </div>

                        {/* Crack glow between the halves */}
                        <div
                            className="pointer-events-none absolute h-36 w-3 -rotate-12 bg-linear-to-b from-primary/0 via-primary/40 to-primary/0 blur-md"
                            aria-hidden="true"
                        />
                        <div
                            className="pointer-events-none absolute h-36 w-px -rotate-12 bg-linear-to-b from-primary/0 via-primary/60 to-primary/0"
                            aria-hidden="true"
                        />

                        {/* Floating debris pieces */}
                        <span className="absolute -right-4 top-9 flex size-11 rotate-12 items-center justify-center rounded-2xl bg-card text-primary/70 shadow-xl ring-1 ring-border/60">
                            <DoorOpen className="size-5" strokeWidth={1.75} />
                        </span>

                        <span className="absolute -left-5 bottom-16 flex size-9 -rotate-12 items-center justify-center rounded-full bg-card text-primary/50 shadow-lg ring-1 ring-border/60">
                            <HomeIcon className="size-4.5" strokeWidth={1.75} />
                        </span>

                        <span className="absolute right-6 bottom-0 flex size-8 rotate-6 items-center justify-center rounded-full bg-card text-accent-foreground shadow-lg ring-1 ring-border/60">
                            <Sparkles className="size-4" strokeWidth={1.75} />
                        </span>

                        <span className="absolute -left-2 top-4 flex size-7 -rotate-6 items-center justify-center rounded-full bg-card text-muted-foreground shadow-md ring-1 ring-border/60">
                            <Wind className="size-3.5" strokeWidth={1.75} />
                        </span>

                        {/* 404 chip floating near the crack */}
                        <span className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 rounded-full bg-primary px-5 py-1.5 text-sm font-semibold tracking-wide text-primary-foreground shadow-2xl shadow-primary/30">
                            404
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="flex flex-col items-start text-left">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-card px-3.5 py-1.5 text-xs font-medium tracking-wide text-primary shadow-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                        </span>
                        Page Not Found
                    </div>

                    <h1 className="font-serif text-5xl leading-[1.02] tracking-[-0.035em] text-foreground sm:text-6xl lg:text-[4rem]">
                        This home
                        <br />
                        <span className="bg-linear-to-r from-primary via-primary to-primary/50 bg-clip-text text-transparent">
                            doesn&apos;t exist.
                        </span>
                    </h1>

                    <p className="mt-6 max-w-md text-base leading-7 text-muted-foreground">
                        The page you&apos;re looking for may have been moved,
                        rented out, or never existed at all. Let&apos;s get
                        you back on solid ground.
                    </p>

                    <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                        <Button
                            asChild
                            size="lg"
                            className="group rounded-full px-7 shadow-lg shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30"
                        >
                            <Link href="/">
                                <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
                                Back to Home
                            </Link>
                        </Button>

                        <Button
                            asChild
                            variant="outline"
                            size="lg"
                            className="rounded-full border-primary/20 px-7 text-primary shadow-sm hover:bg-primary hover:text-primary-foreground"
                        >
                            <Link href="/properties">
                                <Search className="mr-2 h-4 w-4" />
                                Browse Properties
                            </Link>
                        </Button>
                    </div>

                    {/* Helpful links */}
                    <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border/60 pt-6 text-sm">
                        <span className="text-muted-foreground">Or try:</span>
                        <Link
                            href="/about"
                            className="font-medium text-foreground transition-colors hover:text-primary"
                        >
                            About Us
                        </Link>
                        <Link
                            href="/works"
                            className="font-medium text-foreground transition-colors hover:text-primary"
                        >
                            How It Works
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