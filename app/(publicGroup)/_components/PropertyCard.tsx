"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Bed, Bath, Ruler, ArrowUpRight } from "lucide-react";
import { Property } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

type PropertyCardProps = {
    property?: Property | null;
};

export default function PropertyCard({ property }: PropertyCardProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    if (!property) {
        return null;
    }

    const images = property.images?.length
        ? property.images
        : ["/placeholder-property.jpg"];

    const hasMultipleImages = images.length > 1;

    const goToPrevious = (event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        setActiveIndex((current) =>
            current === 0 ? images.length - 1 : current - 1
        );
    };

    const goToNext = (event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        setActiveIndex((current) =>
            current === images.length - 1 ? 0 : current + 1
        );
    };

    return (
        <article className="group relative rounded-[28px] bg-linear-to-b from-border/80 via-border/40 to-transparent p-px shadow-md transition-all duration-500 hover:-translate-y-1.5 hover:from-primary/60 hover:via-primary/20 hover:shadow-[0_28px_70px_-28px_hsl(var(--primary)/0.5)]">
            <div className="relative overflow-hidden rounded-[27px] bg-card">
                {/* Ambient glow accent */}
                <div
                    className="pointer-events-none absolute -right-12 -top-12 z-10 h-48 w-48 rounded-full bg-primary/20 opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-70"
                    aria-hidden="true"
                />

                {/* Property Image */}
                <Link href={`/properties/${property.id}`}>
                    <div className="relative aspect-16/10 overflow-hidden">
                        <Image
                            src={images[activeIndex]}
                            alt={`${property.title} - image ${activeIndex + 1}`}
                            fill
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />

                        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/70 via-black/0 to-black/10" />

                        {/* Carousel arrows — only when multiple images */}
                        {hasMultipleImages && (
                            <>
                                <button
                                    type="button"
                                    onClick={goToPrevious}
                                    aria-label="Previous image"
                                    className="absolute left-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-primary opacity-0 shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-primary hover:text-white group-hover:opacity-100"
                                >
                                    <ChevronLeft className="h-5 w-5" />
                                </button>

                                <button
                                    type="button"
                                    onClick={goToNext}
                                    aria-label="Next image"
                                    className="absolute right-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-primary opacity-0 shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-primary hover:text-white group-hover:opacity-100"
                                >
                                    <ChevronRight className="h-5 w-5" />
                                </button>

                                {/* Dot indicators */}
                                <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
                                    {images.map((_, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            aria-label={`Go to image ${index + 1}`}
                                            onClick={(event) => {
                                                event.preventDefault();
                                                event.stopPropagation();
                                                setActiveIndex(index);
                                            }}
                                            className={`h-1.5 rounded-full transition-all duration-200 ${index === activeIndex
                                                ? "w-5 bg-white"
                                                : "w-1.5 bg-white/50 hover:bg-white/80"
                                                }`}
                                        />
                                    ))}
                                </div>

                                {/* Image count badge — bottom-right */}
                                <div className="absolute bottom-3 right-3 z-20 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-medium text-white shadow-sm backdrop-blur-md">
                                    {activeIndex + 1} / {images.length}
                                </div>
                            </>
                        )}

                        {/* Availability badge — top-left */}
                        <span
                            className={`absolute left-3 top-3 z-10 flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold shadow-lg ${property.isAvailable
                                ? "bg-emerald-500 text-white"
                                : "bg-primary/80 text-white"
                                }`}
                        >
                            <span className="h-1.5 w-1.5 rounded-full bg-white" />
                            {property.isAvailable ? "Available" : "Not Available"}
                        </span>

                        {/* Category badge — top-right, always visible */}
                        <span className="absolute right-3 top-3 z-10 rounded-full border border-primary bg-card px-3 py-1 text-xs font-semibold text-primary shadow-lg">
                            {property.category.name}
                        </span>

                    </div>
                </Link>

                {/* Content */}
                <div className="relative p-4">
                    {/* Price + category */}
                    <div className="flex items-start justify-between gap-2">
                        <div className="flex items-baseline gap-1.5">
                            <span className="font-serif text-2xl tracking-tight text-foreground">
                                ৳{property.price.toLocaleString()}
                            </span>
                            <span className="text-sm text-muted-foreground">/mo</span>
                        </div>

                        <span className="mt-0.5 shrink-0 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary">
                            {property.category.name}
                        </span>
                    </div>

                    {/* Title */}
                    <Link href={`/properties/${property.id}`}>
                        <h3 className="mt-2 line-clamp-1 font-serif text-lg text-foreground transition-colors group-hover:text-primary">
                            {property.title}
                        </h3>
                    </Link>

                    {/* Location */}
                    <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
                        {property.address}, {property.city}
                    </p>

                    {/* Details */}
                    <div className="mt-4 grid grid-cols-3 gap-2">
                        <div className="flex flex-col items-center gap-1 rounded-xl border border-border bg-muted/40 py-2.5 text-center transition-colors group-hover:border-primary/15">
                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <Bed className="h-3.5 w-3.5" />
                            </div>
                            <p className="text-sm font-semibold leading-none text-foreground">
                                {property.bedrooms}
                            </p>
                            <p className="text-[10px] text-muted-foreground">Beds</p>
                        </div>

                        <div className="flex flex-col items-center gap-1 rounded-xl border border-border bg-muted/40 py-2.5 text-center transition-colors group-hover:border-primary/15">
                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <Bath className="h-3.5 w-3.5" />
                            </div>
                            <p className="text-sm font-semibold leading-none text-foreground">
                                {property.bathrooms}
                            </p>
                            <p className="text-[10px] text-muted-foreground">Baths</p>
                        </div>

                        <div className="flex flex-col items-center gap-1 rounded-xl border border-border bg-muted/40 py-2.5 text-center transition-colors group-hover:border-primary/15">
                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <Ruler className="h-3.5 w-3.5" />
                            </div>
                            <p className="text-sm font-semibold leading-none text-foreground">
                                {property.area ? property.area.toLocaleString() : "-"}
                            </p>
                            <p className="text-[10px] text-muted-foreground">sq ft</p>
                        </div>
                    </div>

                    {/* Landlord + Details */}
                    <div className="mt-4 flex items-center justify-between gap-2 border-t border-border/70 pt-4">
                        <div className="flex min-w-0 items-center gap-2.5">
                            {property.landlord.photoUrl ? (
                                <Image
                                    src={property.landlord.photoUrl}
                                    alt={property.landlord.name}
                                    width={34}
                                    height={34}
                                    className="h-8.5 w-8.5 shrink-0 rounded-full object-cover ring-2 ring-primary/10"
                                />
                            ) : (
                                <div className="flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-full border border-primary bg-primary/10 text-sm font-semibold text-primary ring-2 ring-primary/10">
                                    {(property.landlord.name || "John Doe")
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                </div>
                            )}

                            <div className="min-w-0">
                                <p className="truncate text-sm font-medium text-foreground">
                                    {property.landlord.name}
                                </p>
                                <p className="text-xs text-muted-foreground">Landlord</p>
                            </div>
                        </div>

                        <Link
                            href={`/properties/${property.id}`}
                            className="flex shrink-0 items-center gap-1 rounded-full bg-primary py-2 pl-4 pr-3 text-sm font-medium text-primary-foreground shadow-sm transition-all duration-200 hover:gap-1.5 hover:opacity-90"
                        >
                            View
                            <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                    </div>
                </div>

                {/* Animated accent bar */}
                <div className="pointer-events-none absolute bottom-0 left-0 z-10 h-1 w-0 rounded-full bg-primary transition-all duration-500 group-hover:w-full" />
            </div>
        </article>
    );
}