import { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
    title: string;
    value: string | number;
    description?: string;
    icon: LucideIcon;
}

export function StatsCard({
    title,
    value,
    description,
    icon: Icon,
}: StatsCardProps) {
    return (
        <Card className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-24px_hsl(var(--primary)/0.4)]">
            {/* Ambient glow accent */}
            <div
                className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/10 blur-3xl transition-opacity duration-300 group-hover:opacity-80"
                aria-hidden="true"
            />

            <CardContent className="relative p-6">
                <div className="flex items-center justify-between gap-4">
                    <div className="space-y-2">
                        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                            {title}
                        </p>

                        <p className="font-serif text-4xl tracking-tight text-foreground">
                            {value}
                        </p>

                        {description && (
                            <p className="text-sm text-muted-foreground">
                                {description}
                            </p>
                        )}
                    </div>

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/15 transition-transform duration-300 group-hover:scale-110">
                        <Icon className="h-5.5 w-5.5" />
                    </div>
                </div>

                {/* Bottom accent line */}
                <div className="mt-4 h-1 w-10 rounded-full bg-primary/20 transition-all duration-300 group-hover:w-16 group-hover:bg-primary/40" />
            </CardContent>
        </Card>
    );
}