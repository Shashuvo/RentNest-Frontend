"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
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
import type { Category } from "@/lib/types"
import { getAllCategories } from "../_actions/propertyAction"

const priceRanges = [
    { value: "any", label: "Any budget", minPrice: "", maxPrice: "" },
    { value: "under-1500", label: "Under $1,500", minPrice: "", maxPrice: "1500" },
    { value: "1500-2500", label: "$1,500 – $2,500", minPrice: "1500", maxPrice: "2500" },
    { value: "over-2500", label: "$2,500+", minPrice: "2500", maxPrice: "" },
]

export default function Hero() {
    const router = useRouter()

    const [categories, setCategories] = useState<Category[]>([])
    const [location, setLocation] = useState("")
    const [propertyType, setPropertyType] = useState("any")
    const [priceRange, setPriceRange] = useState("any")

    useEffect(() => {
        let ignore = false

        getAllCategories()
            .then((result) => {
                if (!ignore) setCategories(result.data ?? [])
            })
            .catch(console.error)

        return () => {
            ignore = true
        }
    }, [])

    function handleSearch(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const params = new URLSearchParams()

        if (location.trim()) {
            params.set("city", location.trim())
        }

        if (propertyType !== "any") {
            params.set("categoryId", propertyType)
        }

        const selectedRange = priceRanges.find((range) => range.value === priceRange)
        if (selectedRange?.minPrice) params.set("minPrice", selectedRange.minPrice)
        if (selectedRange?.maxPrice) params.set("maxPrice", selectedRange.maxPrice)

        router.push(`/properties?${params.toString()}`)
    }

    return (
        <div>
            <section
                id="top"
                className="grid w-full gap-8 px-6 pb-12 pt-6 lg:grid-cols-[1.4fr_0.94fr] lg:items-center lg:px-12 lg:pb-16 lg:pt-10 xl:px-16"
            >
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

                    <form
                        onSubmit={handleSearch}
                        className="mt-9 w-full max-w-2xl rounded-2xl border border-border bg-card p-4 shadow-[0_16px_50px_-22px_hsl(var(--primary)/0.35)]"
                        aria-label="Search rental properties"
                    >
                        <div className="grid gap-4 md:grid-cols-[1.25fr_1fr_1fr_auto] md:items-end">
                            {/* Location */}
                            <div>
                                <label className="mb-2 block text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                    Location
                                </label>
                                <div className="relative">
                                    <MapPin className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        value={location}
                                        onChange={(event) => setLocation(event.target.value)}
                                        placeholder="City"
                                        className="h-11 rounded-full border border-border bg-background pl-9 text-sm shadow-sm transition-colors focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary"
                                    />
                                </div>
                            </div>

                            {/* Property Type */}
                            <div>
                                <label className="mb-2 block text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                    Property type
                                </label>
                                <Select value={propertyType} onValueChange={(value) => setPropertyType(value ?? "any")}>
                                    <SelectTrigger className="h-11! w-full rounded-full border border-border bg-background px-4 text-sm shadow-sm transition-colors focus:border-primary focus:ring-1 focus:ring-primary">
                                        <SelectValue placeholder="Any property" />
                                    </SelectTrigger>
                                    <SelectContent className="p-2">
                                        <SelectItem value="any">Any property</SelectItem>
                                        {categories.map((category) => (
                                            <SelectItem key={category.id} value={category.id}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Price Range */}
                            <div>
                                <label className="mb-2 block text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                    Price range
                                </label>
                                <Select value={priceRange} onValueChange={(value) => setPriceRange(value ?? "any")}>
                                    <SelectTrigger className="h-11! w-full rounded-full border border-border bg-background px-4 text-sm shadow-sm transition-colors focus:border-primary focus:ring-1 focus:ring-primary">
                                        <SelectValue placeholder="Any budget" />
                                    </SelectTrigger>
                                    <SelectContent className="p-2">
                                        {priceRanges.map((range) => (
                                            <SelectItem key={range.value} value={range.value}>
                                                {range.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <Button type="submit" size="lg" className="h-11 rounded-full px-6">
                                <Search data-icon="inline-start" />
                                Search
                            </Button>
                        </div>
                    </form>

                    <div className="mt-8 flex flex-wrap items-center gap-3">
                        <Button size="lg" className="rounded-full px-5" onClick={() => router.push("/properties")}>
                            Browse properties <ArrowRight data-icon="inline-end" />
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            className="rounded-full border-primary/20 bg-transparent px-5 text-primary hover:bg-primary hover:text-primary-foreground"
                        >
                            List your property
                        </Button>
                    </div>
                </div>

                <div className="relative h-96 lg:h-128">
                    <div className="absolute -right-16 top-12 h-72 w-72 rounded-full bg-accent/20 blur-3xl" aria-hidden="true" />
                    <div className="relative h-full overflow-hidden rounded-[2rem] bg-muted shadow-2xl shadow-primary/10">
                        <Image
                            src="/modern-rental-home.png"
                            alt="Modern townhouse with a leafy courtyard"
                            fill
                            priority
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 52vw"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-foreground/60 via-transparent to-transparent" />
                        <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between rounded-2xl border border-background/20 bg-foreground/35 p-4 text-background backdrop-blur-md">
                            <div>
                                <p className="text-xs font-medium uppercase tracking-[0.18em] text-background/70">Featured this week</p>
                                <p className="mt-1 font-serif text-xl">The Willow House</p>
                                <p className="mt-1 text-sm text-background/75">Portland, Oregon · $2,450 / month</p>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full text-background hover:bg-background/15 hover:text-background"
                                aria-label="Save The Willow House"
                            >
                                <Heart aria-hidden="true" />
                            </Button>
                        </div>
                    </div>
                    <div className="absolute right-4 top-4 hidden items-center gap-3 rounded-2xl border border-border bg-card p-3 shadow-xl sm:flex">
                        <span className="flex size-10 items-center justify-center rounded-xl bg-accent/20 text-accent-foreground">
                            <ShieldCheck aria-hidden="true" className="size-5" />
                        </span>
                        <span>
                            <strong className="block text-sm text-foreground">100% verified</strong>
                            <span className="text-xs text-muted-foreground">Every home, checked</span>
                        </span>
                    </div>
                </div>
            </section>
        </div>
    )
}