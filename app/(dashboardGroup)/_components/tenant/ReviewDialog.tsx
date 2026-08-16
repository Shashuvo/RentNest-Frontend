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
                <Button>
                    <Star className="mr-2 h-4 w-4" />
                    Leave a Review
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Leave a Review</DialogTitle>

                    <DialogDescription>
                        Share your experience with this property.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-2">
                    {/* Rating */}
                    <div>
                        <p className="mb-3 text-sm font-medium">
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
                                    className="rounded-md p-1 transition-colors hover:bg-muted"
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
                        <p className="mb-2 text-sm font-medium">
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
                        />

                        <p className="mt-1 text-right text-xs text-muted-foreground">
                            {comment.length}/500
                        </p>
                    </div>
                </div>

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => setOpen(false)}
                        disabled={isPending}
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
            </DialogContent>
        </Dialog>
    );
}