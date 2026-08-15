import { ArrowRight, Building2, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const ForLandlords = () => {
    return (
        <section className="px-6 py-12 lg:px-12 lg:py-16 xl:px-16">
            <div className="mx-auto max-w-7xl">
                <div className="relative overflow-hidden rounded-3xl border border-primary/15 bg-primary/5 px-6 py-10 sm:px-10 lg:px-14 lg:py-12">
                    {/* Decorative Background */}
                    <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/5" />

                    <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                        {/* Content */}
                        <div className="max-w-2xl">
                            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <Building2 className="size-6" />
                            </div>

                            <p className="mb-2 text-sm font-medium uppercase tracking-[0.18em] text-primary">
                                For Landlords
                            </p>

                            <h2 className="font-serif text-3xl tracking-[-0.035em] text-foreground sm:text-4xl">
                                Have a property to rent?
                            </h2>

                            <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
                                List your property, manage rental requests, and
                                connect with potential tenants through RentNest.
                            </p>

                            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-5">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <CheckCircle2 className="size-4 text-primary" />
                                    Easy property listing
                                </div>

                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <CheckCircle2 className="size-4 text-primary" />
                                    Manage rental requests
                                </div>

                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <CheckCircle2 className="size-4 text-primary" />
                                    Connect with tenants
                                </div>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="shrink-0">
                            <Link
                                href="/dashboard/properties/new"
                                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:w-auto"
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