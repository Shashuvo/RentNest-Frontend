import {
    ArrowRight,
    CheckCircle2,
    ClipboardCheck,
    FileText,
    Home,
    KeyRound,
    MessageSquare,
    Search,
    ShieldCheck,
    Sparkles,
    UserPlus,
    Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const tenantSteps = [
    {
        step: "01",
        icon: Search,
        title: "Find Your Home",
        description:
            "Browse available properties using filters for location, price, bedrooms, and property type to find a home that fits your needs.",
    },
    {
        step: "02",
        icon: FileText,
        title: "Send a Rental Request",
        description:
            "Found the right property? Submit a rental request directly to the landlord with just a few clicks.",
    },
    {
        step: "03",
        icon: ClipboardCheck,
        title: "Wait for Approval",
        description:
            "The landlord reviews your request and decides whether to approve or reject it.",
    },
    {
        step: "04",
        icon: ShieldCheck,
        title: "Make Your Payment",
        description:
            "Once approved, complete your payment securely and keep track of your rental status from your dashboard.",
    },
    {
        step: "05",
        icon: KeyRound,
        title: "Move In",
        description:
            "After completing the required steps, you're ready to move into your new home and enjoy your rental experience.",
    },
];

const landlordSteps = [
    {
        step: "01",
        icon: UserPlus,
        title: "Create Your Account",
        description:
            "Register as a landlord and set up your profile to start managing your rental properties.",
    },
    {
        step: "02",
        icon: Home,
        title: "List Your Property",
        description:
            "Add your property details, location, pricing, amenities, and images so potential tenants can discover it.",
    },
    {
        step: "03",
        icon: MessageSquare,
        title: "Review Requests",
        description:
            "Receive rental requests from interested tenants and review their information from your landlord dashboard.",
    },
    {
        step: "04",
        icon: ClipboardCheck,
        title: "Approve a Tenant",
        description:
            "Choose the right tenant and approve their rental request directly from your dashboard.",
    },
    {
        step: "05",
        icon: KeyRound,
        title: "Manage Your Rental",
        description:
            "Track rental status, payments, and property activity from one centralized dashboard.",
    },
];

function StepCard({
    step,
    icon: Icon,
    title,
    description,
}: {
    step: string;
    icon: React.ElementType;
    title: string;
    description: string;
}) {
    return (
        <div className="group relative">
            <div className="mb-5 flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary ring-4 ring-primary/5 transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:ring-primary/10">
                    <Icon className="h-5 w-5" />
                </div>

                <span className="font-serif text-2xl text-primary/15 transition-colors duration-300 group-hover:text-primary/25">
                    {step}
                </span>
            </div>

            <h3 className="font-serif text-lg tracking-tight text-foreground">
                {title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {description}
            </p>

            <div className="mt-4 h-1 w-8 rounded-full bg-primary/20 transition-all duration-300 group-hover:w-12 group-hover:bg-primary/40" />
        </div>
    );
}

export default function HowItWorksPage() {
    return (
        <main className="min-h-screen bg-background">
            {/* Hero */}
            <section className="relative overflow-hidden border-b border-border">
                <div
                    className="pointer-events-none absolute -left-32 -top-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
                    aria-hidden="true"
                />
                <div
                    className="pointer-events-none absolute -right-40 top-20 h-80 w-80 rounded-full bg-accent/10 blur-3xl"
                    aria-hidden="true"
                />

                <div className="relative mx-auto max-w-6xl px-6 py-20 text-center sm:py-28">
                    <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-card px-3 py-1.5 text-xs font-medium tracking-wide text-primary shadow-sm">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Simple. Secure. Convenient.
                    </div>

                    <h1 className="mx-auto max-w-3xl font-serif text-4xl tracking-[-0.03em] text-foreground sm:text-5xl lg:text-6xl">
                        Renting a home,
                        <br />
                        <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                            made simple.
                        </span>
                    </h1>

                    <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                        RentNest makes it easier for tenants to find their
                        next home and for landlords to manage their
                        properties — all from one platform.
                    </p>

                    <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                        <Button
                            asChild
                            size="lg"
                            className="group rounded-full px-6 shadow-sm"
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
                            className="rounded-full border-primary/20 px-6 text-primary hover:bg-primary hover:text-primary-foreground"
                        >
                            <Link href="/register">
                                Get Started
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Overview */}
            <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
                <div className="mx-auto max-w-2xl text-center">
                    <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-primary/15 bg-card px-3 py-1.5 text-xs font-medium tracking-wide text-primary shadow-sm">
                        <Sparkles className="h-3.5 w-3.5" />
                        How RentNest Works
                    </div>

                    <h2 className="mt-4 font-serif text-3xl tracking-[-0.03em] text-foreground sm:text-4xl">
                        Everything you need in one place
                    </h2>

                    <p className="mt-4 leading-7 text-muted-foreground">
                        Whether you&apos;re looking for a place to live or
                        managing properties, RentNest keeps the entire
                        rental journey organized and straightforward.
                    </p>
                </div>

                <div className="mt-16 grid gap-6 md:grid-cols-3">
                    {[
                        {
                            icon: Search,
                            title: "Discover",
                            description:
                                "Explore available properties and find homes that match your preferences.",
                        },
                        {
                            icon: FileText,
                            title: "Connect",
                            description:
                                "Submit rental requests and communicate through a simple, organized rental process.",
                        },
                        {
                            icon: KeyRound,
                            title: "Move In",
                            description:
                                "Complete your payment, track your rental, and move into your new home with confidence.",
                        },
                    ].map((item) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={item.title}
                                className="group relative overflow-hidden rounded-3xl border border-border bg-card p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-[0_24px_60px_-24px_hsl(var(--primary)/0.4)]"
                            >
                                <div
                                    className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-primary/5 transition-transform duration-500 group-hover:scale-150"
                                    aria-hidden="true"
                                />

                                <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary ring-4 ring-primary/5 transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:ring-primary/10">
                                    <Icon className="h-6 w-6" strokeWidth={1.8} />
                                </div>

                                <h3 className="relative mt-6 font-serif text-xl tracking-tight text-foreground">
                                    {item.title}
                                </h3>

                                <p className="relative mt-2 text-sm leading-6 text-muted-foreground">
                                    {item.description}
                                </p>

                                <div className="absolute bottom-0 left-0 h-1 w-0 rounded-full bg-primary transition-all duration-500 group-hover:w-full" />
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Tenant Journey */}
            <section className="relative overflow-hidden border-y border-border bg-card/40">
                <div
                    className="pointer-events-none absolute -left-24 top-0 h-80 w-80 rounded-full bg-primary/10 blur-3xl"
                    aria-hidden="true"
                />

                <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-24">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-card px-3 py-1.5 text-xs font-medium tracking-wide text-primary shadow-sm">
                            <Users className="h-3.5 w-3.5" />
                            For Tenants
                        </div>

                        <h2 className="mt-4 font-serif text-3xl tracking-[-0.03em] text-foreground sm:text-4xl">
                            From search to move-in
                        </h2>

                        <p className="mt-4 leading-7 text-muted-foreground">
                            Finding your next home shouldn&apos;t be complicated.
                            RentNest guides you through every important step.
                        </p>
                    </div>

                    <div className="mt-14 grid gap-x-12 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
                        {tenantSteps.map((item) => (
                            <StepCard
                                key={item.step}
                                {...item}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Landlord Journey */}
            <section className="relative overflow-hidden">
                <div
                    className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-accent/10 blur-3xl"
                    aria-hidden="true"
                />

                <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-24">
                    <div className="ml-auto max-w-2xl text-left lg:text-right">
                        <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-card px-3 py-1.5 text-xs font-medium tracking-wide text-primary shadow-sm lg:ml-auto">
                            <Home className="h-3.5 w-3.5" />
                            For Landlords
                        </div>

                        <h2 className="mt-4 font-serif text-3xl tracking-[-0.03em] text-foreground sm:text-4xl">
                            Manage rentals with confidence
                        </h2>

                        <p className="mt-4 leading-7 text-muted-foreground">
                            RentNest gives landlords the tools they need to
                            list properties, review tenants, and manage
                            rental activity efficiently.
                        </p>
                    </div>

                    <div className="mt-14 grid gap-x-12 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
                        {landlordSteps.map((item) => (
                            <StepCard
                                key={item.step}
                                {...item}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Trust Section */}
            <section className="relative overflow-hidden border-y border-border bg-card/40">
                <div
                    className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl"
                    aria-hidden="true"
                />

                <div className="relative mx-auto max-w-5xl px-6 py-20 text-center sm:py-24">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary ring-4 ring-primary/5">
                        <ShieldCheck className="h-7 w-7" />
                    </div>

                    <h2 className="mt-6 font-serif text-3xl tracking-[-0.03em] text-foreground sm:text-4xl">
                        One platform for the entire rental journey
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl leading-7 text-muted-foreground">
                        From discovering a property to completing payments
                        and managing rentals, RentNest keeps everything
                        organized so tenants and landlords can focus on
                        what matters.
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-2.5 text-sm">
                        {[
                            "Property Discovery",
                            "Rental Requests",
                            "Secure Payments",
                            "Rental Management",
                            "Reviews",
                        ].map((feature) => (
                            <span
                                key={feature}
                                className="rounded-full border border-primary/15 bg-card px-4 py-2 text-foreground shadow-sm"
                            >
                                {feature}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="px-6 py-20 sm:py-28">
                <div className="mx-auto max-w-6xl">
                    <div className="relative overflow-hidden rounded-[2.5rem] bg-primary px-6 py-14 text-center text-primary-foreground shadow-[0_40px_100px_-30px_hsl(var(--primary)/0.6)] sm:px-12">
                        <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-primary-foreground/10 blur-3xl" />
                        <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-primary-foreground/10 blur-3xl" />

                        <div className="relative">
                            <h2 className="font-serif text-3xl tracking-[-0.03em] sm:text-4xl">
                                Ready to find your next home?
                            </h2>

                            <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">
                                Start exploring properties on RentNest and
                                take the first step toward your next home.
                            </p>

                            <div className="mt-8">
                                <Button
                                    asChild
                                    size="lg"
                                    className="group rounded-full bg-background px-7 text-foreground shadow-lg hover:bg-background/90"
                                >
                                    <Link href="/properties">
                                        Explore Properties
                                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
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