import {
    ArrowRight,
    FileCheck2,
    House,
    Search,
    Workflow,
} from "lucide-react";

const HowRentNestWorks = () => {
    const steps = [
        {
            number: "01",
            title: "Find Your Home",
            description:
                "Browse properties and use filters to find a place that fits your needs.",
            icon: Search,
        },
        {
            number: "02",
            title: "Request to Rent",
            description:
                "Submit a rental request directly to the property owner.",
            icon: FileCheck2,
        },
        {
            number: "03",
            title: "Move In",
            description:
                "Get approved, complete your payment, and get ready for your new home.",
            icon: House,
        },
    ];

    return (
        <section className="relative overflow-hidden border-t border-border/70 bg-background px-6 py-20 lg:px-12 xl:px-16">
            {/* Ambient glow accent */}
            <div
                className="pointer-events-none absolute right-0 top-0 h-96 w-96 -translate-y-1/3 translate-x-1/3 rounded-full bg-primary/10 blur-3xl"
                aria-hidden="true"
            />

            <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-12">
                {/* Header */}
                <div className="flex flex-col items-center gap-3 text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-card px-3 py-1.5 text-xs font-medium tracking-wide text-primary shadow-sm">
                        <Workflow className="size-3.5" />
                        How It Works
                    </div>

                    <h2 className="font-serif text-4xl tracking-[-0.035em] text-foreground sm:text-5xl">
                        How RentNest Works
                    </h2>

                    <p className="max-w-xl text-base leading-7 text-muted-foreground">
                        Finding and renting your next home is simple. Follow
                        three easy steps and get settled into your new place.
                    </p>
                </div>

                {/* Steps */}
                <div className="relative grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
                    {/* Connecting Line */}
                    <div className="absolute left-[16.66%] right-[16.66%] top-16 hidden border-t border-dashed border-primary/20 md:block" />

                    {steps.map((step) => {
                        const Icon = step.icon;

                        return (
                            <div
                                key={step.number}
                                className="group relative"
                            >
                                {/* Card */}
                                <div className="relative h-full overflow-hidden rounded-3xl border border-border/70 bg-card p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 hover:shadow-[0_28px_70px_-28px_hsl(var(--primary)/0.45)] lg:p-8">
                                    {/* Background decoration */}
                                    <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/5 transition-transform duration-500 group-hover:scale-150" />

                                    {/* Step number */}
                                    <div className="absolute right-6 top-5">
                                        <span className="font-serif text-5xl font-semibold tracking-tight text-primary/10 transition-colors duration-300 group-hover:text-primary/20">
                                            {step.number}
                                        </span>
                                    </div>

                                    {/* Icon */}
                                    <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 ring-4 ring-primary/10 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                                        <Icon className="size-6" strokeWidth={1.8} />
                                    </div>

                                    {/* Content */}
                                    <div className="relative z-10 mt-7">
                                        <h3 className="font-serif text-xl tracking-tight text-foreground">
                                            {step.title}
                                        </h3>

                                        <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
                                            {step.description}
                                        </p>
                                    </div>

                                    {/* Bottom accent */}
                                    <div className="absolute bottom-0 left-0 h-1 w-0 rounded-full bg-primary transition-all duration-500 group-hover:w-full" />
                                </div>

                                {/* Connector arrow */}
                                {step.number !== "03" && (
                                    <div className="absolute -right-5 top-12 z-20 hidden h-10 w-10 items-center justify-center rounded-full border border-primary/20 bg-background text-primary shadow-sm transition-transform duration-300 group-hover:translate-x-1 md:flex">
                                        <ArrowRight className="size-4" />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default HowRentNestWorks;