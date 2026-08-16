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
            <div className="w-full max-w-lg rounded-2xl border bg-card p-8 text-center shadow-sm">
                <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary/10">
                    <CheckCircle2 className="size-8 text-primary" />
                </div>

                <h1 className="mt-6 text-2xl font-semibold">
                    Payment Successful
                </h1>

                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
                    Your payment has been submitted successfully.
                    Your rental will become active once Stripe
                    confirms the payment through the payment webhook.
                </p>

                {session_id && (
                    <div className="mt-5 rounded-xl bg-muted/50 p-4 text-left">
                        <p className="text-xs text-muted-foreground">
                            Stripe Session ID
                        </p>

                        <p className="mt-1 break-all font-mono text-xs">
                            {session_id}
                        </p>
                    </div>
                )}

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <Button asChild>
                        <Link href="/payment">
                            <Receipt className="mr-2 h-4 w-4" />
                            View Payments
                        </Link>
                    </Button>

                    <Button asChild variant="outline">
                        <Link href="/dashboard">
                            <Home className="mr-2 h-4 w-4" />
                            Dashboard
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}