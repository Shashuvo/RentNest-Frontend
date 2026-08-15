import { Property } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

type PropertyCardProps = {
    property: Property;
};

export default function PropertyCard({ property }: PropertyCardProps) {
    return (
        <article className="group overflow-hidden rounded-2xl border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            {/* Property Image */}
            <Link href={`/properties/${property.id}`}>
                <div className="relative aspect-16/8 overflow-hidden">
                    <Image
                        src={
                            property.images?.[0] ||
                            "/placeholder-property.jpg"
                        }
                        alt={property.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />

                    {/* Availability */}
                    <div className="absolute left-3 top-3">
                        <span
                            className={`rounded-full px-3 py-1 text-xs font-medium text-white ${property.isAvailable
                                    ? "bg-green-500"
                                    : "bg-red-500"
                                }`}
                        >
                            {property.isAvailable
                                ? "Available"
                                : "Not Available"}
                        </span>
                    </div>

                    {/* Category */}
                    <div className="absolute right-3 top-3">
                        <span className="rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                            {property.category.name}
                        </span>
                    </div>
                </div>
            </Link>

            {/* Content */}
            <div className="p-4">
                {/* Price */}
                <div className="mb-1">
                    <span className="text-lg font-bold">
                        ৳{property.price.toLocaleString()}
                    </span>
                    <span className="ml-1 text-xs text-muted-foreground">
                        / month
                    </span>
                </div>

                {/* Title */}
                <Link href={`/properties/${property.id}`}>
                    <h3 className="line-clamp-1 text-base font-semibold transition-colors group-hover:text-primary">
                        {property.title}
                    </h3>
                </Link>

                {/* Location */}
                <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                    {property.address}, {property.city}
                </p>

                {/* Details */}
                <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 border-t pt-3 text-xs text-muted-foreground">
                    <span>{property.bedrooms} Beds</span>
                    <span>{property.bathrooms} Baths</span>

                    {property.area && (
                        <span>{property.area.toLocaleString()} sq ft</span>
                    )}
                </div>

                {/* Landlord + Details */}
                <div className="mt-3 flex items-center justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-2">
                        {property.landlord.photoUrl ? (
                            <Image
                                src={property.landlord.photoUrl}
                                alt={property.landlord.name}
                                width={32}
                                height={32}
                                className="h-8 w-8 shrink-0 rounded-full object-cover"
                            />
                        ) : (
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold">
                                {property.landlord.name.charAt(0)}
                            </div>
                        )}

                        <div className="min-w-0">
                            <p className="truncate text-sm font-medium">
                                {property.landlord.name}
                            </p>

                            <p className="text-xs text-muted-foreground">
                                Landlord
                            </p>
                        </div>
                    </div>

                    <Link
                        href={`/properties/${property.id}`}
                        className="shrink-0 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </article>
    );
}