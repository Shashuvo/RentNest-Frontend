import Link from "next/link";
import Image from "next/image";
import { CalendarDays, MapPin, MessageSquare, ArrowRight } from "lucide-react";

import { getMyRentalRequests } from "../_actions/rentalAction";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const getStatusVariant = (status: string) => {
    switch (status) {
        case "APPROVED":
        case "ACTIVE":
            return "default";

        case "PENDING":
            return "secondary";

        case "REJECTED":
            return "destructive";

        default:
            return "outline";
    }
};

export default async function RentalRequestsPage() {
    const result = await getMyRentalRequests();
    const requests = result.data;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="font-serif text-3xl tracking-tight">
                    My Rental Requests
                </h1>

                <p className="mt-1.5 text-sm text-muted-foreground">
                    View and manage your rental requests.
                </p>
            </div>

            {requests.length === 0 ? (
                <div className="relative flex min-h-64 flex-col items-center justify-center overflow-hidden rounded-3xl border border-dashed border-border bg-card/40 p-8 text-center">
                    <div
                        className="pointer-events-none absolute -top-10 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
                        aria-hidden="true"
                    />

                    <div className="relative flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary ring-4 ring-primary/10">
                        <MessageSquare className="size-6" />
                    </div>

                    <h2 className="relative mt-5 font-serif text-xl tracking-tight">
                        No rental requests yet
                    </h2>

                    <p className="relative mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                        You haven&apos;t submitted any rental requests yet.
                        Browse available properties and send a request to
                        a landlord.
                    </p>

                    <Button asChild className="relative mt-5 rounded-full shadow-sm transition-shadow hover:shadow-[0_12px_30px_-10px_hsl(var(--primary)/0.5)]">
                        <Link href="/properties">
                            Browse Properties
                        </Link>
                    </Button>
                </div>
            ) : (
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {requests.map((request) => (
                        <div
                            key={request.id}
                            className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-[0_20px_45px_-20px_hsl(var(--primary)/0.35)]"
                        >
                            {/* Decorative corner circle */}
                            <div
                                className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/5 transition-transform duration-300 group-hover:scale-150"
                                aria-hidden="true"
                            />

                            {/* Property image */}
                            <div className="relative h-48 bg-muted">
                                {request.property.images?.[0] ? (
                                    <Image
                                        src={request.property.images[0]}
                                        alt={request.property.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                                        loading="lazy"
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                                        No image available
                                    </div>
                                )}

                                <div className="absolute right-3 top-3">
                                    <Badge
                                        variant={getStatusVariant(
                                            request.status
                                        )}
                                        className="rounded-full"
                                    >
                                        {request.status}
                                    </Badge>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="relative p-5">
                                <div className="mb-4">
                                    <h2 className="line-clamp-1 font-serif text-lg tracking-tight">
                                        {request.property.title}
                                    </h2>

                                    <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                                        <MapPin className="h-4 w-4 shrink-0" />
                                        <span className="line-clamp-1">
                                            {request.property.address},{" "}
                                            {request.property.city}
                                        </span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3 border-y border-border py-4">
                                    <div>
                                        <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                            Property Price
                                        </p>

                                        <p className="mt-1 font-serif text-base">
                                            ৳{" "}
                                            {request.property.price.toLocaleString()}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                            Category
                                        </p>

                                        <p className="mt-1 font-medium capitalize">
                                            {request.property.category.name}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                                    <CalendarDays className="h-4 w-4" />

                                    <span>
                                        Requested{" "}
                                        {new Date(
                                            request.createdAt
                                        ).toLocaleDateString()}
                                    </span>
                                </div>

                                <Button
                                    asChild
                                    variant="outline"
                                    className="mt-5 w-full rounded-full border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground"
                                >
                                    <Link
                                        href={`/rental-requests/${request.id}`}
                                    >
                                        View Request
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}