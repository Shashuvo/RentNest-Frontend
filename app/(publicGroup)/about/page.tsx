
import Link from "next/link";
import {
    ArrowRight,
    Building2,
    CheckCircle2,
    Heart,
    ShieldCheck,
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
            <section className="border-b">
                <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
                    <div className="max-w-3xl">
                        <div className="mb-5 inline-flex items-center gap-2 rounded-full border bg-muted/50 px-4 py-2 text-sm text-muted-foreground">
                            <Building2 className="h-4 w-4" />
                            About RentNest
                        </div>

                        <h1 className="font-serif text-4xl leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                            Making the rental journey
                            <br />
                            <span className="text-muted-foreground">
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
                        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                            Our Mission
                        </p>

                        <h2 className="mt-3 font-serif text-3xl tracking-tight sm:text-4xl">
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

                    <div className="rounded-3xl border bg-muted/30 p-8 sm:p-10">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl border bg-background">
                            <Building2 className="h-6 w-6" />
                        </div>

                        <h3 className="mt-6 text-xl font-semibold">
                            One platform. Two experiences.
                        </h3>

                        <div className="mt-6 space-y-4">
                            <div className="rounded-2xl border bg-background p-5">
                                <p className="font-medium">For Tenants</p>
                                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                                    Find properties, send rental requests,
                                    make payments, and manage your rental
                                    journey.
                                </p>
                            </div>

                            <div className="rounded-2xl border bg-background p-5">
                                <p className="font-medium">For Landlords</p>
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
            <section className="border-y bg-muted/30">
                <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
                    <div className="max-w-2xl">
                        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                            The Platform
                        </p>

                        <h2 className="mt-3 font-serif text-3xl tracking-tight sm:text-4xl">
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
                                className="flex items-center gap-3 rounded-2xl border bg-background p-5"
                            >
                                <CheckCircle2 className="h-5 w-5 shrink-0" />

                                <span className="text-sm font-medium">
                                    {feature}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values */}
            <section>
                <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
                    <div className="mx-auto max-w-2xl text-center">
                        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                            What We Believe
                        </p>

                        <h2 className="mt-3 font-serif text-3xl tracking-tight sm:text-4xl">
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
                                    className="rounded-2xl border p-7"
                                >
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border bg-muted/50">
                                        <Icon className="h-5 w-5" />
                                    </div>

                                    <h3 className="mt-6 text-lg font-semibold">
                                        {value.title}
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                        {value.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="border-t bg-muted/30">
                <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
                    <div className="rounded-3xl border bg-background px-6 py-14 text-center sm:px-12">
                        <h2 className="font-serif text-3xl tracking-tight sm:text-4xl">
                            Find your place with RentNest
                        </h2>

                        <p className="mx-auto mt-4 max-w-xl leading-7 text-muted-foreground">
                            Explore available properties or create an
                            account and start your rental journey today.
                        </p>

                        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                            <Button
                                asChild
                                size="lg"
                                className="rounded-full px-7"
                            >
                                <Link href="/properties">
                                    Browse Properties
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>

                            <Button
                                asChild
                                variant="outline"
                                size="lg"
                                className="rounded-full px-7"
                            >
                                <Link href="/register">
                                    Create an Account
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

