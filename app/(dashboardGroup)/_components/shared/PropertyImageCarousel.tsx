"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PropertyImageCarouselProps {
    images: string[];
    alt: string;
}

export function PropertyImageCarousel({
    images,
    alt,
}: PropertyImageCarouselProps) {
    const [index, setIndex] = useState(0);

    if (images.length === 0) {
        return (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                No image available
            </div>
        );
    }

    const goPrev = () =>
        setIndex((current) =>
            current === 0 ? images.length - 1 : current - 1
        );

    const goNext = () =>
        setIndex((current) =>
            current === images.length - 1 ? 0 : current + 1
        );

    return (
        <div className="group relative h-full w-full overflow-hidden">
            <Image
                src={images[index]}
                alt={alt}
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                loading="lazy"
                className="object-cover"
            />

            {images.length > 1 && (
                <>
                    <button
                        type="button"
                        onClick={goPrev}
                        aria-label="Previous image"
                        className="absolute left-3 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card/90 text-foreground shadow-sm backdrop-blur transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                        <ChevronLeft className="size-4" />
                    </button>

                    <button
                        type="button"
                        onClick={goNext}
                        aria-label="Next image"
                        className="absolute right-3 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card/90 text-foreground shadow-sm backdrop-blur transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                        <ChevronRight className="size-4" />
                    </button>

                    <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                        {images.map((_, imageIndex) => (
                            <button
                                key={imageIndex}
                                type="button"
                                onClick={() => setIndex(imageIndex)}
                                aria-label={`Go to image ${imageIndex + 1}`}
                                className={`h-1.5 rounded-full transition-all ${imageIndex === index
                                    ? "w-6 bg-primary"
                                    : "w-1.5 bg-card/80"
                                    }`}
                            />
                        ))}
                    </div>

                    <div className="absolute right-3 top-3 rounded-full border border-primary/15 bg-card/90 px-2.5 py-1 text-xs font-medium text-foreground shadow-sm backdrop-blur">
                        {index + 1} / {images.length}
                    </div>
                </>
            )}
        </div>
    );
}