"use client";

import { useTransition } from "react";
import { CreditCard, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { createCheckoutSession } from "../../_actions/paymentAction";
import { Button } from "@/components/ui/button";

type PayNowButtonProps = {
    rentalRequestId: string;
    disabled?: boolean;
};

export default function PayNowButton({
    rentalRequestId,
    disabled = false,
}: PayNowButtonProps) {
    const [isPending, startTransition] = useTransition();

    const handlePayment = () => {
        startTransition(async () => {
            try {
                const result =
                    await createCheckoutSession(
                        rentalRequestId
                    );

                if (!result.data?.url) {
                    throw new Error(
                        "Checkout URL was not returned."
                    );
                }

                window.location.href = result.data.url;
            } catch (error) {
                toast.error(
                    error instanceof Error
                        ? error.message
                        : "Failed to start payment."
                );
            }
        });
    };

    return (
        <Button
            size="lg"
            className="w-full rounded-full shadow-sm transition-shadow hover:shadow-[0_12px_30px_-10px_hsl(var(--primary)/0.5)] sm:w-auto"
            onClick={handlePayment}
            disabled={disabled || isPending}
        >
            {isPending ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Redirecting...
                </>
            ) : (
                <>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Pay Now
                </>
            )}
        </Button>
    );
}