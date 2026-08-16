import Link from "next/link";
import Image from "next/image";
import {
    ArrowRight,
    CalendarDays,
    CreditCard,
    Home,
} from "lucide-react";

import { getMyPayments } from "../_actions/paymentAction";
import { Button } from "@/components/ui/button";

const getStatusClasses = (status: string) => {
    switch (status) {
        case "COMPLETED":
            return "bg-green-100 text-green-700";

        case "PENDING":
            return "bg-yellow-100 text-yellow-700";

        case "FAILED":
        case "CANCELLED":
            return "bg-red-100 text-red-700";

        default:
            return "bg-muted text-muted-foreground";
    }
};

export default async function PaymentPage() {
    const result = await getMyPayments();
    const payments = result.data;

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8 flex items-center gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary ring-4 ring-primary/5">
                    <CreditCard className="size-5" />
                </span>

                <div>
                    <h1 className="font-serif text-3xl tracking-tight">
                        My Payments
                    </h1>

                    <p className="mt-1.5 text-sm text-muted-foreground">
                        View your rental payment history and payment
                        status.
                    </p>
                </div>
            </div>

            {payments.length === 0 ? (
                <div className="relative flex min-h-64 flex-col items-center justify-center overflow-hidden rounded-3xl border border-dashed border-border bg-card/40 p-8 text-center">
                    <div
                        className="pointer-events-none absolute -top-10 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
                        aria-hidden="true"
                    />

                    <div className="relative flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary ring-4 ring-primary/10">
                        <CreditCard className="size-6" />
                    </div>

                    <h2 className="relative mt-5 font-serif text-xl tracking-tight">
                        No payments yet
                    </h2>

                    <p className="relative mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                        Your rental payments will appear here once you
                        have an approved rental request.
                    </p>

                    <Button asChild className="relative mt-5 rounded-full shadow-sm transition-shadow hover:shadow-[0_12px_30px_-10px_hsl(var(--primary)/0.5)]">
                        <Link href="/rental-requests">
                            View Rental Requests
                        </Link>
                    </Button>
                </div>
            ) : (
                <div className="space-y-4">
                    {payments.map((payment) => (
                        <div
                            key={payment.id}
                            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-[0_20px_45px_-20px_hsl(var(--primary)/0.35)]"
                        >
                            {/* Decorative corner circle */}
                            <div
                                className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/5 transition-transform duration-300 group-hover:scale-150"
                                aria-hidden="true"
                            />

                            <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                                {/* Property */}
                                <div className="flex items-center gap-4">
                                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-primary/10 text-primary">
                                        {payment.rentalRequest.property
                                            .images?.[0] ? (
                                            <Image
                                                src={
                                                    payment
                                                        .rentalRequest
                                                        .property
                                                        .images[0]
                                                }
                                                alt={
                                                    payment
                                                        .rentalRequest
                                                        .property
                                                        .title
                                                }
                                                fill
                                                sizes="56px"
                                                loading="lazy"
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center">
                                                <Home className="h-5 w-5" />
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <h2 className="font-serif text-lg tracking-tight">
                                            {
                                                payment
                                                    .rentalRequest
                                                    .property
                                                    .title
                                            }
                                        </h2>

                                        <p className="mt-1 text-sm text-muted-foreground">
                                            {
                                                payment
                                                    .rentalRequest
                                                    .property
                                                    .city
                                            }
                                        </p>
                                    </div>
                                </div>

                                {/* Amount + Status */}
                                <div className="flex items-center justify-between gap-6 md:justify-end">
                                    <div>
                                        <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                            Amount
                                        </p>

                                        <p className="mt-1 font-serif text-base">
                                            ৳
                                            {payment.amount.toLocaleString()}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                            Status
                                        </p>

                                        <span
                                            className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-medium ${getStatusClasses(
                                                payment.status
                                            )}`}
                                        >
                                            {payment.status}
                                        </span>
                                    </div>

                                    <Button
                                        asChild
                                        variant="outline"
                                        size="icon"
                                        className="rounded-full border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground"
                                    >
                                        <Link
                                            href={`/payment/${payment.id}`}
                                        >
                                            <ArrowRight className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                </div>
                            </div>

                            {/* Date */}
                            <div className="relative mt-4 flex items-center gap-2 border-t border-border pt-4 text-xs text-muted-foreground">
                                <CalendarDays className="h-4 w-4" />

                                <span>
                                    Created{" "}
                                    {new Date(
                                        payment.createdAt
                                    ).toLocaleDateString()}
                                </span>

                                {payment.paidAt && (
                                    <>
                                        <span>•</span>

                                        <span>
                                            Paid{" "}
                                            {new Date(
                                                payment.paidAt
                                            ).toLocaleDateString()}
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}