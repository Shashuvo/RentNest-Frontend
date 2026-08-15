"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Bed, Bath, Ruler } from "lucide-react";
import { Property } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

type PropertyCardProps = {
    property: Property;
};

export default function PropertyCard({ property }: PropertyCardProps) {
    const images = property.images?.length
        ? property.images
        : ["/placeholder-property.jpg"];

    const hasMultipleImages = images.length > 1;

    const [activeIndex, setActiveIndex] = useState(0);

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
        <article className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-24px_hsl(var(--primary)/0.4)]">
            {/* Ambient glow accent */}
            <div
                className="pointer-events-none absolute -right-10 -top-10 z-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-70"
                aria-hidden="true"
            />

            {/* Property Image */}
            <Link href={`/properties/${property.id}`}>
                <div className="relative aspect-video overflow-hidden">
                    <Image
                        src={images[activeIndex]}
                        alt={`${property.title} - image ${activeIndex + 1}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />

                    <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-foreground/30 via-transparent to-transparent" />

                    {/* Carousel arrows — only when multiple images */}
                    {hasMultipleImages && (
                        <>
                            <button
                                type="button"
                                onClick={goToPrevious}
                                aria-label="Previous image"
                                className="absolute left-2.5 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white text-primary opacity-0 shadow-lg transition-all duration-200 hover:scale-110 hover:bg-primary hover:text-white group-hover:opacity-100"
                            >
                                <ChevronLeft className="h-5 w-5" />
                            </button>

                            <button
                                type="button"
                                onClick={goToNext}
                                aria-label="Next image"
                                className="absolute right-2.5 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white text-primary opacity-0 shadow-lg transition-all duration-200 hover:scale-110 hover:bg-primary hover:text-white group-hover:opacity-100"
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
                                        className={`h-1.5 rounded-full transition-all duration-200 ${
                                            index === activeIndex
                                                ? "w-5 bg-white"
                                                : "w-1.5 bg-white/50 hover:bg-white/80"
                                        }`}
                                    />
                                ))}
                            </div>

                            {/* Image count badge */}
                            <div className="absolute bottom-3 right-3 z-20 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-medium text-white shadow-sm backdrop-blur-md">
                                {activeIndex + 1} / {images.length}
                            </div>
                        </>
                    )}

                    {/* Availability */}
                    <div className="absolute left-3 top-3 z-10">
                        <span
                            className={`rounded-full px-3 py-1 text-xs font-medium shadow-sm backdrop-blur-md ${
                                property.isAvailable
                                    ? "bg-emerald-500 text-white"
                                    : "bg-foreground/70 text-background"
                            }`}
                        >
                            {property.isAvailable
                                ? "Available"
                                : "Not Available"}
                        </span>
                    </div>

                    {/* Category */}
                    <div className="absolute right-3 top-3 z-10">
                        <span className="rounded-full bg-card/90 px-3 py-1 text-xs font-medium text-foreground shadow-sm backdrop-blur-md">
                            {property.category.name}
                        </span>
                    </div>
                </div>
            </Link>

            {/* Content */}
            <div className="p-4">
                {/* Price */}
                <div className="mb-1.5">
                    <span className="font-serif text-xl tracking-tight text-foreground">
                        ৳{property.price.toLocaleString()}
                    </span>
                    <span className="ml-1.5 text-sm text-muted-foreground">
                        / month
                    </span>
                </div>

                {/* Title */}
                <Link href={`/properties/${property.id}`}>
                    <h3 className="line-clamp-1 font-serif text-lg text-foreground transition-colors group-hover:text-primary">
                        {property.title}
                    </h3>
                </Link>

                {/* Location */}
                <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
                    {property.address}, {property.city}
                </p>

                {/* Details */}
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-border pt-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                        <Bed className="h-4 w-4 text-primary/70" />
                        {property.bedrooms} Beds
                    </span>
                    <span className="flex items-center gap-1.5">
                        <Bath className="h-4 w-4 text-primary/70" />
                        {property.bathrooms} Baths
                    </span>

                    {property.area && (
                        <span className="flex items-center gap-1.5">
                            <Ruler className="h-4 w-4 text-primary/70" />
                            {property.area.toLocaleString()} sq ft
                        </span>
                    )}
                </div>

                {/* Landlord + Details */}
                <div className="mt-4 flex items-center justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-2.5">
                        {property.landlord.photoUrl ? (
                            <Image
                                src={property.landlord.photoUrl}
                                alt={property.landlord.name}
                                width={36}
                                height={36}
                                className="h-9 w-9 shrink-0 rounded-full object-cover ring-2 ring-primary/10"
                            />
                        ) : (
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold text-foreground ring-2 ring-primary/10">
                                {property.landlord.name.charAt(0)}
                            </div>
                        )}

                        <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-foreground">
                                {property.landlord.name}
                            </p>

                            <p className="text-xs text-muted-foreground">
                                Landlord
                            </p>
                        </div>
                    </div>

                    <Link
                        href={`/properties/${property.id}`}
                        className="shrink-0 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition hover:opacity-90"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </article>
    );
}