import { ArrowRight, Building2, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const ForLandlords = () => {
    const benefits = [
        "Easy property listing",
        "Manage rental requests",
        "Connect with tenants",
    ];

    return (
        <section className="px-6 py-14 lg:px-12 lg:py-20 xl:px-16">
            <div className="mx-auto max-w-7xl">
                <div className="relative overflow-hidden rounded-[2rem] border border-primary/15 bg-primary/5 px-6 py-10 shadow-[0_28px_70px_-28px_hsl(var(--primary)/0.35)] sm:px-10 lg:px-14 lg:py-14">
                    {/* Decorative Background */}
                    <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-primary/5 blur-3xl" />

                    <div className="relative z-10 flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
                        {/* Content */}
                        <div className="max-w-2xl">
                            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/20 ring-4 ring-primary/10">
                                <Building2 className="size-6" strokeWidth={1.8} />
                            </div>

                            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-card px-3 py-1.5 text-xs font-medium tracking-wide text-primary shadow-sm">
                                <Building2 className="size-3.5" />
                                For Landlords
                            </div>

                            <h2 className="font-serif text-3xl tracking-[-0.035em] text-foreground sm:text-4xl">
                                Have a property to rent?
                            </h2>

                            <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
                                List your property, manage rental requests, and
                                connect with potential tenants through RentNest.
                            </p>

                            <div className="mt-6 flex flex-wrap gap-2.5">
                                {benefits.map((benefit) => (
                                    <div
                                        key={benefit}
                                        className="flex items-center gap-1.5 rounded-full border border-primary/15 bg-card px-3 py-1.5 text-xs font-medium text-foreground shadow-sm"
                                    >
                                        <CheckCircle2 className="size-3.5 text-primary" />
                                        {benefit}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="shrink-0">
                            <Link
                                href="/dashboard/properties/new"
                                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30 sm:w-auto"
                            >
                                List Your Property
                                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ForLandlords;