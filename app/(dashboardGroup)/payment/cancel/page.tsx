import Link from "next/link";
import { ArrowLeft, CreditCard } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function PaymentCancelPage() {
    return (
        <div className="flex min-h-[70vh] items-center justify-center px-4">
            <div className="w-full max-w-lg rounded-2xl border bg-card p-8 text-center shadow-sm">
                <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-muted">
                    <CreditCard className="size-8 text-muted-foreground" />
                </div>

                <h1 className="mt-6 text-2xl font-semibold">
                    Payment Cancelled
                </h1>

                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
                    Your payment was cancelled or you returned from
                    Stripe without completing the checkout.
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <Button asChild>
                        <Link href="/payment">
                            <CreditCard className="mr-2 h-4 w-4" />
                            Back to Payments
                        </Link>
                    </Button>

                    <Button asChild variant="outline">
                        <Link href="/rental-requests">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Rental Requests
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}