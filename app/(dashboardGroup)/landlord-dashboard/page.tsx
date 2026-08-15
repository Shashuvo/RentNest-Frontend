"use client";

import { useEffect, useState } from "react";
import {
    Building2,
    CheckCircle2,
    Home,
    Wallet,
} from "lucide-react";


import { DashboardHeader } from "../_components/shared/DashboardHeader";
import { StatsCard } from "../_components/shared/StatsCard";

import { Category, Property } from "@/lib/types";
import { getAllCategories } from "../_actions/categoryAction";

import { PropertyDialog } from "../_components/landlord/PropertyDialog";
import { PropertyFormData } from "../_components/landlord/PropertyForm";
import { PropertyList } from "../_components/landlord/PropertyList";
import { createProperty, deleteProperty, getMyProperties, updateProperty, uploadPropertyImages } from "../_actions/landlordAction";

export default function LandlordDashboardPage() {
    const [properties, setProperties] = useState<Property[]>([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [selectedProperty, setSelectedProperty] =
        useState<Property | null>(null);

    // Load landlord properties and categories
    useEffect(() => {
        const loadDashboardData = async () => {
            try {
                setLoading(true);
                setError(null);

                const [propertyResult, categoryResult] =
                    await Promise.all([
                        getMyProperties(),
                        getAllCategories(),
                    ]);

                setProperties(propertyResult.data);
                setCategories(categoryResult.data);
            } catch (error) {
                setError(
                    error instanceof Error
                        ? error.message
                        : "Failed to load dashboard data."
                );
            } finally {
                setLoading(false);
            }
        };

        loadDashboardData();
    }, []);



    // Stats
    const totalProperties = properties.length;

    const availableProperties = properties.filter(
        (property) => property.isAvailable
    ).length;

    const rentedProperties = properties.filter(
        (property) => !property.isAvailable
    ).length;

    const totalMonthlyValue = properties.reduce(
        (total, property) => total + property.price,
        0
    );

    // Open create dialog
    const handleAddProperty = () => {
        setSelectedProperty(null);
        setIsDialogOpen(true);
    };

    // Open edit dialog
    const handleEditProperty = (property: Property) => {
        setSelectedProperty(property);
        setIsDialogOpen(true);
    };

    // Delete property
    const handleDeleteProperty = async (
        propertyId: string
    ) => {
        try {
            await deleteProperty(propertyId);

            setProperties((currentProperties) =>
                currentProperties.filter(
                    (property) => property.id !== propertyId
                )
            );
        } catch (error) {
            console.error(error);

            setError(
                error instanceof Error
                    ? error.message
                    : "Failed to delete property."
            );
        }
    };

    // Create / Update property
    const handlePropertySubmit = async (
        data: PropertyFormData
    ) => {
        try {
            // Upload newly selected images
            let newImageUrls: string[] = [];

            if (data.images.length > 0) {
                newImageUrls = await uploadPropertyImages(
                    data.images
                );
            }

            // Combine existing images + newly uploaded images
            const imageUrls = [
                ...data.existingImages,
                ...newImageUrls,
            ];

            const propertyPayload = {
                title: data.title,
                description: data.description,
                address: data.address,
                city: data.city,
                area: data.area,
                price: data.price,
                bedrooms: data.bedrooms,
                bathrooms: data.bathrooms,
                categoryId: data.categoryId,
                images: imageUrls,
            };

            if (selectedProperty) {
                // Update existing property
                const result = await updateProperty(
                    selectedProperty.id,
                    propertyPayload
                );

                setProperties((currentProperties) =>
                    currentProperties.map((property) =>
                        property.id === selectedProperty.id
                            ? result.data
                            : property
                    )
                );
            } else {
                // Create new property
                const result = await createProperty(
                    propertyPayload
                );

                setProperties((currentProperties) => [
                    result.data,
                    ...currentProperties,
                ]);
            }

            setIsDialogOpen(false);
            setSelectedProperty(null);
        } catch (error) {
            console.error(error);

            setError(
                error instanceof Error
                    ? error.message
                    : "Failed to save property."
            );
        }
    };

    return (
        <div className="space-y-8 p-10">
            {/* Header */}
            <DashboardHeader
                title="Landlord Dashboard"
                description="Manage your properties and listings."
                actionLabel="Add Property"
                onAction={handleAddProperty}
            />

            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatsCard
                    title="Total Properties"
                    value={totalProperties}
                    description="Properties you own"
                    icon={Building2}
                />

                <StatsCard
                    title="Available"
                    value={availableProperties}
                    description="Currently available"
                    icon={Home}
                />

                <StatsCard
                    title="Rented"
                    value={rentedProperties}
                    description="Currently occupied"
                    icon={CheckCircle2}
                />

                <StatsCard
                    title="Monthly Value"
                    value={`৳${totalMonthlyValue.toLocaleString()}`}
                    description="Potential monthly income"
                    icon={Wallet}
                />
            </div>

            {/* Properties */}
            <section className="space-y-4">
                <div>
                    <h2 className="text-lg font-semibold">
                        My Properties
                    </h2>

                    <p className="text-sm text-muted-foreground">
                        Manage the properties you have listed.
                    </p>
                </div>

                {loading ? (
                    <div className="rounded-xl border p-10 text-center">
                        <p className="text-sm text-muted-foreground">
                            Loading properties...
                        </p>
                    </div>
                ) : error ? (
                    <div className="rounded-xl border p-10 text-center">
                        <p className="text-sm text-destructive">
                            {error}
                        </p>
                    </div>
                ) : (
                    <PropertyList
                        properties={properties}
                        onEdit={handleEditProperty}
                        onDelete={handleDeleteProperty}
                    />
                )}
            </section>

            {/* Create / Edit Dialog */}
            <PropertyDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                property={selectedProperty}
                categories={categories}
                onSubmit={handlePropertySubmit}
            />
        </div>
    );
}