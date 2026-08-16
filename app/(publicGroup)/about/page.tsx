import Link from "next/link";
import {
    ArrowRight,
    Building2,
    CheckCircle2,
    Heart,
    ShieldCheck,
    Sparkles,
    Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const values = [
    {
        icon: Users,
        title: "Built for Everyone",
        description:
            "RentNest brings tenants and landlords together on one simple platform, making the rental journey easier for both sides.",
    },
    {
        icon: ShieldCheck,
        title: "Simple & Transparent",
        description:
            "From property discovery to rental requests and payments, we aim to keep every step clear and easy to understand.",
    },
    {
        icon: Heart,
        title: "People First",
        description:
            "Finding a home is personal. RentNest is designed to make the experience more convenient, organized, and less stressful.",
    },
];

const features = [
    "Discover available properties",
    "Submit and manage rental requests",
    "Track rental status",
    "Manage properties as a landlord",
    "Handle rental payments",
    "Share and discover property reviews",
];

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-background">
            {/* Hero */}
            <section className="relative overflow-hidden border-b border-border">
                {/* Ambient glow accent */}
                <div
                    className="pointer-events-none absolute -left-32 -top-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
                    aria-hidden="true"
                />
                <div
                    className="pointer-events-none absolute -right-40 top-20 h-80 w-80 rounded-full bg-accent/10 blur-3xl"
                    aria-hidden="true"
                />

                <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28">
                    <div className="max-w-3xl">
                        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-card px-3 py-1.5 text-xs font-medium tracking-wide text-primary shadow-sm">
                            <Building2 className="h-3.5 w-3.5" />
                            About RentNest
                        </div>

                        <h1 className="font-serif text-4xl leading-tight tracking-[-0.03em] text-foreground sm:text-5xl lg:text-6xl">
                            Making the rental journey
                            <br />
                            <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                                simpler for everyone.
                            </span>
                        </h1>

                        <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                            RentNest is a rental marketplace designed to
                            connect people looking for homes with landlords
                            offering properties, all through one convenient
                            platform.
                        </p>
                    </div>
                </div>
            </section>

            {/* Mission */}
            <section>
                <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:py-24 lg:grid-cols-2 lg:items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-card px-3 py-1.5 text-xs font-medium tracking-wide text-primary shadow-sm">
                            <Sparkles className="h-3.5 w-3.5" />
                            Our Mission
                        </div>

                        <h2 className="mt-4 font-serif text-3xl tracking-[-0.03em] text-foreground sm:text-4xl">
                            A better way to rent and manage properties
                        </h2>

                        <p className="mt-5 leading-7 text-muted-foreground">
                            Searching for a home and managing rental
                            properties can involve too many disconnected
                            steps. RentNest brings those experiences
                            together in one organized platform.
                        </p>

                        <p className="mt-4 leading-7 text-muted-foreground">
                            Our goal is simple: help tenants discover
                            suitable homes while giving landlords a
                            straightforward way to list properties, review
                            requests, and manage their rentals.
                        </p>
                    </div>

                    <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-sm sm:p-10">
                        <div
                            className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/5"
                            aria-hidden="true"
                        />

                        <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary ring-4 ring-primary/5">
                            <Building2 className="h-6 w-6" />
                        </div>

                        <h3 className="relative mt-6 font-serif text-xl tracking-tight text-foreground">
                            One platform. Two experiences.
                        </h3>

                        <div className="relative mt-6 space-y-4">
                            <div className="rounded-2xl border border-border bg-background p-5">
                                <p className="font-medium text-foreground">For Tenants</p>
                                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                                    Find properties, send rental requests,
                                    make payments, and manage your rental
                                    journey.
                                </p>
                            </div>

                            <div className="rounded-2xl border border-border bg-background p-5">
                                <p className="font-medium text-foreground">For Landlords</p>
                                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                                    List properties, review rental requests,
                                    and manage your properties and rentals.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* What RentNest Offers */}
            <section className="relative overflow-hidden border-y border-border bg-card/40">
                <div
                    className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl"
                    aria-hidden="true"
                />

                <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-24">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-card px-3 py-1.5 text-xs font-medium tracking-wide text-primary shadow-sm">
                            <ShieldCheck className="h-3.5 w-3.5" />
                            The Platform
                        </div>

                        <h2 className="mt-4 font-serif text-3xl tracking-[-0.03em] text-foreground sm:text-4xl">
                            Everything you need for renting
                        </h2>

                        <p className="mt-4 leading-7 text-muted-foreground">
                            RentNest brings the essential parts of the
                            rental experience together so users can spend
                            less time managing processes and more time
                            focusing on their next home or property.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature) => (
                            <div
                                key={feature}
                                className="flex items-center gap-3 rounded-2xl border border-border bg-background p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_16px_40px_-20px_hsl(var(--primary)/0.35)]"
                            >
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    <CheckCircle2 className="h-4 w-4" />
                                </span>

                                <span className="text-sm font-medium text-foreground">
                                    {feature}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="relative overflow-hidden">
                <div
                    className="pointer-events-none absolute right-0 top-0 h-96 w-96 -translate-y-1/3 translate-x-1/3 rounded-full bg-primary/10 blur-3xl"
                    aria-hidden="true"
                />

                <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-24">
                    <div className="mx-auto max-w-2xl text-center">
                        <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-card px-3 py-1.5 text-xs font-medium tracking-wide text-primary shadow-sm">
                            <Heart className="h-3.5 w-3.5" />
                            What We Believe
                        </div>

                        <h2 className="mt-4 font-serif text-3xl tracking-[-0.03em] text-foreground sm:text-4xl">
                            Designed around better experiences
                        </h2>

                        <p className="mt-4 leading-7 text-muted-foreground">
                            Every part of RentNest is built around making
                            property rental more accessible and manageable.
                        </p>
                    </div>

                    <div className="mt-14 grid gap-6 md:grid-cols-3">
                        {values.map((value) => {
                            const Icon = value.icon;

                            return (
                                <div
                                    key={value.title}
                                    className="group relative overflow-hidden rounded-3xl border border-border bg-card p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-[0_24px_60px_-24px_hsl(var(--primary)/0.4)]"
                                >
                                    <div
                                        className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-primary/5 transition-transform duration-500 group-hover:scale-150"
                                        aria-hidden="true"
                                    />

                                    <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary ring-4 ring-primary/5 transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:ring-primary/10">
                                        <Icon className="h-5 w-5" />
                                    </div>

                                    <h3 className="relative mt-6 font-serif text-lg tracking-tight text-foreground">
                                        {value.title}
                                    </h3>

                                    <p className="relative mt-2 text-sm leading-6 text-muted-foreground">
                                        {value.description}
                                    </p>

                                    <div className="absolute bottom-0 left-0 h-1 w-0 rounded-full bg-primary transition-all duration-500 group-hover:w-full" />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="border-t border-border bg-card/40 px-6 py-20 sm:py-28">
                <div className="mx-auto max-w-6xl">
                    <div className="relative overflow-hidden rounded-[2.5rem] bg-primary px-6 py-14 text-center text-primary-foreground shadow-[0_40px_100px_-30px_hsl(var(--primary)/0.6)] sm:px-12">
                        <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-primary-foreground/10 blur-3xl" />
                        <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-primary-foreground/10 blur-3xl" />

                        <div className="relative">
                            <h2 className="font-serif text-3xl tracking-[-0.03em] sm:text-4xl">
                                Find your place with RentNest
                            </h2>

                            <p className="mx-auto mt-4 max-w-xl leading-7 text-primary-foreground/80">
                                Explore available properties or create an
                                account and start your rental journey today.
                            </p>

                            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                                <Button
                                    asChild
                                    size="lg"
                                    className="group rounded-full bg-background px-7 text-foreground shadow-lg hover:bg-background/90"
                                >
                                    <Link href="/properties">
                                        Browse Properties
                                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                                    </Link>
                                </Button>

                                <Button
                                    asChild
                                    variant="outline"
                                    size="lg"
                                    className="rounded-full border-primary-foreground/30 bg-transparent px-7 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                                >
                                    <Link href="/register">
                                        Create an Account
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}