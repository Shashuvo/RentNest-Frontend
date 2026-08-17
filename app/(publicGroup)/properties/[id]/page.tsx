import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
    ArrowLeft,
    Bath,
    Bed,
    CalendarCheck,
    MapPin,
    MessageSquare,
    Ruler,
    ShieldCheck,
    Star,
    User,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import type { Property, Review } from "@/lib/types"
import { getPropertyById, getPropertyReviews } from "../../_actions/propertyAction"
import { PropertyGallery } from "../../_components/PropertyGallery"
import RequestRentalDialog from "@/app/(dashboardGroup)/_components/tenant/RequestRentalDialog"
import { getMe } from "@/service/getMe"

type PageProps = {
    params: Promise<{ id: string }>
}

export default async function PropertyDetailPage({ params }: PageProps) {
    const { id } = await params

    const [propertyResult, reviewResult, meResult] = await Promise.all([
        getPropertyById(id),
        getPropertyReviews(id),
        getMe()
    ])

    if (!propertyResult || !propertyResult.data) {
        notFound()
    }

    const property: Property = propertyResult.data
    const reviews: Review[] = reviewResult?.data?.reviews ?? []
    const averageRating: number = reviewResult?.data?.averageRating ?? 0
    const totalReviews: number = reviewResult?.data?.total ?? 0

    const userRole = meResult?.data?.role
    const isRequestDisabled =
        userRole === "LANDLORD" || userRole === "ADMIN"

    return (
        <main className="min-h-screen bg-background">
            <section className="px-6 pt-8 lg:px-12 xl:px-16">
                <div className="mx-auto max-w-7xl">
                    <Button asChild variant="ghost" className="-ml-3 rounded-full">
                        <Link href="/properties">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Properties
                        </Link>
                    </Button>
                </div>
            </section>

            {/* Image gallery */}
            <section className="px-6 pt-6 lg:px-12 xl:px-16">
                <div className="mx-auto max-w-7xl">
                    <PropertyGallery
                        images={property.images ?? []}
                        title={property.title}
                    />
                </div>
            </section>

            {/* Content */}
            <section className="px-6 py-10 lg:px-12 xl:px-16">
                <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.6fr_1fr]">
                    {/* Main info */}
                    <div>
                        <div className="flex flex-wrap items-start justify-between gap-4">
                            <div>
                                <div className="mb-2 flex flex-wrap items-center gap-2">
                                    <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-card px-3 py-1.5 text-xs font-medium text-primary shadow-sm">
                                        <ShieldCheck className="size-3.5" />
                                        {property.category?.name ?? "Property"}
                                    </div>

                                    <span
                                        className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium shadow-sm ${property.isAvailable
                                            ? "bg-emerald-500/10 text-emerald-600 border-emerald-600/15"
                                            : "bg-primary/10 text-primary/80 border-primary/15"
                                            }`}
                                    >
                                        <span
                                            className={`h-1.5 w-1.5 rounded-full ${property.isAvailable
                                                ? "bg-emerald-500"
                                                : "bg-primary/80"
                                                }`}
                                        />
                                        {property.isAvailable ? "Available now" : "Not available"}
                                    </span>
                                </div>

                                <h1 className="font-serif text-3xl tracking-[-0.03em] text-foreground sm:text-4xl">
                                    {property.title}
                                </h1>

                                <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                                    <MapPin className="size-4" />
                                    {property.address}, {property.city}
                                </p>

                                {totalReviews > 0 && (
                                    <div className="mt-2 flex items-center gap-1.5 text-sm text-foreground">
                                        <Star className="size-4 fill-primary text-primary" />
                                        <span className="font-medium">{averageRating.toFixed(1)}</span>
                                        <span className="text-muted-foreground">
                                            ({totalReviews} {totalReviews === 1 ? "review" : "reviews"})
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="text-right">
                                <p className="font-serif text-3xl text-primary">
                                    ৳{property.price.toLocaleString()}
                                    <span className="text-base font-sans text-muted-foreground"> / month</span>
                                </p>
                            </div>
                        </div>

                        {/* Quick stats */}
                        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                            <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-24px_hsl(var(--primary)/0.4)]">
                                <div
                                    className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/10 blur-2xl transition-opacity duration-300 group-hover:opacity-80"
                                    aria-hidden="true"
                                />
                                <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/15 transition-transform duration-300 group-hover:scale-110">
                                    <Bed className="size-5" />
                                </span>
                                <p className="relative mt-3 font-serif text-2xl tracking-tight text-foreground">
                                    {property.bedrooms}
                                </p>
                                <p className="relative text-xs text-muted-foreground">Bedrooms</p>
                                <div className="relative mt-2 h-1 w-8 rounded-full bg-primary/20 transition-all duration-300 group-hover:w-12 group-hover:bg-primary/40" />
                            </div>

                            <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-24px_hsl(var(--primary)/0.4)]">
                                <div
                                    className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/10 blur-2xl transition-opacity duration-300 group-hover:opacity-80"
                                    aria-hidden="true"
                                />
                                <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/15 transition-transform duration-300 group-hover:scale-110">
                                    <Bath className="size-5" />
                                </span>
                                <p className="relative mt-3 font-serif text-2xl tracking-tight text-foreground">
                                    {property.bathrooms}
                                </p>
                                <p className="relative text-xs text-muted-foreground">Bathrooms</p>
                                <div className="relative mt-2 h-1 w-8 rounded-full bg-primary/20 transition-all duration-300 group-hover:w-12 group-hover:bg-primary/40" />
                            </div>

                            {property.area && (
                                <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-24px_hsl(var(--primary)/0.4)]">
                                    <div
                                        className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/10 blur-2xl transition-opacity duration-300 group-hover:opacity-80"
                                        aria-hidden="true"
                                    />
                                    <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/15 transition-transform duration-300 group-hover:scale-110">
                                        <Ruler className="size-5" />
                                    </span>
                                    <p className="relative mt-3 font-serif text-2xl tracking-tight text-foreground">
                                        {property.area}
                                    </p>
                                    <p className="relative text-xs text-muted-foreground">Sq. ft.</p>
                                    <div className="relative mt-2 h-1 w-8 rounded-full bg-primary/20 transition-all duration-300 group-hover:w-12 group-hover:bg-primary/40" />
                                </div>
                            )}

                            <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-24px_hsl(var(--primary)/0.4)]">
                                <div
                                    className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/10 blur-2xl transition-opacity duration-300 group-hover:opacity-80"
                                    aria-hidden="true"
                                />
                                <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/15 transition-transform duration-300 group-hover:scale-110">
                                    <CalendarCheck className="size-5" />
                                </span>
                                <p className="relative mt-3 font-serif text-2xl tracking-tight text-foreground">
                                    {property._count.rentalRequests}
                                </p>
                                <p className="relative text-xs text-muted-foreground">Requests</p>
                                <div className="relative mt-2 h-1 w-8 rounded-full bg-primary/20 transition-all duration-300 group-hover:w-12 group-hover:bg-primary/40" />
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mt-10">
                            <h2 className="font-serif text-xl text-foreground">About this property</h2>
                            <p className="mt-3 whitespace-pre-line text-sm leading-7 text-muted-foreground">
                                {property.description}
                            </p>
                        </div>

                        {/* Reviews */}
                        <div className="mt-10">
                            <h2 className="flex items-center gap-2 font-serif text-xl text-foreground">
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    <MessageSquare className="size-4" />
                                </span>
                                Reviews ({totalReviews})
                            </h2>

                            {reviews.length === 0 ? (
                                <p className="mt-3 text-sm text-muted-foreground">
                                    No reviews yet for this property.
                                </p>
                            ) : (
                                <div className="mt-4 space-y-4">
                                    {reviews.map((review) => (
                                        <div
                                            key={review.id}
                                            className="rounded-2xl border border-border bg-card p-4 shadow-sm"
                                        >
                                            <div className="flex items-center justify-between gap-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex size-9 items-center justify-center overflow-hidden rounded-full bg-primary/10 ring-2 ring-primary/10">
                                                        {review.tenant.photoUrl ? (
                                                            <Image
                                                                src={review.tenant.photoUrl}
                                                                alt={review.tenant.name}
                                                                width={36}
                                                                height={36}
                                                                className="object-cover"
                                                            />
                                                        ) : (
                                                            <User className="size-4 text-primary" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-semibold text-foreground">
                                                            {review.tenant.name}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground">
                                                            {new Date(review.createdAt).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-sm font-medium text-primary">
                                                    <Star className="size-4 fill-primary text-primary" />
                                                    {review.rating}
                                                </div>
                                            </div>

                                            <p className="mt-3 text-sm leading-6 text-muted-foreground">
                                                {review.comment}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar: landlord + CTA */}
                    <div className="lg:sticky lg:top-8 lg:self-start">
                        <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-[0_16px_50px_-22px_hsl(var(--primary)/0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-24px_hsl(var(--primary)/0.4)]">
                            <div
                                className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/10 blur-2xl transition-opacity duration-300 group-hover:opacity-80"
                                aria-hidden="true"
                            />

                            <p className="relative text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                Listed by
                            </p>

                            <div className="relative my-3 flex items-center gap-3">
                                <div className="flex size-12 items-center justify-center overflow-hidden rounded-full bg-primary/10 ring-2 ring-primary/15 transition-transform duration-300 group-hover:scale-110">
                                    {property.landlord?.photoUrl ? (
                                        <Image
                                            src={property.landlord.photoUrl}
                                            alt={property.landlord.name}
                                            width={48}
                                            height={48}
                                            className="object-cover"
                                        />
                                    ) : (
                                        <User className="size-5 text-primary" />
                                    )}
                                </div>

                                <div>
                                    <p className="text-sm font-semibold text-foreground">
                                        {property.landlord?.name ?? "Landlord"}
                                    </p>

                                    <p className="text-xs text-muted-foreground">
                                        {property.landlord?.email}
                                    </p>
                                </div>
                            </div>

                            {/* Request to Rent */}
                            <div className="relative">
                                <RequestRentalDialog
                                    propertyId={property.id}
                                    propertyTitle={property.title}
                                    isAvailable={property.isAvailable}
                                    disabled={isRequestDisabled}
                                />
                            </div>

                            {/* Contact Landlord */}
                            <Button
                                variant="outline"
                                size="lg"
                                className="relative mt-3 w-full rounded-full border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground"
                            >
                                Contact landlord
                            </Button>

                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}