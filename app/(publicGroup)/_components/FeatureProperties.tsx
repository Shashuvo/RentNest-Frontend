import { Button } from "@/components/ui/button";
import { ArrowRight} from "lucide-react";
import PropertyCard from "./PropertyCard";
import { Property, PropertyState } from "@/lib/types";
import { getAllProperties } from "../_actions/propetyAction";
import Link from "next/link";


const FeatureProperties = async () => {

    const propertiesRes: PropertyState = await getAllProperties();

    const properties: Property[] = propertiesRes.data;


    return (
        <section
            id="featured-properties"
            className="border-t border-border/70 bg-card/40 px-6 py-16 lg:px-12 xl:px-16"
        >
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-10">
                {/* Section Header */}
                <div className="flex flex-col gap-3">
                    <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
                        Featured Properties
                    </p>

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
                <div className="flex justify-center">
                    <Link href="/properties">
                        <Button
                            variant="outline"
                            className="gap-2 border-primary/20 bg-background text-primary hover:bg-primary hover:text-primary-foreground"
                        >
                            View All Properties
                            <ArrowRight className="size-4" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeatureProperties;