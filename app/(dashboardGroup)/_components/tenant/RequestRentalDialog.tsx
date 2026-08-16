"use client";

import { useState, useTransition } from "react";
import { CalendarDays, Loader2, MessageSquare } from "lucide-react";
import { toast } from "sonner";

import { createRentalRequest } from "../../_actions/rentalAction";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type RequestRentalDialogProps = {
    propertyId: string;
    propertyTitle: string;
    isAvailable: boolean;
};

export default function RequestRentalDialog({
    propertyId,
    propertyTitle,
    isAvailable,
}: RequestRentalDialogProps) {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [moveInDate, setMoveInDate] = useState("");
    const [isPending, startTransition] = useTransition();
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = () => {
        startTransition(async () => {
            try {
                await createRentalRequest({
                    propertyId,
                    message: message.trim() || undefined,
                    moveInDate: moveInDate || undefined,
                });

                toast.success("Rental request submitted successfully.");

                setSubmitted(true);
                setOpen(false);
                setMessage("");
                setMoveInDate("");
            } catch (error) {
                toast.error(
                    error instanceof Error
                        ? error.message
                        : "Failed to submit rental request."
                );
            }
        });
    };

    if (!isAvailable) {
        return (
            <Button disabled className="w-full rounded-full">
                Property Unavailable
            </Button>
        );
    }

    if (submitted) {
        return (
            <Button disabled className="w-full rounded-full">
                Request Submitted
            </Button>
        );
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="w-full rounded-full shadow-sm transition-shadow hover:shadow-[0_12px_30px_-10px_hsl(var(--primary)/0.5)]">
                    Request to Rent
                </Button>
            </DialogTrigger>

            <DialogContent className="overflow-hidden rounded-3xl border border-border shadow-[0_24px_70px_-28px_hsl(var(--primary)/0.35)] sm:max-w-lg">
                <div className="relative">
                    {/* Ambient glow accent */}
                    <div
                        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl"
                        aria-hidden="true"
                    />

                    <DialogHeader className="relative">
                        <div className="mb-1 flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary ring-4 ring-primary/10">
                            <CalendarDays className="h-5 w-5" />
                        </div>

                        <DialogTitle className="font-serif text-lg tracking-tight">
                            Request to Rent
                        </DialogTitle>

                        <DialogDescription>
                            Send a rental request for{" "}
                            <span className="font-medium text-foreground">
                                {propertyTitle}
                            </span>
                            .
                        </DialogDescription>
                    </DialogHeader>

                    <div className="relative space-y-5 py-2">
                        {/* Message */}
                        <div className="space-y-2">
                            <label
                                htmlFor="rental-message"
                                className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground"
                            >
                                <MessageSquare className="h-3.5 w-3.5" />
                                Message
                                <span className="text-[11px] font-normal normal-case text-muted-foreground">
                                    (Optional)
                                </span>
                            </label>

                            <Textarea
                                id="rental-message"
                                placeholder="Tell the landlord why you are interested in this property..."
                                value={message}
                                onChange={(event) =>
                                    setMessage(event.target.value)
                                }
                                maxLength={300}
                                disabled={isPending}
                                rows={4}
                                className="resize-none rounded-2xl border border-border bg-background text-sm shadow-sm transition-colors focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary"
                            />

                            <p className="text-right text-xs text-muted-foreground">
                                {message.length}/300
                            </p>
                        </div>

                        {/* Move-in date */}
                        <div className="space-y-2">
                            <label
                                htmlFor="move-in-date"
                                className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground"
                            >
                                <CalendarDays className="h-3.5 w-3.5" />
                                Preferred Move-in Date
                                <span className="text-[11px] font-normal normal-case text-muted-foreground">
                                    (Optional)
                                </span>
                            </label>

                            <Input
                                id="move-in-date"
                                type="date"
                                value={moveInDate}
                                onChange={(event) =>
                                    setMoveInDate(event.target.value)
                                }
                                disabled={isPending}
                                className="h-11 rounded-full border border-border bg-background text-sm shadow-sm transition-colors focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary"
                            />
                        </div>
                    </div>

                    <DialogFooter className="relative">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                            disabled={isPending}
                            className="rounded-full border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground"
                        >
                            Cancel
                        </Button>

                        <Button
                            type="button"
                            onClick={handleSubmit}
                            disabled={isPending}
                            className="rounded-full shadow-sm transition-shadow hover:shadow-[0_12px_30px_-10px_hsl(var(--primary)/0.5)]"
                        >
                            {isPending && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}

                            {isPending
                                ? "Submitting..."
                                : "Submit Request"}
                        </Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
}