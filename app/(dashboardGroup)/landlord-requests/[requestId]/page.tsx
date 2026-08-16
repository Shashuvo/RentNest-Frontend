import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
    ArrowLeft,
    CalendarDays,
    CheckCircle2,
    Clock3,
    FileText,
    MapPin,
    MessageSquare,
    User,
    XCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { getLandlordRequests } from "../../_actions/landlordRentalAction";
import RentalRequestActions from "../../_components/landlord/RentalRequestActions";
import { PropertyImageCarousel } from "@/app/(dashboardGroup)/_components/shared/PropertyImageCarousel";

type LandlordRequestDetailsPageProps = {
    params: Promise<{
        requestId: string;
    }>;
};

const getStatusConfig = (status: string) => {
    switch (status) {
        case "APPROVED":
        case "ACTIVE":
            return {
                label: status,
                icon: CheckCircle2,
                classes:
                    "border-2 border-green-600 bg-white text-green-700",
            };

        case "PENDING":
            return {
                label: "PENDING",
                icon: Clock3,
                classes:
                    "border-2 border-yellow-600 bg-white text-yellow-700",
            };

        case "COMPLETED":
            return {
                label: "COMPLETED",
                icon: CheckCircle2,
                classes:
                    "border-2 border-primary/80 bg-white text-primary",
            };

        case "REJECTED":
        case "CANCELLED":
            return {
                label: status,
                icon: XCircle,
                classes: "border border-red-200 bg-white text-red-700",
            };

        default:
            return {
                label: status,
                icon: Clock3,
                classes:
                    "border border-border bg-white text-muted-foreground",
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
                    className="-ml-3 rounded-full"
                >
                    <Link href="/landlord-requests">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Rental Requests
                    </Link>
                </Button>

                <div className="mt-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-4">
                        <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary ring-4 ring-primary/5">
                            <FileText className="size-5" />
                        </span>

                        <div>
                            <h1 className="font-serif text-3xl tracking-tight">
                                Rental Request Details
                            </h1>

                            <p className="mt-1.5 text-sm text-muted-foreground">
                                Review the tenant&apos;s rental request.
                            </p>
                        </div>
                    </div>

                    <span
                        className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium shadow-sm ${status.classes}`}
                    >
                        <StatusIcon className="h-4 w-4" />
                        {status.label}
                    </span>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Main Content */}
                <div className="space-y-6 lg:col-span-2">
                    {/* Property */}
                    <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                        <div className="relative h-64 bg-muted sm:h-80">
                            <PropertyImageCarousel
                                images={request.property.images ?? []}
                                alt={request.property.title}
                            />
                        </div>

                        <div className="p-6">
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                <div>
                                    <h2 className="font-serif text-xl tracking-tight">
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

                                <p className="font-serif text-lg">
                                    ৳{" "}
                                    {request.property.price.toLocaleString()}
                                </p>
                            </div>

                            <div className="mt-6 grid grid-cols-2 gap-4 border-y border-border py-5 sm:grid-cols-4">
                                <div>
                                    <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
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
                                    <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                        Bedrooms
                                    </p>

                                    <p className="mt-1 font-medium">
                                        {request.property.bedrooms}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                        Bathrooms
                                    </p>

                                    <p className="mt-1 font-medium">
                                        {request.property.bathrooms}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
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
                    <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary ring-4 ring-primary/10">
                                <User className="size-5" />
                            </div>

                            <div>
                                <h2 className="font-serif text-lg tracking-tight">
                                    Tenant Information
                                </h2>

                                <p className="text-sm text-muted-foreground">
                                    Information about the tenant who
                                    submitted this request.
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center">
                            <div className="relative size-16 shrink-0 overflow-hidden rounded-full bg-primary/10 text-primary">
                                {request.tenant.photoUrl ? (
                                    <Image
                                        src={request.tenant.photoUrl}
                                        alt={request.tenant.name}
                                        fill
                                        sizes="64px"
                                        loading="lazy"
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center">
                                        <User className="size-7" />
                                    </div>
                                )}
                            </div>

                            <div>
                                <h3 className="font-serif text-lg tracking-tight">
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

                        <div className="mt-6 grid gap-5 border-t border-border pt-5 sm:grid-cols-2">
                            <div>
                                <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                    Account Status
                                </p>

                                <p className="mt-1 text-sm font-medium">
                                    {request.tenant.status}
                                </p>
                            </div>

                            <div>
                                <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
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
                    <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary ring-4 ring-primary/10">
                                <MessageSquare className="size-5" />
                            </div>

                            <div>
                                <h2 className="font-serif text-lg tracking-tight">
                                    Request Information
                                </h2>

                                <p className="text-sm text-muted-foreground">
                                    Details provided by the tenant.
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 space-y-5">
                            <div>
                                <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                    Message
                                </p>

                                <div className="mt-2 rounded-2xl bg-muted/50 p-4">
                                    <p className="text-sm leading-6">
                                        {request.message ||
                                            "No message was provided."}
                                    </p>
                                </div>
                            </div>

                            <div className="grid gap-5 sm:grid-cols-2">
                                <div className="flex gap-3">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                        <CalendarDays className="h-4 w-4" />
                                    </div>

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
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                        <CalendarDays className="h-4 w-4" />
                                    </div>

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
                    <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                        <h2 className="font-serif text-lg tracking-tight">
                            Request Status
                        </h2>

                        <div className="mt-5">
                            <span
                                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium shadow-sm ${status.classes}`}
                            >
                                <StatusIcon className="h-4 w-4" />
                                {status.label}
                            </span>

                            <p className="mt-2 text-xs text-muted-foreground">
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

                        {request.status === "PENDING" && (
                            <div className="mt-6 border-t border-border pt-5">
                                <p className="mb-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                    Make a decision
                                </p>

                                <div className="flex flex-col gap-2 [&_a]:w-full [&_button]:w-full">
                                    <RentalRequestActions
                                        requestId={request.id}
                                        status={request.status}
                                    />
                                </div>
                            </div>
                        )}
                    </section>

                    {/* Property summary */}
                    <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                        <h2 className="font-serif text-lg tracking-tight">
                            Property Summary
                        </h2>

                        <div className="mt-5 space-y-4">
                            <div>
                                <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                    Property
                                </p>

                                <p className="mt-1 text-sm font-medium">
                                    {request.property.title}
                                </p>
                            </div>

                            <div>
                                <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                    Monthly Rent
                                </p>

                                <p className="mt-1 font-serif text-lg">
                                    ৳{" "}
                                    {request.property.price.toLocaleString()}
                                </p>
                            </div>

                            <div>
                                <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                    Availability
                                </p>

                                <span
                                    className={`mt-1 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium shadow-sm ${request.property.isAvailable
                                        ? "border border-green-200 bg-white text-green-700"
                                        : "border border-border bg-white text-muted-foreground"
                                        }`}
                                >
                                    {request.property.isAvailable
                                        ? "Available"
                                        : "Unavailable"}
                                </span>
                            </div>
                        </div>
                    </section>

                    {/* Request ID */}
                    <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                        <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
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