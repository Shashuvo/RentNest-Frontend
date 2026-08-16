import Link from "next/link";
import {
    ArrowLeft,
    CalendarDays,
    CheckCircle2,
    CreditCard,
    Home,
    MapPin,
    Receipt,
} from "lucide-react";
import { notFound } from "next/navigation";

import { getPaymentById } from "../../_actions/paymentAction";
import PayNowButton from "@/app/(dashboardGroup)/_components/tenant/PayNowButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type PaymentDetailPageProps = {
    params: Promise<{
        paymentId: string;
    }>;
};

const getStatusVariant = (status: string) => {
    switch (status) {
        case "COMPLETED":
            return "default" as const;

        case "PENDING":
            return "secondary" as const;

        case "FAILED":
        case "CANCELLED":
            return "destructive" as const;

        default:
            return "outline" as const;
    }
};

export default async function PaymentDetailPage({
    params,
}: PaymentDetailPageProps) {
    const { paymentId } = await params;

    let payment;

    try {
        const result = await getPaymentById(paymentId);
        payment = result.data;
    } catch {
        notFound();
    }

    const property = payment.rentalRequest.property;

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Back */}
            <Button
                asChild
                variant="ghost"
                className="mb-6 -ml-3"
            >
                <Link href="/payment">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Payments
                </Link>
            </Button>

            <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
                {/* Main */}
                <div className="space-y-6">
                    {/* Property */}
                    <div className="overflow-hidden rounded-2xl border bg-card">
                        <div className="relative aspect-[16/7] overflow-hidden bg-muted">
                            {property.images?.[0] ? (
                                <img
                                    src={property.images[0]}
                                    alt={property.title}
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
                                    <h1 className="text-2xl font-semibold tracking-tight">
                                        {property.title}
                                    </h1>

                                    <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                                        <MapPin className="h-4 w-4" />
                                        {property.address},{" "}
                                        {property.city}
                                    </p>
                                </div>

                                <Badge
                                    variant={getStatusVariant(
                                        payment.status
                                    )}
                                >
                                    {payment.status}
                                </Badge>
                            </div>
                        </div>
                    </div>

                    {/* Payment Information */}
                    <div className="rounded-2xl border bg-card p-6">
                        <div className="mb-5 flex items-center gap-2">
                            <Receipt className="h-5 w-5 text-primary" />

                            <h2 className="font-semibold">
                                Payment Information
                            </h2>
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2">
                            <div>
                                <p className="text-xs text-muted-foreground">
                                    Amount
                                </p>

                                <p className="mt-1 text-lg font-semibold">
                                    $
                                    {payment.amount.toLocaleString()}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-muted-foreground">
                                    Payment Status
                                </p>

                                <div className="mt-1">
                                    <Badge
                                        variant={getStatusVariant(
                                            payment.status
                                        )}
                                    >
                                        {payment.status}
                                    </Badge>
                                </div>
                            </div>

                            <div>
                                <p className="text-xs text-muted-foreground">
                                    Created
                                </p>

                                <p className="mt-1 flex items-center gap-2 text-sm">
                                    <CalendarDays className="h-4 w-4 text-muted-foreground" />
                                    {new Date(
                                        payment.createdAt
                                    ).toLocaleDateString()}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-muted-foreground">
                                    Paid At
                                </p>

                                <p className="mt-1 text-sm">
                                    {payment.paidAt
                                        ? new Date(
                                              payment.paidAt
                                          ).toLocaleDateString()
                                        : "Not paid yet"}
                                </p>
                            </div>
                        </div>

                        {payment.transactionId && (
                            <div className="mt-5 border-t pt-5">
                                <p className="text-xs text-muted-foreground">
                                    Transaction ID
                                </p>

                                <p className="mt-1 break-all font-mono text-xs">
                                    {payment.transactionId}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Rental Information */}
                    <div className="rounded-2xl border bg-card p-6">
                        <h2 className="mb-5 font-semibold">
                            Rental Information
                        </h2>

                        <div className="grid gap-5 sm:grid-cols-2">
                            <div>
                                <p className="text-xs text-muted-foreground">
                                    Rental Request
                                </p>

                                <p className="mt-1 font-mono text-xs">
                                    {payment.rentalRequest.id}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-muted-foreground">
                                    Request Status
                                </p>

                                <Badge
                                    variant="outline"
                                    className="mt-1"
                                >
                                    {payment.rentalRequest.status}
                                </Badge>
                            </div>

                            <div>
                                <p className="text-xs text-muted-foreground">
                                    Preferred Move-in
                                </p>

                                <p className="mt-1 text-sm">
                                    {payment.rentalRequest.moveInDate
                                        ? new Date(
                                              payment.rentalRequest.moveInDate
                                          ).toLocaleDateString()
                                        : "Not specified"}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-muted-foreground">
                                    Monthly Rent
                                </p>

                                <p className="mt-1 text-sm font-medium">
                                    $
                                    {property.price.toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:sticky lg:top-8 lg:self-start">
                    <div className="rounded-2xl border bg-card p-6 shadow-sm">
                        {payment.status === "COMPLETED" ? (
                            <div className="text-center">
                                <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary/10">
                                    <CheckCircle2 className="size-7 text-primary" />
                                </div>

                                <h2 className="mt-4 text-lg font-semibold">
                                    Payment Completed
                                </h2>

                                <p className="mt-2 text-sm text-muted-foreground">
                                    Your payment for this rental has
                                    been successfully completed.
                                </p>
                            </div>
                        ) : (
                            <>
                                <div className="flex items-center gap-3">
                                    <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10">
                                        <CreditCard className="size-5 text-primary" />
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold">
                                            Complete Payment
                                        </p>

                                        <p className="text-xs text-muted-foreground">
                                            Secure Stripe checkout
                                        </p>
                                    </div>
                                </div>

                                <div className="my-5 border-t" />

                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">
                                        Total
                                    </span>

                                    <span className="text-xl font-semibold">
                                        $
                                        {payment.amount.toLocaleString()}
                                    </span>
                                </div>

                                <PayNowButton
                                    rentalRequestId={
                                        payment.rentalRequestId
                                    }
                                    disabled={
                                        payment.rentalRequest
                                            .status !== "APPROVED"
                                    }
                                />

                                {payment.rentalRequest.status !==
                                    "APPROVED" && (
                                    <p className="mt-3 text-center text-xs text-muted-foreground">
                                        Payment is available only after
                                        your rental request is approved.
                                    </p>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}