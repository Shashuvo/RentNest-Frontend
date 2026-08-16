"use client";

import { useState, useTransition } from "react";
import { Loader2, Star } from "lucide-react";
import { toast } from "sonner";

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
import { Textarea } from "@/components/ui/textarea";

import { createReview } from "../../_actions/reviewAction";

type ReviewDialogProps = {
    propertyId: string;
    rentalRequestId: string;
};

export default function ReviewDialog({
    propertyId,
    rentalRequestId,
}: ReviewDialogProps) {
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [isPending, startTransition] = useTransition();

    const handleSubmit = () => {
        if (rating < 1 || rating > 5) {
            toast.error("Please select a rating.");
            return;
        }

        if (!comment.trim()) {
            toast.error("Please write a comment.");
            return;
        }

        startTransition(async () => {
            try {
                await createReview({
                    propertyId,
                    rentalRequestId,
                    rating,
                    comment: comment.trim(),
                });

                toast.success("Review submitted successfully.");

                setRating(0);
                setComment("");
                setOpen(false);

                window.location.reload();
            } catch (error) {
                toast.error(
                    error instanceof Error
                        ? error.message
                        : "Failed to submit review."
                );
            }
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="rounded-full shadow-sm transition-shadow hover:shadow-[0_12px_30px_-10px_hsl(var(--primary)/0.5)]">
                    <Star className="mr-2 h-4 w-4" />
                    Leave a Review
                </Button>
            </DialogTrigger>

            <DialogContent className="overflow-hidden rounded-3xl border border-border shadow-[0_24px_70px_-28px_hsl(var(--primary)/0.35)] sm:max-w-md">
                <div className="relative">
                    {/* Ambient glow accent */}
                    <div
                        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl"
                        aria-hidden="true"
                    />

                    <DialogHeader className="relative">
                        <div className="mb-1 flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary ring-4 ring-primary/10">
                            <Star className="h-5 w-5" />
                        </div>

                        <DialogTitle className="font-serif text-lg tracking-tight">
                            Leave a Review
                        </DialogTitle>

                        <DialogDescription>
                            Share your experience with this property.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="relative space-y-6 py-2">
                        {/* Rating */}
                        <div>
                            <p className="mb-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                Your Rating
                            </p>

                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((value) => (
                                    <button
                                        key={value}
                                        type="button"
                                        onClick={() =>
                                            setRating(value)
                                        }
                                        className="rounded-full p-1.5 transition-colors hover:bg-primary/10"
                                        aria-label={`${value} star${value > 1 ? "s" : ""}`}
                                    >
                                        <Star
                                            className={`size-7 ${value <= rating
                                                ? "fill-yellow-400 text-yellow-400"
                                                : "text-muted-foreground"
                                                }`}
                                        />
                                    </button>
                                ))}
                            </div>

                            {rating > 0 && (
                                <p className="mt-2 text-xs text-muted-foreground">
                                    {rating} out of 5
                                </p>
                            )}
                        </div>

                        {/* Comment */}
                        <div>
                            <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                Your Review
                            </p>

                            <Textarea
                                value={comment}
                                onChange={(event) =>
                                    setComment(event.target.value)
                                }
                                placeholder="Tell us about your experience..."
                                maxLength={500}
                                rows={5}
                                className="resize-none rounded-2xl border border-border bg-background text-sm shadow-sm transition-colors focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary"
                            />

                            <p className="mt-1 text-right text-xs text-muted-foreground">
                                {comment.length}/500
                            </p>
                        </div>
                    </div>

                    <DialogFooter className="relative">
                        <Button
                            variant="outline"
                            onClick={() => setOpen(false)}
                            disabled={isPending}
                            className="rounded-full border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground"
                        >
                            Cancel
                        </Button>

                        <Button
                            onClick={handleSubmit}
                            disabled={
                                isPending ||
                                rating === 0 ||
                                !comment.trim()
                            }
                            className="rounded-full shadow-sm transition-shadow hover:shadow-[0_12px_30px_-10px_hsl(var(--primary)/0.5)]"
                        >
                            {isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    <Star className="mr-2 h-4 w-4" />
                                    Submit Review
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
}