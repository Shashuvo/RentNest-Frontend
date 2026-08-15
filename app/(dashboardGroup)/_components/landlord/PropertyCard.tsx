"use client";

import { useState } from "react";
import {
    ChevronLeft,
    ChevronRight,
    Edit,
    Home,
    MapPin,
    Trash2,
    Bed,
    Bath,
    Ruler,
} from "lucide-react";
import { Property } from "@/lib/types";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface PropertyCardProps {
    property: Property;
    onEdit: (property: Property) => void;
    onDelete: (propertyId: string) => void;
}

export function PropertyCard({
    property,
    onEdit,
    onDelete,
}: PropertyCardProps) {
    const images = property.images ?? [];
    const hasMultipleImages = images.length > 1;

    const [activeIndex, setActiveIndex] = useState(0);

    const goToPrevious = (event: React.MouseEvent) => {
        event.stopPropagation();
        setActiveIndex((current) =>
            current === 0 ? images.length - 1 : current - 1
        );
    };

    const goToNext = (event: React.MouseEvent) => {
        event.stopPropagation();
        setActiveIndex((current) =>
            current === images.length - 1 ? 0 : current + 1
        );
    };

    return (
        <Card className="group relative overflow-hidden rounded-3xl border border-border bg-card py-0 shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_-24px_hsl(var(--primary)/0.45)]">
            {/* Ambient glow accent */}
            <div
                className="pointer-events-none absolute -right-12 -top-12 z-10 h-48 w-48 rounded-full bg-primary/20 blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-70"
                aria-hidden="true"
            />

            {/* Property Image */}
            <div className="relative aspect-video w-full overflow-hidden bg-muted">
                {images.length > 0 ? (
                    <Image
                        src={images[activeIndex]}
                        alt={`${property.title} - image ${activeIndex + 1}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center">
                        <Home className="h-8 w-8 text-muted-foreground/50" />
                    </div>
                )}

                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-foreground/80 via-foreground/10 to-transparent" />

                {/* Carousel arrows — only when multiple images */}
                {hasMultipleImages && (
                    <>
                        <button
                            type="button"
                            onClick={goToPrevious}
                            aria-label="Previous image"
                            className="absolute left-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white text-primary opacity-0 shadow-lg transition-all duration-200 hover:scale-110 hover:bg-primary hover:text-white group-hover:opacity-100"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>

                        <button
                            type="button"
                            onClick={goToNext}
                            aria-label="Next image"
                            className="absolute right-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white text-primary opacity-0 shadow-lg transition-all duration-200 hover:scale-110 hover:bg-primary hover:text-white group-hover:opacity-100"
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

                        {/* Image count badge */}
                        <div className="absolute bottom-3 right-3 z-20 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-medium text-white shadow-sm backdrop-blur-md">
                            {activeIndex + 1} / {images.length}
                        </div>
                    </>
                )}

                {/* Category badge, top-left */}
                <Badge className="absolute left-3 top-3 z-20 rounded-full border-0 bg-card px-3.5 py-1.5 text-sm font-semibold text-foreground shadow-lg">
                    {property.category.name}
                </Badge>

                {/* Availability badge, top-right */}
                <Badge
                    className={`absolute right-3 top-3 z-20 flex items-center gap-1.5 rounded-full border-0 px-3.5 py-1.5 text-sm font-semibold shadow-lg ${property.isAvailable
                        ? "bg-emerald-500 text-white"
                        : "bg-foreground/80 text-background"
                        }`}
                >
                    <span
                        className={`h-2 w-2 rounded-full ${property.isAvailable
                            ? "bg-white"
                            : "bg-background/70"
                            }`}
                    />
                    {property.isAvailable ? "Available" : "Rented"}
                </Badge>

                {/* Title + location over image */}
                <div className="absolute inset-x-0 bottom-0 p-4">
                    <h3 className="truncate font-serif text-2xl leading-tight text-background drop-shadow-sm">
                        {property.title}
                    </h3>
                    <div className="mt-1 flex items-center gap-1.5 text-sm text-background/90">
                        <MapPin className="h-3.5 w-3.5 shrink-0" />
                        <span className="truncate">
                            {property.city}, {property.address}
                        </span>
                    </div>
                </div>
            </div>

            <CardContent className="relative space-y-4 p-5">
                {/* Property Information */}
                <div className="grid grid-cols-3 gap-2.5">
                    <PropertyInfo
                        icon={<Bed className="h-4.5 w-4.5" />}
                        value={property.bedrooms}
                        label="Beds"
                    />
                    <PropertyInfo
                        icon={<Bath className="h-4.5 w-4.5" />}
                        value={property.bathrooms}
                        label="Baths"
                    />
                    <PropertyInfo
                        icon={<Ruler className="h-4.5 w-4.5" />}
                        value={property.area ?? "-"}
                        label="sq ft"
                    />
                </div>

                {/* Price */}
                <div>
                    <div className="flex items-baseline gap-1.5">
                        <p className="font-serif text-[30px] tracking-tight text-foreground">
                            ৳{property.price.toLocaleString()}
                        </p>
                        <p className="text-sm text-muted-foreground">/ month</p>
                    </div>
                    <div className="mt-2 h-1 w-12 rounded-full bg-primary/20 transition-all duration-300 group-hover:w-20 group-hover:bg-primary/40" />
                </div>

                {/* Actions */}
                <div className="flex gap-2.5 pt-1">
                    <Button
                        variant="outline"
                        size="sm"
                        className="h-10 flex-1 rounded-full border-primary/20 text-sm font-medium text-primary hover:bg-primary hover:text-primary-foreground"
                        onClick={() => onEdit(property)}
                    >
                        <Edit className="mr-1.5 h-4 w-4" />
                        Edit
                    </Button>

                    <Button
                        variant="destructive"
                        size="sm"
                        className="h-10 rounded-full px-4"
                        onClick={() => onDelete(property.id)}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

function PropertyInfo({
    icon,
    value,
    label,
}: {
    icon: React.ReactNode;
    value: string | number;
    label: string;
}) {
    return (
        <div className="flex flex-col items-center gap-1.5 rounded-xl border border-border bg-muted/40 py-3 text-center transition-colors group-hover:border-primary/15">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                {icon}
            </div>
            <p className="text-base font-semibold leading-none text-foreground">
                {value}
            </p>
            <p className="text-xs text-muted-foreground">{label}</p>
        </div>
    );
}