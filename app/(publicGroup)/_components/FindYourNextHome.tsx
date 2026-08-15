import { ArrowRight, Search } from "lucide-react";
import Link from "next/link";

const FindYourNextHome = () => {
    return (
        <section className="px-6 pb-16 pt-4 lg:px-12 lg:pb-24 lg:pt-8 xl:px-16">
            <div className="mx-auto max-w-7xl">
                <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-16 text-center text-primary-foreground sm:px-10 lg:py-20">
                    {/* Decorative Background */}
                    <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary-foreground/5" />

                    <div className="pointer-events-none absolute -bottom-28 -right-20 h-80 w-80 rounded-full bg-primary-foreground/10" />

                    {/* Content */}
                    <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center">
                        {/* Icon */}
                        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-foreground/10">
                            <Search className="size-7" />
                        </div>

                        <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-primary-foreground/70">
                            Start Your Search
                        </p>

                        <h2 className="font-serif text-4xl tracking-[-0.035em] sm:text-5xl lg:text-6xl">
                            Your next home is waiting.
                        </h2>

                        <p className="mt-5 max-w-lg text-base leading-7 text-primary-foreground/80">
                            Start exploring rental properties today and find a
                            place that feels like home.
                        </p>

                        <Link
                            href="/properties"
                            className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-background px-7 py-3.5 text-sm font-semibold text-foreground shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                        >
                            Explore Properties
                            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FindYourNextHome;