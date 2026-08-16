import Link from "next/link";
import { CheckCircle2, Home, Receipt } from "lucide-react";

import { Button } from "@/components/ui/button";

type PaymentSuccessPageProps = {
    searchParams: Promise<{
        session_id?: string;
    }>;
};

export default async function PaymentSuccessPage({
    searchParams,
}: PaymentSuccessPageProps) {
    const { session_id } = await searchParams;

    return (
        <div className="flex min-h-[70vh] items-center justify-center px-4">
            <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-border bg-card p-8 text-center shadow-[0_24px_70px_-28px_hsl(var(--primary)/0.35)]">
                <div
                    className="pointer-events-none absolute -top-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
                    aria-hidden="true"
                />

                <div className="relative">
                    <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary ring-4 ring-primary/10">
                        <CheckCircle2 className="size-8" />
                    </div>

                    <h1 className="mt-6 font-serif text-2xl tracking-tight">
                        Payment Successful
                    </h1>

                    <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
                        Your payment has been submitted successfully.
                        Your rental will become active once Stripe
                        confirms the payment through the payment webhook.
                    </p>

                    {session_id && (
                        <div className="mt-5 rounded-2xl border border-dashed border-border bg-background/60 p-4 text-left">
                            <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                Stripe Session ID
                            </p>

                            <p className="mt-1 break-all font-mono text-xs">
                                {session_id}
                            </p>
                        </div>
                    )}

                    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                        <Button asChild className="rounded-full shadow-sm transition-shadow hover:shadow-[0_12px_30px_-10px_hsl(var(--primary)/0.5)]">
                            <Link href="/payment">
                                <Receipt className="mr-2 h-4 w-4" />
                                View Payments
                            </Link>
                        </Button>

                        <Button asChild variant="outline" className="rounded-full border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground">
                            <Link href="/dashboard">
                                <Home className="mr-2 h-4 w-4" />
                                Dashboard
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}