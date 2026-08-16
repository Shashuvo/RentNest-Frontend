import Link from "next/link";
import {
    ArrowRight,
    CalendarDays,
    CreditCard,
    Home,
} from "lucide-react";

import { getMyPayments } from "../_actions/paymentAction";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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

export default async function PaymentPage() {
    const result = await getMyPayments();
    const payments = result.data;

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-semibold tracking-tight">
                    My Payments
                </h1>

                <p className="mt-1 text-sm text-muted-foreground">
                    View your rental payment history and payment
                    status.
                </p>
            </div>

            {payments.length === 0 ? (
                <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed p-8 text-center">
                    <CreditCard className="mb-4 h-10 w-10 text-muted-foreground" />

                    <h2 className="text-lg font-semibold">
                        No payments yet
                    </h2>

                    <p className="mt-1 max-w-md text-sm text-muted-foreground">
                        Your rental payments will appear here once you
                        have an approved rental request.
                    </p>

                    <Button asChild className="mt-5">
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
                            className="rounded-2xl border bg-card p-5 shadow-sm"
                        >
                            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                                {/* Property */}
                                <div className="flex items-center gap-4">
                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-muted">
                                        {payment.rentalRequest.property
                                            .images?.[0] ? (
                                            <img
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
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <Home className="h-5 w-5 text-muted-foreground" />
                                        )}
                                    </div>

                                    <div>
                                        <h2 className="font-semibold">
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
                                        <p className="text-xs text-muted-foreground">
                                            Amount
                                        </p>

                                        <p className="mt-1 font-semibold">
                                            $
                                            {payment.amount.toLocaleString()}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-muted-foreground">
                                            Status
                                        </p>

                                        <Badge
                                            variant={getStatusVariant(
                                                payment.status
                                            )}
                                            className="mt-1"
                                        >
                                            {payment.status}
                                        </Badge>
                                    </div>

                                    <Button
                                        asChild
                                        variant="outline"
                                        size="icon"
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
                            <div className="mt-4 flex items-center gap-2 border-t pt-4 text-xs text-muted-foreground">
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