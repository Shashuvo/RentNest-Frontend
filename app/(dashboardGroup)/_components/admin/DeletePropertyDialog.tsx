"use client";

import { Trash2 } from "lucide-react";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DeletePropertyDialogProps {
    open: boolean;
    propertyTitle: string;
    deleting: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => Promise<void>;
}

export function DeletePropertyDialog({
    open,
    propertyTitle,
    deleting,
    onOpenChange,
    onConfirm,
}: DeletePropertyDialogProps) {
    return (
        <AlertDialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <AlertDialogContent className="overflow-hidden rounded-3xl border border-border shadow-[0_24px_70px_-28px_hsl(var(--destructive)/0.35)]">
                <div className="relative">
                    {/* Ambient glow accent */}
                    <div
                        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-destructive/10 blur-3xl"
                        aria-hidden="true"
                    />

                    <AlertDialogHeader className="relative">
                        <div className="mb-1 flex h-11 w-11 items-center justify-center rounded-full bg-destructive/10 text-destructive ring-4 ring-destructive/10">
                            <Trash2 className="h-5 w-5" />
                        </div>

                        <AlertDialogTitle className="font-serif text-lg tracking-tight">
                            Delete Property?
                        </AlertDialogTitle>

                        <AlertDialogDescription>
                            Are you sure you want to delete{" "}
                            <span className="font-medium text-foreground">
                                &quot;{propertyTitle}&quot;
                            </span>
                            ? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter className="relative">
                        <AlertDialogCancel
                            disabled={deleting}
                            className="rounded-full border-border hover:bg-muted"
                        >
                            Cancel
                        </AlertDialogCancel>

                        <AlertDialogAction
                            onClick={onConfirm}
                            disabled={deleting}
                            className="rounded-full bg-destructive text-destructive-foreground shadow-sm transition-shadow hover:bg-destructive/90 hover:shadow-[0_12px_30px_-10px_hsl(var(--destructive)/0.5)]"
                        >
                            <Trash2 className="mr-2 h-4 w-4" />

                            {deleting
                                ? "Deleting..."
                                : "Delete Property"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    );
}