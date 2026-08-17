"use client";

import { Home, PlusCircle } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import {
    PropertyForm,
    PropertyFormData,
} from "./PropertyForm";

import { Category, Property } from "@/lib/types";

interface PropertyDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    property?: Property | null;
    categories: Category[];
    onSubmit: (data: PropertyFormData) => void | Promise<void>;
}

export function PropertyDialog({
    open,
    onOpenChange,
    property,
    categories,
    onSubmit,
}: PropertyDialogProps) {
    const isEditing = Boolean(property);

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent className="rounded-2xl border border-border p-0 shadow-[0_24px_60px_-24px_hsl(var(--primary)/0.4)] sm:max-w-2xl">
                <DialogHeader className="space-y-1 border-b border-border px-6 pb-5 pt-6">
                    <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                            {isEditing ? (
                                <Home className="h-5 w-5" />
                            ) : (
                                <PlusCircle className="h-5 w-5" />
                            )}
                        </span>

                        <div>
                            <DialogTitle className="font-serif text-xl tracking-tight">
                                {isEditing ? "Edit Property" : "Add Property"}
                            </DialogTitle>

                            <DialogDescription className="mt-0.5 text-sm">
                                {isEditing
                                    ? "Update your property information."
                                    : "Add a new property to your listings."}
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <div className="max-h-[70vh] overflow-y-auto px-6 py-5">
                    <PropertyForm
                        key={property?.id ?? "new"}
                        property={property}
                        categories={categories}
                        onSubmit={onSubmit}
                        onCancel={() => onOpenChange(false)}
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
}