"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Home } from "lucide-react"

interface PropertyGalleryProps {
    images: string[]
    title: string
}

export function PropertyGallery({ images, title }: PropertyGalleryProps) {
    const [activeIndex, setActiveIndex] = useState(0)
    const hasImages = images.length > 0
    const hasMultipleImages = images.length > 1

    const goToPrevious = () => {
        setActiveIndex((current) =>
            current === 0 ? images.length - 1 : current - 1
        )
    }

    const goToNext = () => {
        setActiveIndex((current) =>
            current === images.length - 1 ? 0 : current + 1
        )
    }

    return (
        <div className="space-y-3">
            {/* Main image */}
            <div className="group relative h-80 overflow-hidden rounded-2xl bg-muted shadow-sm sm:h-105">
                {hasImages ? (
                    <Image
                        src={images[activeIndex]}
                        alt={`${title} photo ${activeIndex + 1}`}
                        fill
                        priority
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 66vw"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-muted-foreground">
                        <Home className="size-10" />
                    </div>
                )}

                {hasMultipleImages && (
                    <>
                        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-foreground/40 via-transparent to-transparent" />

                        <button
                            type="button"
                            onClick={goToPrevious}
                            aria-label="Previous image"
                            className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-primary opacity-0 shadow-lg transition-all duration-200 hover:scale-110 hover:bg-primary hover:text-white group-hover:opacity-100"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>

                        <button
                            type="button"
                            onClick={goToNext}
                            aria-label="Next image"
                            className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-primary opacity-0 shadow-lg transition-all duration-200 hover:scale-110 hover:bg-primary hover:text-white group-hover:opacity-100"
                        >
                            <ChevronRight className="h-5 w-5" />
                        </button>

                        <div className="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white shadow-sm backdrop-blur-md">
                            {activeIndex + 1} / {images.length}
                        </div>
                    </>
                )}
            </div>

            {/* Thumbnail strip */}
            {hasMultipleImages && (
                <div className="flex gap-2.5 overflow-x-auto pb-1">
                    {images.map((image, index) => (
                        <button
                            key={index}
                            type="button"
                            onClick={() => setActiveIndex(index)}
                            aria-label={`View photo ${index + 1}`}
                            className={`relative ml-1 mt-2 h-16 w-24 shrink-0 overflow-hidden rounded-xl transition-all duration-200 sm:h-20 sm:w-28 ${index === activeIndex
                                    ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                                    : "opacity-60 hover:opacity-100"
                                }`}
                        >
                            <Image
                                src={image}
                                alt={`${title} thumbnail ${index + 1}`}
                                fill
                                className="object-cover"
                                sizes="120px"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}