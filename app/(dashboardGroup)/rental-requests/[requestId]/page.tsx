import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
    ArrowLeft,
    CalendarDays,
    CheckCircle2,
    Clock3,
    CreditCard,
    FileText,
    MapPin,
    MessageSquare,
    Star,
    User,
    XCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { getMyRentalRequestById } from "../../_actions/rentalAction";
import PayNowButton from "@/app/(dashboardGroup)/_components/tenant/PayNowButton";
import ReviewDialog from "../../_components/tenant/ReviewDialog";
import { PropertyImageCarousel } from "@/app/(dashboardGroup)/_components/shared/PropertyImageCarousel";

type RentalRequestDetailsPageProps = {
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
                    "border-2 border-green-200 bg-white text-green-700",
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

export default async function RentalRequestDetailsPage({
    params,
}: RentalRequestDetailsPageProps) {
    const { requestId } = await params;

    let result;

    try {
        result = await getMyRentalRequestById(requestId);
    } catch {
        notFound();
    }

    const request = result.data;
    const status = getStatusConfig(request.status);
    const StatusIcon = status.icon;

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
                <Button asChild variant="ghost" className="-ml-3 rounded-full">
                    <Link href="/rental-requests">
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
                                View the details of your rental request.
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
                                            {request.property.address},{" "}
                                            {request.property.city}
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
                                        {request.property.category.name}
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

                    {/* Rental Request Information */}
                    <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                        <h2 className="font-serif text-lg tracking-tight">
                            Request Information
                        </h2>

                        <div className="mt-5 space-y-5">
                            {/* Message */}
                            <div className="flex gap-3">
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    <MessageSquare className="h-4 w-4" />
                                </div>

                                <div>
                                    <p className="text-sm font-medium">
                                        Message
                                    </p>

                                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                                        {request.message ||
                                            "No message was provided."}
                                    </p>
                                </div>
                            </div>

                            {/* Move-in date */}
                            <div className="flex gap-3">
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    <CalendarDays className="h-4 w-4" />
                                </div>

                                <div>
                                    <p className="text-sm font-medium">
                                        Requested Move-in Date
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

                            {/* Submitted date */}
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
                    </section>

                    {/* Payment */}
                    <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary ring-4 ring-primary/10">
                                <CreditCard className="size-5" />
                            </div>

                            <div>
                                <h2 className="font-serif text-lg tracking-tight">
                                    Payment
                                </h2>

                                <p className="text-sm text-muted-foreground">
                                    Payment status for this rental request
                                </p>
                            </div>
                        </div>

                        <div className="mt-5">
                            {/* No payment exists */}
                            {!request.payment ? (
                                <>
                                    {/* Waiting for landlord */}
                                    {request.status === "PENDING" && (
                                        <div className="rounded-2xl bg-muted/50 p-4">
                                            <p className="text-sm font-medium">
                                                Waiting for landlord approval
                                            </p>

                                            <p className="mt-1 text-xs leading-5 text-muted-foreground">
                                                Your rental request is still
                                                pending. You can make the
                                                payment after the landlord
                                                approves your request.
                                            </p>
                                        </div>
                                    )}

                                    {/* Approved - Pay Now */}
                                    {request.status === "APPROVED" && (
                                        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4">
                                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                                <div>
                                                    <p className="text-sm font-semibold">
                                                        Rental request approved
                                                    </p>

                                                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                                                        Your request has been
                                                        approved. Complete the
                                                        payment to activate
                                                        your rental.
                                                    </p>
                                                </div>

                                                <div className="shrink-0">
                                                    <PayNowButton
                                                        rentalRequestId={
                                                            request.id
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Rejected */}
                                    {(request.status === "REJECTED" ||
                                        request.status === "CANCELLED") && (
                                            <div className="rounded-2xl bg-destructive/10 p-4">
                                                <p className="text-sm font-medium text-destructive">
                                                    Payment unavailable
                                                </p>

                                                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                                                    Payment is unavailable for
                                                    this rental request.
                                                </p>
                                            </div>
                                        )}

                                    {/* Active without payment */}
                                    {request.status === "ACTIVE" && (
                                        <div className="rounded-2xl bg-muted/50 p-4">
                                            <p className="text-sm font-medium">
                                                Rental is active
                                            </p>

                                            <p className="mt-1 text-xs leading-5 text-muted-foreground">
                                                Your rental is currently
                                                active.
                                            </p>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <>
                                    {/* Completed */}
                                    {request.payment.status ===
                                        "COMPLETED" && (
                                            <div className="rounded-2xl bg-primary/10 p-4">
                                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                                    <div>
                                                        <p className="text-sm font-semibold">
                                                            Payment completed
                                                        </p>

                                                        <p className="mt-1 text-xs leading-5 text-muted-foreground">
                                                            Your payment has been
                                                            successfully completed
                                                            and your rental is
                                                            active.
                                                        </p>
                                                    </div>

                                                    <Button
                                                        asChild
                                                        variant="outline"
                                                        size="sm"
                                                        className="rounded-full"
                                                    >
                                                        <Link
                                                            href={`/payment/${request.payment.id}`}
                                                        >
                                                            View Payment
                                                        </Link>
                                                    </Button>
                                                </div>
                                            </div>
                                        )}

                                    {/* Pending */}
                                    {request.payment.status ===
                                        "PENDING" && (
                                            <div className="rounded-2xl bg-muted/50 p-4">
                                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                                    <div>
                                                        <p className="text-sm font-semibold">
                                                            Payment pending
                                                        </p>

                                                        <p className="mt-1 text-xs leading-5 text-muted-foreground">
                                                            Your payment session
                                                            has been created but
                                                            payment has not been
                                                            completed.
                                                        </p>
                                                    </div>

                                                    <Button
                                                        asChild
                                                        size="sm"
                                                        className="rounded-full"
                                                    >
                                                        <Link
                                                            href={`/payment/${request.payment.id}`}
                                                        >
                                                            Continue Payment
                                                        </Link>
                                                    </Button>
                                                </div>
                                            </div>
                                        )}

                                    {/* Other payment status */}
                                    {request.payment.status !==
                                        "COMPLETED" &&
                                        request.payment.status !==
                                        "PENDING" && (
                                            <div className="rounded-2xl bg-muted/50 p-4">
                                                <p className="text-sm font-medium">
                                                    Payment status:{" "}
                                                    {request.payment.status}
                                                </p>

                                                <p className="mt-1 text-xs text-muted-foreground">
                                                    Please check your payment
                                                    details for more
                                                    information.
                                                </p>

                                                <Button
                                                    asChild
                                                    variant="outline"
                                                    size="sm"
                                                    className="mt-4 rounded-full"
                                                >
                                                    <Link
                                                        href={`/payment/${request.payment.id}`}
                                                    >
                                                        View Payment
                                                    </Link>
                                                </Button>
                                            </div>
                                        )}
                                </>
                            )}
                        </div>
                    </section>

                    {/* Review */}
                    {request.status === "COMPLETED" && (
                        <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <h2 className="font-serif text-lg tracking-tight">
                                        Your Review
                                    </h2>

                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Share your experience with this property.
                                    </p>
                                </div>

                                {request.reviews ? (
                                    <div className="rounded-2xl bg-muted/50 px-4 py-3">
                                        <div className="flex items-center gap-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star
                                                    key={star}
                                                    className={`size-4 ${star <= request.reviews!.rating
                                                        ? "fill-yellow-400 text-yellow-400"
                                                        : "text-muted-foreground"
                                                        }`}
                                                />
                                            ))}
                                        </div>

                                        <p className="mt-2 text-sm">
                                            {request.reviews.comment}
                                        </p>

                                        <p className="mt-1 text-xs text-muted-foreground">
                                            {new Date(
                                                request.reviews.createdAt
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>
                                ) : (
                                    <ReviewDialog
                                        propertyId={request.propertyId}
                                        rentalRequestId={request.id}
                                    />
                                )}
                            </div>
                        </section>
                    )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Landlord */}
                    <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                        <h2 className="font-serif text-lg tracking-tight">
                            Landlord
                        </h2>

                        <div className="mt-5 flex items-center gap-3">
                            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-primary/10 text-primary">
                                {request.property.landlord?.photoUrl ? (
                                    <Image
                                        src={
                                            request.property.landlord
                                                .photoUrl
                                        }
                                        alt={
                                            request.property.landlord.name
                                        }
                                        fill
                                        sizes="48px"
                                        loading="lazy"
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center">
                                        <User className="h-5 w-5" />
                                    </div>
                                )}
                            </div>

                            <div>
                                <p className="font-medium">
                                    {request.property.landlord.name}
                                </p>

                                <p className="text-sm text-muted-foreground">
                                    {request.property.landlord.email}
                                </p>
                            </div>
                        </div>

                        {request.property.landlord.phone && (
                            <p className="mt-4 text-sm text-muted-foreground">
                                {request.property.landlord.phone}
                            </p>
                        )}
                    </section>

                    {/* Request Status */}
                    <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                        <h2 className="font-serif text-lg tracking-tight">
                            Request Status
                        </h2>

                        <div className="mt-4 flex items-center gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <StatusIcon className="h-4 w-4" />
                            </div>

                            <div>
                                <p className="text-sm font-medium">
                                    {status.label}
                                </p>

                                <p className="text-xs text-muted-foreground">
                                    {request.status === "PENDING"
                                        ? "Waiting for landlord approval"
                                        : request.status === "APPROVED"
                                            ? "Approved — payment required"
                                            : request.status === "ACTIVE"
                                                ? "Your rental is active"
                                                : `Request ${request.status.toLowerCase()}`}
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}