"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Check, Loader2, X } from "lucide-react";
import { toast } from "sonner";

import { updateRentalStatus } from "../../_actions/landlordRentalAction";
import { Button } from "@/components/ui/button";

type RentalRequestActionsProps = {
    requestId: string;
    status: string;
};

export default function RentalRequestActions({
    requestId,
    status,
}: RentalRequestActionsProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleStatusUpdate = (
        newStatus: "APPROVED" | "REJECTED" | "COMPLETED"
    ) => {
        startTransition(async () => {
            try {
                await updateRentalStatus(requestId, {
                    status: newStatus,
                });

                const messages = {
                    APPROVED: "Rental request approved.",
                    REJECTED: "Rental request rejected.",
                    COMPLETED: "Rental marked as completed.",
                };

                toast.success(messages[newStatus]);

                router.refresh();
            } catch (error) {
                toast.error(
                    error instanceof Error
                        ? error.message
                        : "Failed to update rental request."
                );
            }
        });
    };

    if (status === "PENDING") {
        return (
            <div className="flex flex-col gap-2 sm:flex-row">
                <Button
                    size="sm"
                    onClick={() =>
                        handleStatusUpdate("APPROVED")
                    }
                    disabled={isPending}
                >
                    {isPending ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <Check className="mr-2 h-4 w-4" />
                    )}

                    Approve
                </Button>

                <Button
                    size="sm"
                    variant="destructive"
                    onClick={() =>
                        handleStatusUpdate("REJECTED")
                    }
                    disabled={isPending}
                >
                    {isPending ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <X className="mr-2 h-4 w-4" />
                    )}

                    Reject
                </Button>
            </div>
        );
    }

    if (status === "ACTIVE") {
        return (
            <Button
                size="sm"
                onClick={() =>
                    handleStatusUpdate("COMPLETED")
                }
                disabled={isPending}
            >
                {isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <Check className="mr-2 h-4 w-4" />
                )}

                Mark as Completed
            </Button>
        );
    }

    return null;
}