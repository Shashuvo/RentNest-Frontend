import Link from "next/link";
import {
    ArrowRight,
    CalendarDays,
    Clock3,
    Home,
    MapPin,
    User,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { getLandlordRequests } from "../_actions/landlordRentalAction";
import RentalRequestActions from "../_components/landlord/RentalRequestActions";
import { LandlordRentalRequest } from "@/lib/types";

const getStatusConfig = (status: string) => {
    switch (status) {
        case "APPROVED":
            return {
                label: "Approved",
                variant: "default" as const,
            };

        case "REJECTED":
            return {
                label: "Rejected",
                variant: "destructive" as const,
            };

        case "ACTIVE":
            return {
                label: "Active",
                variant: "default" as const,
            };

        case "COMPLETED":
            return {
                label: "Completed",
                variant: "secondary" as const,
            };

        case "CANCELLED":
            return {
                label: "Cancelled",
                variant: "destructive" as const,
            };

        default:
            return {
                label: "Pending",
                variant: "secondary" as const,
            };
    }
};

export default async function LandlordRequestsPage() {
    const result = await getLandlordRequests();
    const requests: LandlordRentalRequest[] = result.data;

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
                <p className="text-sm font-medium text-primary">
                    Landlord Dashboard
                </p>

                <h1 className="mt-1 text-2xl font-semibold tracking-tight">
                    Rental Requests
                </h1>

                <p className="mt-2 text-sm text-muted-foreground">
                    Review and manage rental requests from tenants.
                </p>
            </div>

            {/* Empty state */}
            {requests.length === 0 ? (
                <div className="rounded-2xl border bg-card p-10 text-center">
                    <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-muted">
                        <Home className="size-6 text-muted-foreground" />
                    </div>

                    <h2 className="mt-5 text-lg font-semibold">
                        No rental requests yet
                    </h2>

                    <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                        You don&apos;t have any rental requests for your
                        properties yet.
                    </p>

                    <Button asChild className="mt-5">
                        <Link href="/landlord-dashboard">
                            Back to Dashboard
                        </Link>
                    </Button>
                </div>
            ) : (
                <div className="space-y-4">
                    {requests.map((request) => {
                        const status = getStatusConfig(
                            request.status
                        );

                        return (
                            <div
                                key={request.id}
                                className="rounded-2xl border bg-card p-5 transition-shadow hover:shadow-sm sm:p-6"
                            >
                                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                                    {/* Property */}
                                    <div className="flex min-w-0 gap-4">
                                        <div className="h-24 w-28 shrink-0 overflow-hidden rounded-xl bg-muted sm:h-28 sm:w-36">
                                            {request.property.images?.[0] ? (
                                                <img
                                                    src={
                                                        request.property
                                                            .images[0]
                                                    }
                                                    alt={
                                                        request.property.title
                                                    }
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-full items-center justify-center">
                                                    <Home className="size-6 text-muted-foreground" />
                                                </div>
                                            )}
                                        </div>

                                        <div className="min-w-0">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <h2 className="truncate font-semibold">
                                                    {
                                                        request.property
                                                            .title
                                                    }
                                                </h2>

                                                <Badge
                                                    variant={
                                                        status.variant
                                                    }
                                                >
                                                    {status.label}
                                                </Badge>
                                            </div>

                                            <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                                                <MapPin className="size-4 shrink-0" />

                                                <span className="truncate">
                                                    {
                                                        request.property
                                                            .address
                                                    }
                                                    ,{" "}
                                                    {
                                                        request.property
                                                            .city
                                                    }
                                                </span>
                                            </div>

                                            <p className="mt-2 text-sm font-semibold">
                                                ৳{" "}
                                                {request.property.price.toLocaleString()}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Tenant */}
                                    <div className="flex items-center gap-3 lg:min-w-52">
                                        {request.tenant.photoUrl ? (
                                            <img
                                                src={
                                                    request.tenant.photoUrl
                                                }
                                                alt={
                                                    request.tenant.name
                                                }
                                                className="size-10 rounded-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted">
                                                <User className="size-5 text-muted-foreground" />
                                            </div>
                                        )}

                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-medium">
                                                {request.tenant.name}
                                            </p>

                                            <p className="truncate text-xs text-muted-foreground">
                                                {request.tenant.email}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Date + Actions */}
                                    <div className="flex flex-col gap-3 lg:items-end">
                                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                            <CalendarDays className="size-3.5" />

                                            {new Date(
                                                request.createdAt
                                            ).toLocaleDateString()}
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            <Button
                                                asChild
                                                variant="outline"
                                                size="sm"
                                            >
                                                <Link
                                                    href={`/landlord-requests/${request.id}`}
                                                >
                                                    View Request
                                                    <ArrowRight className="ml-2 size-4" />
                                                </Link>
                                            </Button>

                                            <RentalRequestActions
                                                requestId={request.id}
                                                status={
                                                    request.status
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}