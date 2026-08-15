"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface DashboardHeaderProps {
    title: string;
    description?: string;
    actionLabel?: string;
    onAction?: () => void;
}

export function DashboardHeader({
    title,
    description,
    actionLabel,
    onAction,
}: DashboardHeaderProps) {
    return (
        <div className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
                <h1 className="font-serif text-3xl tracking-tight text-foreground">
                    {title}
                </h1>

                {description && (
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                        {description}
                    </p>
                )}
            </div>

            {actionLabel && onAction && (
                <Button
                    onClick={onAction}
                    size="lg"
                    className="rounded-full px-5 shadow-sm"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    {actionLabel}
                </Button>
            )}
        </div>
    );
}