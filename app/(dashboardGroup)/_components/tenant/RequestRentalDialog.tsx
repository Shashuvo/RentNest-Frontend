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
            <Button disabled className="w-full">
                Property Unavailable
            </Button>
        );
    }

    if (submitted) {
        return (
            <Button disabled className="w-full">
                Request Submitted
            </Button>
        );
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="w-full">
                    Request to Rent
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>
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

                <div className="space-y-5 py-2">
                    {/* Message */}
                    <div className="space-y-2">
                        <label
                            htmlFor="rental-message"
                            className="flex items-center gap-2 text-sm font-medium"
                        >
                            <MessageSquare className="h-4 w-4" />
                            Message
                            <span className="text-xs font-normal text-muted-foreground">
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
                        />

                        <p className="text-right text-xs text-muted-foreground">
                            {message.length}/300
                        </p>
                    </div>

                    {/* Move-in date */}
                    <div className="space-y-2">
                        <label
                            htmlFor="move-in-date"
                            className="flex items-center gap-2 text-sm font-medium"
                        >
                            <CalendarDays className="h-4 w-4" />
                            Preferred Move-in Date
                            <span className="text-xs font-normal text-muted-foreground">
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
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => setOpen(false)}
                        disabled={isPending}
                    >
                        Cancel
                    </Button>

                    <Button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isPending}
                    >
                        {isPending && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}

                        {isPending
                            ? "Submitting..."
                            : "Submit Request"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}