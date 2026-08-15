import { Home, PlusCircle } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import { Property } from "@/lib/types";
import { PropertyCard } from "./PropertyCard";

interface PropertyListProps {
    properties: Property[];
    onEdit: (property: Property) => void;
    onDelete: (propertyId: string) => void;
}

export function PropertyList({
    properties,
    onEdit,
    onDelete,
}: PropertyListProps) {
    if (properties.length === 0) {
        return <EmptyPropertyState />;
    }

    return (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {properties.map((property) => (
                <PropertyCard
                    key={property.id}
                    property={property}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}

function EmptyPropertyState() {
    return (
        <Card className="overflow-hidden rounded-2xl border border-dashed border-border bg-card shadow-sm">
            <CardContent className="relative flex flex-col items-center justify-center overflow-hidden px-6 py-20 text-center">
                {/* Soft glow accent, matches Hero */}
                <div
                    className="pointer-events-none absolute -top-10 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
                    aria-hidden="true"
                />

                <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Home className="h-7 w-7" />
                </div>

                <h3 className="relative mt-5 font-serif text-xl tracking-tight text-foreground">
                    No properties yet
                </h3>

                <p className="relative mt-1.5 max-w-xs text-sm text-muted-foreground">
                    Add your first property to start building your listings and reach renters.
                </p>

                <div className="relative mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm">
                    <PlusCircle className="h-4 w-4" />
                    Add your first property
                </div>
            </CardContent>
        </Card>
    );
}