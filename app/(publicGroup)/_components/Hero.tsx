"use client"

import Image from "next/image"
import { useState } from "react"
import { ArrowRight, Heart, MapPin, Search, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const properties = [
    { value: "any", label: "Any property" },
    { value: "apartment", label: "Apartment" },
    { value: "house", label: "House" },
    { value: "townhome", label: "Townhome" },
]

export default function Page() {
    const [location, setLocation] = useState("")
    const [propertyType, setPropertyType] = useState("any")
    const [priceRange, setPriceRange] = useState("any")
    const [searchMessage, setSearchMessage] = useState("")

    function handleSearch(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const place = location.trim() || "your preferred area"
        setSearchMessage(`Showing ${propertyType === "any" ? "homes" : properties.find((item) => item.value === propertyType)?.label.toLowerCase()} in ${place}.`)
    }

    return (
        <main className="min-h-screen overflow-hidden bg-background">
            <section id="top" className="grid w-full gap-8 px-6 pb-12 pt-6 lg:grid-cols-[1.4fr_0.94fr] lg:items-center lg:px-12 lg:pb-16 lg:pt-10 xl:px-16">
                <div className="relative z-10 flex flex-col items-start">
                    <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-card px-3 py-1.5 text-xs font-medium tracking-wide text-primary shadow-sm">
                        <ShieldCheck aria-hidden="true" className="size-3.5" />
                        Verified homes, made simple
                    </div>
                    <h1 className="max-w-xl font-serif text-4xl leading-[0.98] tracking-[-0.045em] text-foreground sm:text-5xl lg:text-[4.5rem]">
                        Home is closer than <span className="text-primary">you think.</span>
                    </h1>
                    <p className="mt-7 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg">
                        Discover verified rental properties that match your lifestyle, budget, and preferred location.
                    </p>

                    <form onSubmit={handleSearch} className="mt-9 w-full max-w-2xl rounded-2xl border border-border bg-card p-2 shadow-[0_16px_50px_-22px_hsl(var(--primary)/0.35)]" aria-label="Search rental properties">
                        <div className="grid gap-1 md:grid-cols-[1.25fr_1fr_1fr_auto] md:items-center">
                            <label className="flex min-h-14 items-center gap-3 rounded-xl px-3 transition-colors focus-within:bg-muted">
                                <MapPin aria-hidden="true" className="size-4 shrink-0 text-primary" />
                                <span className="flex min-w-0 flex-col">
                                    <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Location</span>
                                    <Input value={location} onChange={(event) => setLocation(event.target.value)} placeholder="City or neighborhood" className="h-6 border-0 bg-transparent p-0 text-sm shadow-none focus-visible:ring-0" />
                                </span>
                            </label>
                            <label className="flex min-h-14 flex-col justify-center rounded-xl px-3 transition-colors focus-within:bg-muted">
                                <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Property type</span>
                                <Select value={propertyType} onValueChange={(value) => setPropertyType(value ?? "any")}>
                                    <SelectTrigger className="h-6 w-full border-0 bg-transparent p-0 text-sm shadow-none focus-visible:ring-0"><SelectValue placeholder="Any property" /></SelectTrigger>
                                    <SelectContent className="p-2">{properties.map((property) => <SelectItem key={property.value} value={property.value}>{property.label}</SelectItem>)}</SelectContent>
                                </Select>
                            </label>
                            <label className="flex min-h-14 flex-col justify-center rounded-xl px-3 transition-colors focus-within:bg-muted">
                                <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Price range</span>
                                <Select value={priceRange} onValueChange={(value) => setPriceRange(value ?? "any")}>
                                    <SelectTrigger className="h-6 w-full border-0 bg-transparent p-0 text-sm shadow-none focus-visible:ring-0"><SelectValue placeholder="Any budget" /></SelectTrigger>
                                    <SelectContent className="p-2">
                                        <SelectItem value="any">Any budget</SelectItem><SelectItem value="under-1500">Under $1,500</SelectItem><SelectItem value="1500-2500">$1,500 – $2,500</SelectItem><SelectItem value="over-2500">$2,500+</SelectItem>
                                    </SelectContent>
                                </Select>
                            </label>
                            <Button type="submit" size="lg" className="h-12 rounded-xl px-5"><Search data-icon="inline-start" />Search</Button>
                        </div>
                    </form>
                    <div className="mt-3 min-h-5 text-sm text-primary" aria-live="polite">{searchMessage}</div>

                    <div className="mt-8 flex flex-wrap items-center gap-3">
                        <Button size="lg" className="rounded-full px-5">Browse properties <ArrowRight data-icon="inline-end" /></Button>
                        <Button variant="outline" size="lg" className="rounded-full border-primary/20 bg-transparent px-5 text-primary hover:bg-primary hover:text-primary-foreground">List your property</Button>
                    </div>
                </div>

                <div className="relative h-96 lg:h-128">
                    <div className="absolute -right-16 top-12 h-72 w-72 rounded-full bg-accent/20 blur-3xl" aria-hidden="true" />
                    <div className="relative h-full overflow-hidden rounded-[2rem] bg-muted shadow-2xl shadow-primary/10">
                        <Image src="/modern-rental-home.png" alt="Modern townhouse with a leafy courtyard" fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 52vw" />
                        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
                        <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between rounded-2xl border border-background/20 bg-foreground/35 p-4 text-background backdrop-blur-md">
                            <div>
                                <p className="text-xs font-medium uppercase tracking-[0.18em] text-background/70">Featured this week</p>
                                <p className="mt-1 font-serif text-xl">The Willow House</p>
                                <p className="mt-1 text-sm text-background/75">Portland, Oregon · $2,450 / month</p>
                            </div>
                            <Button variant="ghost" size="icon" className="rounded-full text-background hover:bg-background/15 hover:text-background" aria-label="Save The Willow House"><Heart aria-hidden="true" /></Button>
                        </div>
                    </div>
                    <div className="absolute right-4 top-4 hidden items-center gap-3 rounded-2xl border border-border bg-card p-3 shadow-xl sm:flex">
                        <span className="flex size-10 items-center justify-center rounded-xl bg-accent/20 text-accent-foreground"><ShieldCheck aria-hidden="true" className="size-5" /></span>
                        <span><strong className="block text-sm text-foreground">100% verified</strong><span className="text-xs text-muted-foreground">Every home, checked</span></span>
                    </div>
                </div>
            </section>

        </main>
    )
}
