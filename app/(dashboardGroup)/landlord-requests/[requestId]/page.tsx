import Link from "next/link";
import { notFound } from "next/navigation";
import {
    ArrowLeft,
    CalendarDays,
    CheckCircle2,
    Clock3,
    Home,
    MapPin,
    MessageSquare,
    User,
    XCircle,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { getLandlordRequests } from "../../_actions/landlordRentalAction";
import RentalRequestActions from "../../_components/landlord/RentalRequestActions";

type LandlordRequestDetailsPageProps = {
    params: Promise<{
        requestId: string;
    }>;
};

const getStatusConfig = (status: string) => {
    switch (status) {
        case "APPROVED":
            return {
                label: "APPROVED",
                icon: CheckCircle2,
                variant: "default" as const,
            };

        case "ACTIVE":
            return {
                label: "ACTIVE",
                icon: CheckCircle2,
                variant: "default" as const,
            };

        case "COMPLETED":
            return {
                label: "COMPLETED",
                icon: CheckCircle2,
                variant: "secondary" as const,
            };

        case "REJECTED":
        case "CANCELLED":
            return {
                label: status,
                icon: XCircle,
                variant: "destructive" as const,
            };

        default:
            return {
                label: "PENDING",
                icon: Clock3,
                variant: "secondary" as const,
            };
    }
};

export default async function LandlordRequestDetailsPage({
    params,
}: LandlordRequestDetailsPageProps) {
    const { requestId } = await params;

    const result = await getLandlordRequests();

    const request = result.data.find(
        (item) => item.id === requestId
    );

    if (!request) {
        notFound();
    }

    const status = getStatusConfig(request.status);
    const StatusIcon = status.icon;

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
                <Button
                    asChild
                    variant="ghost"
                    className="-ml-3"
                >
                    <Link href="/landlord-requests">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Rental Requests
                    </Link>
                </Button>

                <div className="mt-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Rental Request Details
                        </h1>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Review the tenant&apos;s rental request.
                        </p>
                    </div>

                    <Badge
                        variant={status.variant}
                        className="w-fit gap-1.5 px-3 py-1.5"
                    >
                        <StatusIcon className="h-4 w-4" />
                        {status.label}
                    </Badge>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Main Content */}
                <div className="space-y-6 lg:col-span-2">
                    {/* Property */}
                    <section className="overflow-hidden rounded-2xl border bg-card">
                        <div className="relative h-64 bg-muted sm:h-80">
                            {request.property.images?.[0] ? (
                                <img
                                    src={request.property.images[0]}
                                    alt={request.property.title}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center">
                                    <Home className="h-10 w-10 text-muted-foreground" />
                                </div>
                            )}
                        </div>

                        <div className="p-6">
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                <div>
                                    <h2 className="text-xl font-semibold">
                                        {request.property.title}
                                    </h2>

                                    <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                                        <MapPin className="h-4 w-4 shrink-0" />

                                        <span>
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
                                </div>

                                <p className="text-lg font-semibold">
                                    ৳{" "}
                                    {request.property.price.toLocaleString()}
                                </p>
                            </div>

                            <div className="mt-6 grid grid-cols-2 gap-4 border-y py-5 sm:grid-cols-4">
                                <div>
                                    <p className="text-xs text-muted-foreground">
                                        Category
                                    </p>

                                    <p className="mt-1 font-medium capitalize">
                                        {
                                            request.property
                                                .category.name
                                        }
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-muted-foreground">
                                        Bedrooms
                                    </p>

                                    <p className="mt-1 font-medium">
                                        {request.property.bedrooms}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-muted-foreground">
                                        Bathrooms
                                    </p>

                                    <p className="mt-1 font-medium">
                                        {request.property.bathrooms}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-muted-foreground">
                                        Area
                                    </p>

                                    <p className="mt-1 font-medium">
                                        {request.property.area
                                            ? `${request.property.area} sq ft`
                                            : "N/A"}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-5">
                                <h3 className="font-medium">
                                    Property Description
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                    {request.property.description}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Tenant */}
                    <section className="rounded-2xl border bg-card p-6">
                        <div className="flex items-center gap-3">
                            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
                                <User className="size-5 text-primary" />
                            </div>

                            <div>
                                <h2 className="font-semibold">
                                    Tenant Information
                                </h2>

                                <p className="text-sm text-muted-foreground">
                                    Information about the tenant who
                                    submitted this request.
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center">
                            {request.tenant.photoUrl ? (
                                <img
                                    src={request.tenant.photoUrl}
                                    alt={request.tenant.name}
                                    className="size-16 rounded-full object-cover"
                                />
                            ) : (
                                <div className="flex size-16 items-center justify-center rounded-full bg-muted">
                                    <User className="size-7 text-muted-foreground" />
                                </div>
                            )}

                            <div>
                                <h3 className="font-semibold">
                                    {request.tenant.name}
                                </h3>

                                <p className="mt-1 text-sm text-muted-foreground">
                                    {request.tenant.email}
                                </p>

                                {request.tenant.phone && (
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        {request.tenant.phone}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="mt-6 grid gap-5 border-t pt-5 sm:grid-cols-2">
                            <div>
                                <p className="text-xs text-muted-foreground">
                                    Account Status
                                </p>

                                <p className="mt-1 text-sm font-medium">
                                    {request.tenant.status}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-muted-foreground">
                                    Address
                                </p>

                                <p className="mt-1 text-sm font-medium">
                                    {request.tenant.address ||
                                        "Not provided"}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Request Information */}
                    <section className="rounded-2xl border bg-card p-6">
                        <div className="flex items-center gap-3">
                            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
                                <MessageSquare className="size-5 text-primary" />
                            </div>

                            <div>
                                <h2 className="font-semibold">
                                    Request Information
                                </h2>

                                <p className="text-sm text-muted-foreground">
                                    Details provided by the tenant.
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 space-y-5">
                            <div>
                                <p className="text-xs font-medium text-muted-foreground">
                                    Message
                                </p>

                                <div className="mt-2 rounded-xl bg-muted/50 p-4">
                                    <p className="text-sm leading-6">
                                        {request.message ||
                                            "No message was provided."}
                                    </p>
                                </div>
                            </div>

                            <div className="grid gap-5 sm:grid-cols-2">
                                <div className="flex gap-3">
                                    <CalendarDays className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />

                                    <div>
                                        <p className="text-sm font-medium">
                                            Preferred Move-in
                                        </p>

                                        <p className="mt-1 text-sm text-muted-foreground">
                                            {request.moveInDate
                                                ? new Date(
                                                      request.moveInDate
                                                  ).toLocaleDateString()
                                                : "Not specified"}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <CalendarDays className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />

                                    <div>
                                        <p className="text-sm font-medium">
                                            Request Submitted
                                        </p>

                                        <p className="mt-1 text-sm text-muted-foreground">
                                            {new Date(
                                                request.createdAt
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Sidebar */}
                <div className="space-y-6 lg:sticky lg:top-8 lg:self-start">
                    {/* Status */}
                    <section className="rounded-2xl border bg-card p-6">
                        <h2 className="text-lg font-semibold">
                            Request Status
                        </h2>

                        <div className="mt-5 flex items-center gap-3">
                            <div className="flex size-10 items-center justify-center rounded-full bg-muted">
                                <StatusIcon className="size-5 text-muted-foreground" />
                            </div>

                            <div>
                                <p className="font-medium">
                                    {status.label}
                                </p>

                                <p className="mt-1 text-xs text-muted-foreground">
                                    {request.status === "PENDING"
                                        ? "Waiting for your decision"
                                        : request.status ===
                                            "APPROVED"
                                          ? "Tenant can proceed with payment"
                                          : request.status ===
                                              "ACTIVE"
                                            ? "Rental is currently active"
                                            : request.status ===
                                                "COMPLETED"
                                              ? "Rental has been completed"
                                              : `Request ${request.status.toLowerCase()}`}
                                </p>
                            </div>
                        </div>

                        {request.status === "PENDING" && (
                            <div className="mt-6 border-t pt-5">
                                <p className="mb-3 text-sm font-medium">
                                    Make a decision
                                </p>

                                <RentalRequestActions
                                    requestId={request.id}
                                    status={request.status}
                                />
                            </div>
                        )}
                    </section>

                    {/* Property summary */}
                    <section className="rounded-2xl border bg-card p-6">
                        <h2 className="text-lg font-semibold">
                            Property Summary
                        </h2>

                        <div className="mt-5 space-y-4">
                            <div>
                                <p className="text-xs text-muted-foreground">
                                    Property
                                </p>

                                <p className="mt-1 text-sm font-medium">
                                    {request.property.title}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-muted-foreground">
                                    Monthly Rent
                                </p>

                                <p className="mt-1 text-lg font-semibold">
                                    ৳{" "}
                                    {request.property.price.toLocaleString()}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-muted-foreground">
                                    Availability
                                </p>

                                <p className="mt-1 text-sm font-medium">
                                    {request.property.isAvailable
                                        ? "Available"
                                        : "Unavailable"}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Request ID */}
                    <section className="rounded-2xl border bg-card p-6">
                        <p className="text-xs text-muted-foreground">
                            Request ID
                        </p>

                        <p className="mt-2 break-all font-mono text-xs">
                            {request.id}
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}