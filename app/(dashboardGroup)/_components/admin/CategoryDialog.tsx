"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

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
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Dialog
            open={open}
            onOpenChange={handleOpenChange}
        >
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        Add Category
                    </DialogTitle>

                    <DialogDescription>
                        Create a new property category.
                    </DialogDescription>
                </DialogHeader>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >
                    <div className="space-y-2">
                        <label
                            htmlFor="category-name"
                            className="text-sm font-medium"
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
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            disabled={
                                submitting ||
                                !name.trim()
                            }
                        >
                            <Plus className="mr-2 h-4 w-4" />

                            {submitting
                                ? "Creating..."
                                : "Create Category"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}