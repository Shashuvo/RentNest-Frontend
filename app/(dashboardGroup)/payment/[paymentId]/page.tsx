import Link from "next/link";
import {
    ArrowLeft,
    CalendarDays,
    CheckCircle2,
    Clock3,
    CreditCard,
    Hash,
    MapPin,
    Receipt,
} from "lucide-react";
import { notFound } from "next/navigation";

import { getPaymentById } from "../../_actions/paymentAction";
import PayNowButton from "@/app/(dashboardGroup)/_components/tenant/PayNowButton";
import { Button } from "@/components/ui/button";
import { PropertyImageCarousel } from "@/app/(dashboardGroup)/_components/shared/PropertyImageCarousel";

type PaymentDetailPageProps = {
    params: Promise<{
        paymentId: string;
    }>;
};

const getStatusClasses = (status: string) => {
    switch (status) {
        case "APPROVED":
            return "border-2 border-blue-600 bg-card text-blue-700 shadow-sm";

        case "ACTIVE":
            return "border-2 border-green-600 bg-card text-green-700 shadow-sm";

        case "PENDING":
            return "border-2 border-yellow-600 bg-card text-yellow-700 shadow-sm";

        case "COMPLETED":
            return "border-2 border-gray-400 bg-card text-gray-600 shadow-sm";

        case "FAILED":
        case "CANCELLED":
        case "REJECTED":
            return "border-2 border-red-600 bg-card text-red-700 shadow-sm";

        default:
            return "border-2 border-border bg-card text-muted-foreground shadow-sm";
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
        <div className="container mx-auto max-w-full overflow-x-hidden px-4 py-8">
            {/* Back */}
            <Button
                asChild
                variant="ghost"
                className="mb-6 -ml-3 rounded-full"
            >
                <Link href="/payment">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Payments
                </Link>
            </Button>

            {/* Header */}
            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div className="flex min-w-0 items-center gap-4">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary ring-4 ring-primary/5">
                        <Receipt className="size-5" />
                    </span>

                    <div className="min-w-0">
                        <h1 className="font-serif text-3xl tracking-tight">
                            Payment Details
                        </h1>

                        <p className="mt-1.5 text-sm text-muted-foreground">
                            Review the payment and rental details for this
                            transaction.
                        </p>
                    </div>
                </div>

                <span
                    className={`w-fit shrink-0 rounded-full px-3 py-1.5 text-xs font-medium ${getStatusClasses(
                        payment.status
                    )}`}
                >
                    {payment.status}
                </span>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Main */}
                <div className="min-w-0 space-y-6 lg:col-span-2">
                    {/* Property */}
                    <div className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-[0_20px_45px_-20px_hsl(var(--primary)/0.35)]">
                        <div className="relative aspect-16/7 overflow-hidden bg-muted">
                            <PropertyImageCarousel
                                images={property.images ?? []}
                                alt={property.title}
                            />
                        </div>

                        <div className="p-6">
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                <div className="min-w-0">
                                    <h2 className="truncate font-serif text-xl tracking-tight">
                                        {property.title}
                                    </h2>

                                    <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                                        <MapPin className="h-4 w-4 shrink-0" />
                                        <span className="truncate">
                                            {property.address},{" "}
                                            {property.city}
                                        </span>
                                    </p>
                                </div>

                                <div className="shrink-0 rounded-full border border-primary/15 bg-card px-3 py-1.5 text-sm shadow-sm">
                                    <span className="font-serif">
                                        ৳{property.price.toLocaleString()}
                                    </span>
                                    <span className="text-muted-foreground">
                                        {" "}/mo
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment stat tiles */}
                    <section className="min-w-0 space-y-3">
                        <h3 className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                            Payment Summary
                        </h3>

                        <div className="grid gap-4 sm:grid-cols-3">
                            <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm">
                                <div className="flex min-w-0 items-center gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary ring-4 ring-primary/10">
                                        <Receipt className="h-5 w-5" />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                            Amount
                                        </p>

                                        <p className="mt-1 truncate font-serif text-xl">
                                            ৳{payment.amount.toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm">
                                <div className="flex min-w-0 items-center gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-yellow-500/10 text-yellow-600 ring-4 ring-yellow-500/10">
                                        <CalendarDays className="h-5 w-5" />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                            Payment Created At
                                        </p>

                                        <p className="mt-1 truncate font-serif text-xl">
                                            {new Date(
                                                payment.createdAt
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm">
                                <div className="flex min-w-0 items-center gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 ring-4 ring-green-500/10">
                                        <CheckCircle2 className="h-5 w-5" />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                            Paid At
                                        </p>

                                        <p className="mt-1 truncate font-serif text-xl">
                                            {payment.paidAt
                                                ? new Date(
                                                    payment.paidAt
                                                ).toLocaleDateString()
                                                : "—"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {payment.transactionId && (
                            <div className="flex min-w-0 items-center gap-3 rounded-full border border-border bg-card px-4 py-2.5 shadow-sm">
                                <Hash className="h-4 w-4 shrink-0 text-muted-foreground" />

                                <p className="shrink-0 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                    Transaction ID
                                </p>

                                <p className="min-w-0 flex-1 truncate font-mono text-xs text-foreground">
                                    {payment.transactionId}
                                </p>
                            </div>
                        )}
                    </section>

                    {/* Rental stat tiles */}
                    <section className="min-w-0 space-y-3">
                        <h3 className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                            Rental Summary
                        </h3>

                        <div className="grid gap-4 sm:grid-cols-3">
                            <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm">
                                <div className="flex min-w-0 items-center gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary ring-4 ring-primary/10">
                                        <Clock3 className="h-5 w-5" />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                            Request Status
                                        </p>

                                        <span
                                            className={`mt-1 inline-block max-w-full truncate rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusClasses(
                                                payment.rentalRequest.status
                                            )}`}
                                        >
                                            {payment.rentalRequest.status}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm">
                                <div className="flex min-w-0 items-center gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary ring-4 ring-primary/10">
                                        <CalendarDays className="h-5 w-5" />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                            Move-in
                                        </p>

                                        <p className="mt-1 truncate font-serif text-lg">
                                            {payment.rentalRequest.moveInDate
                                                ? new Date(
                                                    payment.rentalRequest.moveInDate
                                                ).toLocaleDateString()
                                                : "Not specified"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm">
                                <div className="flex min-w-0 items-center gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary ring-4 ring-primary/10">
                                        <Receipt className="h-5 w-5" />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                            Monthly Rent
                                        </p>

                                        <p className="mt-1 truncate font-serif text-lg">
                                            ৳{property.price.toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex min-w-0 items-center gap-3 rounded-full border border-border bg-card px-4 py-2.5 shadow-sm">
                            <Hash className="h-4 w-4 shrink-0 text-muted-foreground" />

                            <p className="shrink-0 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                Request ID
                            </p>

                            <p className="min-w-0 flex-1 truncate font-mono text-xs text-foreground">
                                {payment.rentalRequest.id}
                            </p>
                        </div>
                    </section>
                </div>

                {/* Sidebar */}
                <div className="min-w-0 lg:sticky lg:top-8 lg:self-start">
                    <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-[0_24px_70px_-28px_hsl(var(--primary)/0.35)]">
                        <div
                            className="pointer-events-none absolute -right-14 -top-14 h-40 w-40 rounded-full bg-primary/10 blur-3xl"
                            aria-hidden="true"
                        />

                        {payment.status === "COMPLETED" ? (
                            <div className="relative text-center">
                                <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary ring-4 ring-primary/10">
                                    <CheckCircle2 className="size-7" />
                                </div>

                                <h2 className="mt-4 font-serif text-lg tracking-tight">
                                    Payment Completed
                                </h2>

                                <p className="mt-2 text-sm text-muted-foreground">
                                    Your payment for this rental has
                                    been successfully completed.
                                </p>

                                <div className="mt-5 rounded-2xl border border-dashed border-border bg-background/60 p-4">
                                    <div className="flex min-w-0 items-center justify-between gap-2 text-sm">
                                        <span className="shrink-0 text-muted-foreground">
                                            Paid
                                        </span>

                                        <span className="truncate font-serif text-lg">
                                            ৳{payment.amount.toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="relative min-w-0">
                                <div className="flex min-w-0 items-center gap-3">
                                    <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary ring-4 ring-primary/10">
                                        <CreditCard className="size-5" />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-semibold">
                                            Complete Payment
                                        </p>

                                        <p className="truncate text-xs text-muted-foreground">
                                            Secure Stripe checkout
                                        </p>
                                    </div>
                                </div>

                                <div className="my-5 rounded-2xl border border-dashed border-border bg-background/60 p-4">
                                    <div className="flex min-w-0 items-center justify-between gap-2 text-sm">
                                        <span className="shrink-0 text-muted-foreground">
                                            Total due
                                        </span>

                                        <span className="truncate font-serif text-xl">
                                            ৳{payment.amount.toLocaleString()}
                                        </span>
                                    </div>
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
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}