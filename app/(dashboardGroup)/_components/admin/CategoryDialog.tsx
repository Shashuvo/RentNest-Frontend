"use client";

import { useState } from "react";
import { Plus, Tags } from "lucide-react";
import { toast } from "sonner";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface CategoryDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (name: string) => Promise<void>;
}

export function CategoryDialog({
    open,
    onOpenChange,
    onSubmit,
}: CategoryDialogProps) {
    const [name, setName] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleOpenChange = (nextOpen: boolean) => {
        if (!nextOpen) {
            setName("");
        }

        onOpenChange(nextOpen);
    };

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        const trimmedName = name.trim();

        if (!trimmedName) {
            return;
        }

        try {
            setSubmitting(true);

            await onSubmit(trimmedName);

            setName("");

            toast.success("Category created", {
                description: `"${trimmedName}" is now available for properties.`,
            });
        } catch (error) {
            toast.error("Failed to create category", {
                description:
                    error instanceof Error
                        ? error.message
                        : "Please try again.",
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Dialog
            open={open}
            onOpenChange={handleOpenChange}
        >
            <DialogContent className="overflow-hidden rounded-3xl border border-border shadow-[0_24px_70px_-28px_hsl(var(--primary)/0.35)] sm:max-w-md">
                <div className="relative">
                    {/* Ambient glow accent */}
                    <div
                        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl"
                        aria-hidden="true"
                    />
                    {/* Decorative corner circle */}
                    <div
                        className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-accent/5 blur-2xl"
                        aria-hidden="true"
                    />

                    <DialogHeader className="relative">
                        <div className="mb-1 flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary ring-4 ring-primary/10">
                            <Tags className="h-5 w-5" />
                        </div>

                        <DialogTitle className="font-serif text-lg tracking-tight">
                            Add Category
                        </DialogTitle>

                        <DialogDescription>
                            Create a new property category.
                        </DialogDescription>
                    </DialogHeader>

                    <form
                        onSubmit={handleSubmit}
                        className="relative space-y-5"
                    >
                        <div className="space-y-2">
                            <label
                                htmlFor="category-name"
                                className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground"
                            >
                                Category Name
                            </label>

                            <Input
                                id="category-name"
                                placeholder="e.g. Apartment"
                                value={name}
                                onChange={(event) =>
                                    setName(event.target.value)
                                }
                                disabled={submitting}
                                autoFocus
                                className="h-11 rounded-full border border-border bg-background text-sm shadow-sm transition-colors focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary"
                            />
                        </div>

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() =>
                                    handleOpenChange(false)
                                }
                                disabled={submitting}
                                className="rounded-full border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground"
                            >
                                Cancel
                            </Button>

                            <Button
                                type="submit"
                                disabled={
                                    submitting ||
                                    !name.trim()
                                }
                                className="rounded-full shadow-sm transition-shadow hover:shadow-[0_12px_30px_-10px_hsl(var(--primary)/0.5)]"
                            >
                                <Plus className="mr-2 h-4 w-4" />

                                {submitting
                                    ? "Creating..."
                                    : "Create Category"}
                            </Button>
                        </DialogFooter>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}