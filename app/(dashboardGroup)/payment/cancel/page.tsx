import Link from "next/link";
import { ArrowLeft, CreditCard } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function PaymentCancelPage() {
    return (
        <div className="flex min-h-[70vh] items-center justify-center px-4">
            <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-border bg-card p-8 text-center shadow-sm">
                <div
                    className="pointer-events-none absolute -top-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-muted/60 blur-3xl"
                    aria-hidden="true"
                />

                <div className="relative">
                    <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-muted text-muted-foreground ring-4 ring-muted/60">
                        <CreditCard className="size-8" />
                    </div>

                    <h1 className="mt-6 font-serif text-2xl tracking-tight">
                        Payment Cancelled
                    </h1>

                    <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
                        Your payment was cancelled. No payment was completed, and
                        you can try again whenever you&apos;re ready.
                    </p>

                    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                        <Button asChild className="rounded-full shadow-sm transition-shadow hover:shadow-[0_12px_30px_-10px_hsl(var(--primary)/0.5)]">
                            <Link href="/payment">
                                <CreditCard className="mr-2 h-4 w-4" />
                                Back to Payments
                            </Link>
                        </Button>

                        <Button asChild variant="outline" className="rounded-full border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground">
                            <Link href="/rental-requests">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Rental Requests
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}