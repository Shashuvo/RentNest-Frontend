"use client";

import { LayoutDashboard, LucideIcon, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
    title: string;
    description?: string;
    actionLabel?: string;
    onAction?: () => void;
    icon?: LucideIcon;
}

export function DashboardHeader({
    title,
    description,
    actionLabel,
    onAction,
    icon: Icon = LayoutDashboard,
}: DashboardHeaderProps) {
    return (
        <div className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-center gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary ring-4 ring-primary/5">
                    <Icon className="size-5" />
                </span>

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