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
    UserPlus,
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
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border bg-background shadow-sm transition-colors group-hover:bg-muted">
                    <Icon className="h-5 w-5" />
                </div>

                <span className="font-mono text-sm text-muted-foreground">
                    {step}
                </span>
            </div>

            <h3 className="text-lg font-semibold tracking-tight">
                {title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {description}
            </p>
        </div>
    );
}

export default function HowItWorksPage() {
    return (
        <main className="min-h-screen bg-background">
            {/* Hero */}
            <section className="border-b">
                <div className="mx-auto max-w-6xl px-6 py-20 text-center sm:py-28">
                    <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border bg-muted/50 px-4 py-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4" />
                        Simple. Secure. Convenient.
                    </div>

                    <h1 className="mx-auto max-w-3xl font-serif text-4xl tracking-tight sm:text-5xl lg:text-6xl">
                        Renting a home,
                        <br />
                        <span className="text-muted-foreground">
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
                            className="rounded-full px-6"
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
                            className="rounded-full px-6"
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
                    <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                        How RentNest Works
                    </p>

                    <h2 className="mt-3 font-serif text-3xl tracking-tight sm:text-4xl">
                        Everything you need in one place
                    </h2>

                    <p className="mt-4 leading-7 text-muted-foreground">
                        Whether you&apos;re looking for a place to live or
                        managing properties, RentNest keeps the entire
                        rental journey organized and straightforward.
                    </p>
                </div>

                <div className="mt-16 grid gap-10 md:grid-cols-3">
                    <div className="rounded-2xl border p-7">
                        <Search className="h-6 w-6" />

                        <h3 className="mt-5 text-xl font-semibold">
                            Discover
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                            Explore available properties and find homes
                            that match your preferences.
                        </p>
                    </div>

                    <div className="rounded-2xl border p-7">
                        <FileText className="h-6 w-6" />

                        <h3 className="mt-5 text-xl font-semibold">
                            Connect
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                            Submit rental requests and communicate through
                            a simple, organized rental process.
                        </p>
                    </div>

                    <div className="rounded-2xl border p-7">
                        <KeyRound className="h-6 w-6" />

                        <h3 className="mt-5 text-xl font-semibold">
                            Move In
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                            Complete your payment, track your rental, and
                            move into your new home with confidence.
                        </p>
                    </div>
                </div>
            </section>

            {/* Tenant Journey */}
            <section className="border-y bg-muted/30">
                <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
                    <div className="max-w-2xl">
                        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                            For Tenants
                        </p>

                        <h2 className="mt-3 font-serif text-3xl tracking-tight sm:text-4xl">
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
            <section>
                <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
                    <div className="ml-auto max-w-2xl text-left lg:text-right">
                        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                            For Landlords
                        </p>

                        <h2 className="mt-3 font-serif text-3xl tracking-tight sm:text-4xl">
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
            <section className="border-y bg-muted/30">
                <div className="mx-auto max-w-5xl px-6 py-20 text-center sm:py-24">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border bg-background shadow-sm">
                        <ShieldCheck className="h-7 w-7" />
                    </div>

                    <h2 className="mt-6 font-serif text-3xl tracking-tight sm:text-4xl">
                        One platform for the entire rental journey
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl leading-7 text-muted-foreground">
                        From discovering a property to completing payments
                        and managing rentals, RentNest keeps everything
                        organized so tenants and landlords can focus on
                        what matters.
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm">
                        {[
                            "Property Discovery",
                            "Rental Requests",
                            "Secure Payments",
                            "Rental Management",
                            "Reviews",
                        ].map((feature) => (
                            <span
                                key={feature}
                                className="rounded-full border bg-background px-4 py-2"
                            >
                                {feature}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section>
                <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
                    <div className="rounded-3xl border bg-muted/30 px-6 py-14 text-center sm:px-12">
                        <h2 className="font-serif text-3xl tracking-tight sm:text-4xl">
                            Ready to find your next home?
                        </h2>

                        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                            Start exploring properties on RentNest and
                            take the first step toward your next home.
                        </p>

                        <div className="mt-8">
                            <Button
                                asChild
                                size="lg"
                                className="rounded-full px-7"
                            >
                                <Link href="/properties">
                                    Explore Properties
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
