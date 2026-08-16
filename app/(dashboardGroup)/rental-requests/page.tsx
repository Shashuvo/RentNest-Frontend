import Link from "next/link";
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
                <h1 className="text-2xl font-semibold tracking-tight">
                    My Rental Requests
                </h1>

                <p className="mt-1 text-sm text-muted-foreground">
                    View and manage your rental requests.
                </p>
            </div>

            {requests.length === 0 ? (
                <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed p-8 text-center">
                    <MessageSquare className="mb-4 h-10 w-10 text-muted-foreground" />

                    <h2 className="text-lg font-semibold">
                        No rental requests yet
                    </h2>

                    <p className="mt-1 max-w-md text-sm text-muted-foreground">
                        You haven&apos;t submitted any rental requests yet.
                        Browse available properties and send a request to
                        a landlord.
                    </p>

                    <Button asChild className="mt-5">
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
                            className="overflow-hidden rounded-2xl border bg-card shadow-sm transition-shadow hover:shadow-md"
                        >
                            {/* Property image */}
                            <div className="relative h-48 bg-muted">
                                {request.property.images?.[0] ? (
                                    <img
                                        src={request.property.images[0]}
                                        alt={request.property.title}
                                        className="h-full w-full object-cover"
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
                                    >
                                        {request.status}
                                    </Badge>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <div className="mb-4">
                                    <h2 className="line-clamp-1 text-lg font-semibold">
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

                                <div className="grid grid-cols-2 gap-3 border-y py-4">
                                    <div>
                                        <p className="text-xs text-muted-foreground">
                                            Property Price
                                        </p>

                                        <p className="mt-1 font-medium">
                                            ৳{" "}
                                            {request.property.price.toLocaleString()}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-muted-foreground">
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
                                    className="mt-5 w-full"
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