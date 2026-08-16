import {
    House,
    ShieldCheck,
    Zap,
    CreditCard,
    Sparkles,
} from "lucide-react";

const Services = () => {
    const features = [
        {
            icon: House,
            title: "Wide Selection",
            description:
                "Explore rental properties across different locations and price ranges.",
        },
        {
            icon: ShieldCheck,
            title: "Secure & Reliable",
            description:
                "A straightforward rental experience with secure authentication and payments.",
        },
        {
            icon: Zap,
            title: "Easy Rental Requests",
            description:
                "Send and manage rental requests without unnecessary hassle.",
        },
        {
            icon: CreditCard,
            title: "Secure Payments",
            description:
                "Complete approved rental payments through a secure payment gateway.",
        },
    ];

    return (
        <section className="relative overflow-hidden border-t border-border/70 bg-card/40 px-6 py-20 lg:px-12 xl:px-16">
            {/* Ambient glow accent */}
            <div
                className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl"
                aria-hidden="true"
            />

            <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-12">
                {/* Section Header */}
                <div className="flex flex-col items-center gap-3 text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-card px-3 py-1.5 text-xs font-medium tracking-wide text-primary shadow-sm">
                        <Sparkles className="size-3.5" />
                        Why RentNest
                    </div>

                    <h2 className="font-serif text-4xl tracking-[-0.035em] text-foreground sm:text-5xl">
                        Why Choose RentNest?
                    </h2>

                    <p className="max-w-2xl text-base leading-7 text-muted-foreground">
                        Everything you need for a simpler, safer, and more
                        convenient rental experience.
                    </p>
                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature) => {
                        const Icon = feature.icon;

                        return (
                            <div
                                key={feature.title}
                                className="group relative overflow-hidden rounded-3xl border border-border/70 bg-background p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-[0_24px_60px_-24px_hsl(var(--primary)/0.4)] lg:p-7"
                            >
                                {/* Decorative Circle */}
                                <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-primary/5 transition-transform duration-500 group-hover:scale-150" />

                                {/* Icon */}
                                <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-4 ring-primary/5 transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-lg group-hover:shadow-primary/20 group-hover:ring-primary/10">
                                    <Icon
                                        className="size-6 transition-transform duration-300 group-hover:scale-110"
                                        strokeWidth={1.8}
                                    />
                                </div>

                                {/* Content */}
                                <div className="relative mt-6">
                                    <h3 className="font-serif text-lg tracking-tight text-foreground">
                                        {feature.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                                        {feature.description}
                                    </p>
                                </div>

                                {/* Bottom Accent */}
                                <div className="absolute bottom-0 left-0 h-1 w-0 rounded-full bg-primary transition-all duration-500 group-hover:w-full" />
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Services;