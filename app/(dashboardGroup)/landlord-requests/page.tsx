import Link from "next/link";
import Image from "next/image";
import {
    ArrowRight,
    CalendarDays,
    ClipboardList,
    Home,
    MapPin,
    User,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { getLandlordRequests } from "../_actions/landlordRentalAction";
import RentalRequestActions from "../_components/landlord/RentalRequestActions";
import { LandlordRentalRequest } from "@/lib/types";

const getStatusLabel = (status: string) => {
    switch (status) {
        case "APPROVED":
            return "Approved";

        case "REJECTED":
            return "Rejected";

        case "ACTIVE":
            return "Active";

        case "COMPLETED":
            return "Completed";

        case "CANCELLED":
            return "Cancelled";

        default:
            return "Pending";
    }
};

const getStatusClasses = (status: string) => {
    switch (status) {
        case "APPROVED":
        case "ACTIVE":
            return "border-2 border-green-600 bg-white text-green-700";

        case "PENDING":
            return "border-2 border-yellow-600 bg-white text-yellow-700";

        case "COMPLETED":
            return "border-2 border-primary/80 bg-white text-primary";

        case "REJECTED":
        case "CANCELLED":
            return "border-2 border-red-600 bg-white text-red-700";

        default:
            return "border-2 border-border bg-white text-muted-foreground";
    }
};

export default async function LandlordRequestsPage() {
    const result = await getLandlordRequests();
    const requests: LandlordRentalRequest[] = result.data;

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8 flex items-center gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary ring-4 ring-primary/5">
                    <ClipboardList className="size-5" />
                </span>

                <div>
                    <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
                        Landlord Dashboard
                    </p>

                    <h1 className="mt-1 font-serif text-3xl tracking-tight">
                        Rental Requests
                    </h1>

                    <p className="mt-2 text-sm text-muted-foreground">
                        Review and manage rental requests from tenants.
                    </p>
                </div>
            </div>

            {/* Empty state */}
            {requests.length === 0 ? (
                <div className="relative overflow-hidden rounded-3xl border border-dashed border-border bg-card/40 p-10 text-center">
                    <div
                        className="pointer-events-none absolute -top-16 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
                        aria-hidden="true"
                    />

                    <div className="relative mx-auto flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary ring-4 ring-primary/10">
                        <Home className="size-6" />
                    </div>

                    <h2 className="relative mt-5 font-serif text-xl tracking-tight">
                        No rental requests yet
                    </h2>

                    <p className="relative mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                        You don&apos;t have any rental requests for your
                        properties yet.
                    </p>

                    <Button asChild className="relative mt-5 rounded-full shadow-sm transition-shadow hover:shadow-[0_12px_30px_-10px_hsl(var(--primary)/0.5)]">
                        <Link href="/landlord-dashboard">
                            Back to Dashboard
                        </Link>
                    </Button>
                </div>
            ) : (
                <div className="space-y-4">
                    {requests.map((request) => (
                        <div
                            key={request.id}
                            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-[0_20px_45px_-20px_hsl(var(--primary)/0.35)] sm:p-6"
                        >
                            {/* Decorative corner circle */}
                            <div
                                className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/5 transition-transform duration-300 group-hover:scale-150"
                                aria-hidden="true"
                            />

                            <div className="relative grid gap-5 lg:grid-cols-[minmax(0,1fr)_220px_192px] lg:items-center lg:gap-6">
                                {/* Property */}
                                <div className="flex min-w-0 gap-4">
                                    <div className="relative h-24 w-28 shrink-0 overflow-hidden rounded-2xl bg-muted sm:h-28 sm:w-36">
                                        {request.property.images?.[0] ? (
                                            <Image
                                                src={request.property.images[0]}
                                                alt={request.property.title}
                                                fill
                                                sizes="144px"
                                                loading="lazy"
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center">
                                                <Home className="size-6 text-muted-foreground" />
                                            </div>
                                        )}
                                    </div>

                                    <div className="min-w-0">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <h2 className="truncate font-serif text-lg tracking-tight">
                                                {request.property.title}
                                            </h2>

                                            <span
                                                className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusClasses(
                                                    request.status
                                                )}`}
                                            >
                                                {getStatusLabel(request.status)}
                                            </span>
                                        </div>

                                        <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                                            <MapPin className="size-4 shrink-0" />

                                            <span className="truncate">
                                                {request.property.address}, {request.property.city}
                                            </span>
                                        </div>

                                        <p className="mt-2 font-serif text-sm">
                                            ৳ {request.property.price.toLocaleString()}
                                        </p>

                                        <div className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                                            <CalendarDays className="size-3.5" />
                                            {new Date(request.createdAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>

                                {/* Tenant — fixed-width column, position never shifts */}
                                <div className="flex items-center gap-3">
                                    <div className="relative size-10 shrink-0 overflow-hidden rounded-full bg-primary/10 text-primary">
                                        {request.tenant.photoUrl ? (
                                            <Image
                                                src={request.tenant.photoUrl}
                                                alt={request.tenant.name}
                                                fill
                                                sizes="40px"
                                                loading="lazy"
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center">
                                                <User className="size-5" />
                                            </div>
                                        )}
                                    </div>

                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-medium">
                                            {request.tenant.name}
                                        </p>

                                        <p className="truncate text-xs text-muted-foreground">
                                            {request.tenant.email}
                                        </p>
                                    </div>
                                </div>

                                {/* Actions — stacked, equal-width buttons */}
                                <div className="flex flex-col gap-2 lg:w-48 [&_a]:w-full [&_button]:w-full">
                                    <RentalRequestActions
                                        requestId={request.id}
                                        status={request.status}
                                    />

                                    <Button
                                        asChild
                                        variant="outline"
                                        size="sm"
                                        className="w-full justify-center rounded-full border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground"
                                    >
                                        <Link href={`/landlord-requests/${request.id}`}>
                                            <ArrowRight className="mr-2 size-4" />
                                            View Request
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}