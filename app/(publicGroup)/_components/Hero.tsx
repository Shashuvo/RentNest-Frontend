"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowRight, ShieldCheck, Star, Users } from "lucide-react"

import { Button } from "@/components/ui/button"

const trustStats = [
    { icon: ShieldCheck, value: "2,400+", label: "Verified homes" },
    { icon: Users, value: "15k+", label: "Happy tenants" },
    { icon: Star, value: "4.9", label: "Average rating" },
]

export default function Hero() {
    const router = useRouter()

    return (
        <div className="relative overflow-hidden">
            {/* Ambient background glow */}
            <div
                className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
                aria-hidden="true"
            />
            <div
                className="pointer-events-none absolute -right-40 top-40 h-80 w-80 rounded-full bg-accent/10 blur-3xl"
                aria-hidden="true"
            />

            <section
                id="top"
                className="relative grid w-full gap-8 px-6 pb-12 pt-6 lg:grid-cols-[1.4fr_0.94fr] lg:items-center lg:px-12 lg:pb-16 lg:pt-10 xl:px-16"
            >
                <div className="relative z-10 flex flex-col items-start">
                    <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-card px-3 py-1.5 text-xs font-medium tracking-wide text-primary shadow-sm">
                        <ShieldCheck aria-hidden="true" className="size-3.5" />
                        Verified homes, made simple
                    </div>

                    <h1 className="max-w-xl font-serif text-4xl leading-[0.98] tracking-[-0.045em] text-foreground sm:text-5xl lg:text-[4.5rem]">
                        Home is closer than{" "}
                        <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                            you think.
                        </span>
                    </h1>

                    <p className="mt-7 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg">
                        Discover verified rental properties that match your lifestyle, budget, and preferred location.
                    </p>

                    <div className="mt-9 flex flex-wrap items-center gap-3">
                        <Button
                            size="lg"
                            className="group rounded-full px-6 shadow-sm"
                            onClick={() => router.push("/properties")}
                        >
                            Browse properties
                            <ArrowRight
                                data-icon="inline-end"
                                className="transition-transform duration-200 group-hover:translate-x-0.5"
                            />
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            className="rounded-full border-primary/20 bg-transparent px-6 text-primary hover:bg-primary hover:text-primary-foreground"
                        >
                            List your property
                        </Button>
                    </div>

                    {/* Trust stats */}
                    <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-border/60 pt-6">
                        {trustStats.map((stat) => {
                            const Icon = stat.icon
                            return (
                                <div key={stat.label} className="group flex items-center gap-2.5">
                                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                                        <Icon className="size-4" />
                                    </span>
                                    <div>
                                        <p className="font-serif text-lg leading-none text-foreground">
                                            {stat.value}
                                        </p>
                                        <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="relative h-96 lg:h-128">
                    <div className="absolute -right-16 top-12 h-72 w-72 rounded-full bg-accent/20 blur-3xl" aria-hidden="true" />
                    <div className="absolute -left-8 bottom-12 h-40 w-40 rounded-full bg-primary/15 blur-3xl" aria-hidden="true" />

                    <div className="relative h-full overflow-hidden rounded-[2rem] bg-muted shadow-2xl shadow-primary/10 ring-1 ring-border/50">
                        <Image
                            src="/modern-rental-home.png"
                            alt="Modern townhouse with a leafy courtyard"
                            fill
                            priority
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 52vw"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-foreground/45 via-transparent to-transparent" />

                        {/* Bottom caption, no fake listing data */}
                        <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-background/20 bg-foreground/30 p-3.5 text-background backdrop-blur-md sm:inset-x-5 sm:bottom-5 sm:p-4">
                            <p className="font-serif text-base leading-snug sm:text-lg">
                                Every home, thoroughly verified.
                            </p>
                            <p className="mt-1 text-xs text-background/80 sm:text-sm">
                                Real listings. Real landlords. Real peace of mind.
                            </p>
                        </div>
                    </div>

                    <div className="absolute right-3 top-3 flex items-center gap-2.5 rounded-2xl border border-border bg-card/95 p-2.5 shadow-xl backdrop-blur-sm sm:right-4 sm:top-4 sm:gap-3 sm:p-3">
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary sm:size-10">
                            <ShieldCheck aria-hidden="true" className="size-4 sm:size-5" />
                        </span>
                        <span>
                            <strong className="block text-xs text-foreground sm:text-sm">100% verified</strong>
                            <span className="text-[11px] text-muted-foreground sm:text-xs">Every home, checked</span>
                        </span>
                    </div>

                    <div className="absolute bottom-24 left-3 flex items-center gap-2.5 rounded-2xl border border-border bg-card/95 p-2.5 shadow-xl backdrop-blur-sm sm:bottom-28 sm:-left-6 sm:gap-3 sm:p-3">
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary sm:size-10">
                            <Star aria-hidden="true" className="size-4 fill-primary sm:size-5" />
                        </span>
                        <span>
                            <strong className="block text-xs text-foreground sm:text-sm">4.9 rating</strong>
                            <span className="text-[11px] text-muted-foreground sm:text-xs">From 15k+ tenants</span>
                        </span>
                    </div>
                </div>
            </section>
        </div>
    )
}