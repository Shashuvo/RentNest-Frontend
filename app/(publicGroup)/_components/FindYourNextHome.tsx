import { ArrowRight, Search } from "lucide-react";
import Link from "next/link";

const FindYourNextHome = () => {
    return (
        <section className="px-6 pb-16 pt-4 lg:px-12 lg:pb-24 lg:pt-8 xl:px-16">
            <div className="mx-auto max-w-7xl">
                <div className="relative overflow-hidden rounded-[2.5rem] bg-primary px-6 py-20 text-center text-primary-foreground shadow-[0_40px_100px_-30px_hsl(var(--primary)/0.6)] sm:px-10 lg:py-24">
                    {/* Decorative Background */}
                    <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-primary-foreground/10 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-28 -right-20 h-96 w-96 rounded-full bg-primary-foreground/10 blur-3xl" />
                    <div className="pointer-events-none absolute left-1/2 top-0 h-full w-full -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary-foreground)/0.08),transparent_60%)]" />

                    {/* Content */}
                    <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center">
                        {/* Icon */}
                        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary-foreground/10 ring-1 ring-primary-foreground/15 backdrop-blur-sm">
                            <Search className="size-7" strokeWidth={1.8} />
                        </div>

                        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary-foreground/15 bg-primary-foreground/10 px-3.5 py-1.5 text-xs font-medium tracking-wide text-primary-foreground/90 backdrop-blur-sm">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />
                            Start Your Search
                        </div>

                        <h2 className="font-serif text-4xl tracking-[-0.035em] sm:text-5xl lg:text-6xl">
                            Your next{" "}
                            <span className="italic text-primary-foreground/90">home</span>{" "}
                            is waiting.
                        </h2>

                        <p className="mt-5 max-w-lg text-base leading-7 text-primary-foreground/80">
                            Start exploring rental properties today and find a
                            place that feels like home.
                        </p>

                        <Link
                            href="/properties"
                            className="group mt-9 inline-flex items-center gap-2 rounded-full bg-background px-8 py-4 text-sm font-semibold text-foreground shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
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