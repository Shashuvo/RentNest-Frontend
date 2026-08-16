import Link from "next/link";
import { notFound } from "next/navigation";
import {
    ArrowLeft,
    CalendarDays,
    CheckCircle2,
    Clock3,
    CreditCard,
    MapPin,
    MessageSquare,
    Star,
    User,
    XCircle,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { getMyRentalRequestById } from "../../_actions/rentalAction";
import PayNowButton from "@/app/(dashboardGroup)/_components/tenant/PayNowButton";
import ReviewDialog from "../../_components/tenant/ReviewDialog";

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
                variant: "default" as const,
            };

        case "PENDING":
            return {
                label: "PENDING",
                icon: Clock3,
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
                label: status,
                icon: Clock3,
                variant: "outline" as const,
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
                <Button asChild variant="ghost" className="-ml-3">
                    <Link href="/rental-requests">
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
                            View the details of your rental request.
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
                                <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                                    No image available
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
                                            {request.property.address},{" "}
                                            {request.property.city}
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
                                        {request.property.category.name}
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

                    {/* Rental Request Information */}
                    <section className="rounded-2xl border bg-card p-6">
                        <h2 className="text-lg font-semibold">
                            Request Information
                        </h2>

                        <div className="mt-5 space-y-5">
                            {/* Message */}
                            <div className="flex gap-3">
                                <MessageSquare className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />

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
                                <CalendarDays className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />

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
                    </section>

                    {/* Payment */}
                    <section className="rounded-2xl border bg-card p-6">
                        <div className="flex items-center gap-3">
                            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
                                <CreditCard className="size-5 text-primary" />
                            </div>

                            <div>
                                <h2 className="font-semibold">
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
                                        <div className="rounded-xl bg-muted/50 p-4">
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
                                        <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
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
                                            <div className="rounded-xl bg-destructive/10 p-4">
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
                                        <div className="rounded-xl bg-muted/50 p-4">
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
                                            <div className="rounded-xl bg-primary/10 p-4">
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
                                            <div className="rounded-xl bg-muted/50 p-4">
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
                                            <div className="rounded-xl bg-muted/50 p-4">
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
                                                    className="mt-4"
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
                        <section className="rounded-2xl border bg-card p-6">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <h2 className="font-semibold">
                                        Your Review
                                    </h2>

                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Share your experience with this property.
                                    </p>
                                </div>

                                {request.reviews ? (
                                    <div className="rounded-xl bg-muted/50 px-4 py-3">
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
                    <section className="rounded-2xl border bg-card p-6">
                        <h2 className="text-lg font-semibold">
                            Landlord
                        </h2>

                        <div className="mt-5 flex items-center gap-3">
                            {request.property.landlord?.photoUrl ? (
                                <img
                                    src={
                                        request.property.landlord.photoUrl
                                    }
                                    alt={
                                        request.property.landlord.name
                                    }
                                    className="h-12 w-12 rounded-full object-cover"
                                />
                            ) : (
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                                    <User className="h-5 w-5 text-muted-foreground" />
                                </div>
                            )}

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
                    <section className="rounded-2xl border bg-card p-6">
                        <h2 className="text-lg font-semibold">
                            Request Status
                        </h2>

                        <div className="mt-4 flex items-center gap-3">
                            <StatusIcon className="h-5 w-5 text-muted-foreground" />

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