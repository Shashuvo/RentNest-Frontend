"use client"

import { useState } from "react"
import {
  ArrowDownUp,
  BedDouble,
  ChevronLeft,
  ChevronRight,
  MapPin,
  RotateCcw,
  Search,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import PropertyCard from "../_components/PropertyCard"
import { useProperties, defaultFilters, type Filters } from "../_hooks/useProperties"

export default function PropertiesPage() {
  const [filters, setFilters] = useState<Filters>(defaultFilters)
  const { properties, categories, total, totalPages, loading } = useProperties(filters)

  const update = (patch: Partial<Filters>) =>
    setFilters((prev) => ({ ...prev, ...patch, page: patch.page ?? 1 }))

  const handleReset = () => setFilters(defaultFilters)

  const hasActiveFilters =
    JSON.stringify(filters) !== JSON.stringify(defaultFilters)

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="relative overflow-hidden px-6 pb-8 pt-8 lg:px-12 lg:pb-10 lg:pt-12 xl:px-16">
        {/* Ambient glow accent */}
        <div
          className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-32 top-10 h-64 w-64 rounded-full bg-accent/10 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-card px-3 py-1.5 text-xs font-medium tracking-wide text-primary shadow-sm">
              <MapPin className="size-3.5" />
              Explore RentNest
            </div>

            <h1 className="font-serif text-4xl leading-[0.98] tracking-[-0.045em] text-foreground sm:text-5xl lg:text-6xl">
              Find a place that feels like{" "}
              <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                home.
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              Browse verified rental properties and find a home
              that matches your lifestyle, budget, and location.
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="px-6 pb-10 lg:px-12 xl:px-16">
        <div className="mx-auto max-w-7xl">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="rounded-2xl border border-border bg-card p-5 shadow-[0_16px_50px_-22px_hsl(var(--primary)/0.35)]"
          >
            <div className="grid gap-4 md:grid-cols-[1.3fr_1fr_1fr_1fr_auto] md:items-end">
              {/* Search */}
              <div>
                <label className="mb-2 block text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  Search
                </label>
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={filters.searchTerm}
                    onChange={(e) => update({ searchTerm: e.target.value })}
                    placeholder="Property or location"
                    className="h-11 rounded-full border border-border bg-background pl-9 text-sm shadow-sm transition-colors focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary"
                  />
                </div>
              </div>

              {/* City */}
              <div>
                <label className="mb-2 block text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  City
                </label>
                <div className="relative">
                  <MapPin className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={filters.city}
                    onChange={(e) => update({ city: e.target.value })}
                    placeholder="Chattogram"
                    className="h-11 rounded-full border border-border bg-background pl-9 text-sm shadow-sm transition-colors focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary"
                  />
                </div>
              </div>

              {/* Property Type */}
              <div>
                <label className="mb-2 block text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  Property type
                </label>
                <Select
                  value={filters.categoryId}
                  onValueChange={(value) => update({ categoryId: value ?? "any" })}
                >
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

              {/* Bedrooms */}
              <div>
                <label className="mb-2 block text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  Bedrooms
                </label>
                <Select
                  value={filters.bedrooms}
                  onValueChange={(value) => update({ bedrooms: value ?? "any" })}
                >
                  <SelectTrigger className="h-11! w-full rounded-full border border-border bg-background px-4 text-sm shadow-sm transition-colors focus:border-primary focus:ring-1 focus:ring-primary">
                    <SelectValue placeholder="Any bedrooms" />
                  </SelectTrigger>
                  <SelectContent className="p-2">
                    <SelectItem value="any">Any bedrooms</SelectItem>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <SelectItem key={n} value={String(n)}>
                        {n} Bedroom{n > 1 ? "s" : ""}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" size="lg" className="h-11 rounded-full px-6 shadow-sm">
                <Search data-icon="inline-start" />
                Search
              </Button>
            </div>

            {/* Price filters */}
            <div className="mt-4 grid gap-4 border-t border-border/60 pt-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  Minimum monthly rent
                </label>
                <Input
                  type="number"
                  min="0"
                  value={filters.minPrice}
                  onChange={(e) => update({ minPrice: e.target.value })}
                  placeholder="e.g. 10,000"
                  className="h-11 rounded-full border border-border bg-background text-sm shadow-sm transition-colors focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary"
                />
              </div>

              <div>
                <label className="mb-2 block text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  Maximum monthly rent
                </label>
                <Input
                  type="number"
                  min="0"
                  value={filters.maxPrice}
                  onChange={(e) => update({ maxPrice: e.target.value })}
                  placeholder="e.g. 50,000"
                  className="h-11 rounded-full border border-border bg-background text-sm shadow-sm transition-colors focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary"
                />
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* Results */}
      <section className="px-6 pb-16 lg:px-12 lg:pb-24 xl:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-7 flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
                Available Homes
              </p>
              <h2 className="mt-1 font-serif text-3xl tracking-[-0.035em] text-foreground">
                Explore Properties
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{total}</span>{" "}
                {total === 1 ? "property" : "properties"} available
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Select
                value={`${filters.sortBy}-${filters.sortOrder}`}
                onValueChange={(value) => {
                  const [sortBy, sortOrder] = value.split("-")
                  update({ sortBy, sortOrder })
                }}
              >
                <SelectTrigger className="h-11! w-full rounded-full border border-border bg-background px-4 text-sm shadow-sm transition-colors focus:border-primary focus:ring-1 focus:ring-primary">
                  <ArrowDownUp className="mr-2 size-4 text-primary/70" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="p-2">
                  <SelectItem value="createdAt-desc">Newest first</SelectItem>
                  <SelectItem value="createdAt-asc">Oldest first</SelectItem>
                  <SelectItem value="price-asc">Price: low to high</SelectItem>
                  <SelectItem value="price-desc">Price: high to low</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                size="icon"
                className="relative size-11 shrink-0 rounded-full border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground"
                onClick={handleReset}
                title="Reset filters"
              >
                <RotateCcw className="size-4" />
                {hasActiveFilters && (
                  <span className="absolute right-1 top-1 flex size-2 rounded-full bg-primary ring-2 ring-background" />
                )}
              </Button>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
                >
                  <div className="aspect-16/10 animate-pulse bg-muted" />
                  <div className="space-y-3 p-4">
                    <div className="h-6 w-2/3 animate-pulse rounded-full bg-muted" />
                    <div className="h-4 w-1/2 animate-pulse rounded-full bg-muted" />
                    <div className="h-4 w-full animate-pulse rounded-full bg-muted" />
                    <div className="flex gap-2 pt-1">
                      <div className="h-9 flex-1 animate-pulse rounded-full bg-muted" />
                      <div className="h-9 w-9 animate-pulse rounded-full bg-muted" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : properties.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="relative flex min-h-80 flex-col items-center justify-center overflow-hidden rounded-3xl border border-dashed border-border bg-card/40 px-6 text-center">
              <div
                className="pointer-events-none absolute -top-10 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
                aria-hidden="true"
              />

              <div className="relative flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/15">
                <BedDouble className="size-7" />
              </div>
              <h3 className="relative mt-5 font-serif text-xl tracking-tight text-foreground">
                No properties found
              </h3>
              <p className="relative mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                We couldn&apos;t find any properties matching your current
                filters. Try changing your search criteria.
              </p>
              <Button
                variant="outline"
                className="relative mt-5 rounded-full border-primary/20 px-5 text-primary hover:bg-primary hover:text-primary-foreground"
                onClick={handleReset}
              >
                Clear filters
              </Button>
            </div>
          )}

          {!loading && totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-3">
              <Button
                variant="outline"
                size="icon"
                className="size-10 rounded-full border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground disabled:opacity-40"
                disabled={filters.page === 1}
                onClick={() => update({ page: filters.page - 1 })}
                aria-label="Previous page"
              >
                <ChevronLeft className="size-4" />
              </Button>

              <div className="flex h-10 items-center rounded-full border border-border bg-card px-5 text-sm font-medium text-foreground shadow-sm">
                Page {filters.page} of {totalPages}
              </div>

              <Button
                variant="outline"
                size="icon"
                className="size-10 rounded-full border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground disabled:opacity-40"
                disabled={filters.page === totalPages}
                onClick={() => update({ page: filters.page + 1 })}
                aria-label="Next page"
              >
                <ChevronRight className="size-4" />
              </Button>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}