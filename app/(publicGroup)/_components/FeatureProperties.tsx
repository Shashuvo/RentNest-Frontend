import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import PropertyCard from "./PropertyCard";
import { Property, PropertyState } from "@/lib/types";
import { getAllProperties } from "../_actions/propertyAction";
import Link from "next/link";


const FeatureProperties = async () => {

    const propertiesRes: PropertyState = await getAllProperties();

    const properties: Property[] = propertiesRes.data;


    return (
        <section
            id="featured-properties"
            className="relative overflow-hidden border-t border-border/70 bg-card/40 px-6 py-20 lg:px-12 xl:px-16"
        >
            {/* Ambient glow accent */}
            <div
                className="pointer-events-none absolute -left-24 top-0 h-80 w-80 rounded-full bg-primary/10 blur-3xl"
                aria-hidden="true"
            />

            <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-10">
                {/* Section Header */}
                <div className="flex flex-col gap-3">
                    <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/15 bg-card px-3 py-1.5 text-xs font-medium tracking-wide text-primary shadow-sm">
                        <Sparkles className="size-3.5" />
                        Featured Properties
                    </div>

                    <h2 className="max-w-2xl font-serif text-4xl tracking-[-0.035em] text-foreground sm:text-5xl">
                        Explore Featured Properties
                    </h2>

                    <p className="max-w-xl text-base leading-7 text-muted-foreground">
                        Find your next home from our selection of rental
                        properties.
                    </p>
                </div>

                {/* Property Cards */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {properties.map((property) => (
                        <PropertyCard
                            key={property.id}
                            property={property}
                        />
                    ))}
                </div>

                {/* View All Button */}
                <div className="flex justify-center pt-2">
                    <Link href="/properties">
                        <Button
                            size="lg"
                            variant="outline"
                            className="group gap-2 rounded-full border-primary/20 bg-background px-6 text-primary shadow-sm hover:bg-primary hover:text-primary-foreground"
                        >
                            View All Properties
                            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeatureProperties;