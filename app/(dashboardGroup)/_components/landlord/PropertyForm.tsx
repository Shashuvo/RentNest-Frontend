"use client";

import { ChangeEvent, useState } from "react";
import {
    Banknote,
    Building2,
    ImagePlus,
    Info,
    MapPin,
    X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Category, Property } from "@/lib/types";
import Image from "next/image";

export interface PropertyFormData {
    title: string;
    description: string;
    address: string;
    city: string;
    area: number | null;
    price: number;
    bedrooms: number;
    bathrooms: number;
    categoryId: string;
    images: File[];
    existingImages: string[];
}

interface PropertyFormProps {
    property?: Property | null;
    categories: Category[];
    onSubmit: (data: PropertyFormData) => void;
    onCancel?: () => void;
}

const fieldLabelClass =
    "text-[11px] font-medium uppercase tracking-wider text-muted-foreground";

const inputClass =
    "h-11 rounded-full border border-border bg-background text-sm shadow-sm transition-colors focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary";

function SectionHeading({
    icon: Icon,
    title,
}: {
    icon: React.ElementType;
    title: string;
}) {
    return (
        <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon className="h-4 w-4" />
            </span>
            <h3 className="font-serif text-base tracking-tight text-foreground">
                {title}
            </h3>
        </div>
    );
}

export function PropertyForm({
    property,
    categories,
    onSubmit,
    onCancel,
}: PropertyFormProps) {
    const [title, setTitle] = useState(
        property?.title ?? ""
    );

    const [description, setDescription] = useState(
        property?.description ?? ""
    );

    const [address, setAddress] = useState(
        property?.address ?? ""
    );

    const [city, setCity] = useState(
        property?.city ?? ""
    );

    const [area, setArea] = useState(
        property?.area?.toString() ?? ""
    );

    const [price, setPrice] = useState(
        property?.price?.toString() ?? ""
    );

    const [bedrooms, setBedrooms] = useState(
        property?.bedrooms?.toString() ?? "1"
    );

    const [bathrooms, setBathrooms] = useState(
        property?.bathrooms?.toString() ?? "1"
    );

    const [categoryId, setCategoryId] = useState(
        property?.category.id ?? ""
    );

    const [images, setImages] = useState<File[]>([]);

    const [existingImages, setExistingImages] = useState<string[]>(
        property?.images ?? []
    );

    const totalImageCount = images.length + existingImages.length;

    const handleImageChange = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        const files = Array.from(
            event.target.files ?? []
        );

        setImages((currentImages) => [
            ...currentImages,
            ...files,
        ]);

        // Allow selecting the same file again
        event.target.value = "";
    };

    const handleRemoveImage = (index: number) => {
        setImages((currentImages) =>
            currentImages.filter(
                (_, imageIndex) => imageIndex !== index
            )
        );
    };

    const handleRemoveExistingImage = (index: number) => {
        setExistingImages((currentImages) =>
            currentImages.filter(
                (_, imageIndex) => imageIndex !== index
            )
        );
    };

    const handleSubmit = (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        onSubmit({
            title,
            description,
            address,
            city,
            area: area ? Number(area) : null,
            price: Number(price),
            bedrooms: Number(bedrooms),
            bathrooms: Number(bathrooms),
            categoryId,
            images,
            existingImages,
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-7"
        >
            {/* Basics */}
            <div className="space-y-4">
                <SectionHeading icon={Info} title="Basics" />

                {/* Property Title */}
                <div className="space-y-2">
                    <Label htmlFor="title" className={fieldLabelClass}>
                        Property Title
                    </Label>

                    <Input
                        id="title"
                        value={title}
                        onChange={(event) =>
                            setTitle(event.target.value)
                        }
                        placeholder="Modern Family Apartment"
                        required
                        className={inputClass}
                    />
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="description" className={fieldLabelClass}>
                            Description
                        </Label>
                        <span className="text-[11px] text-muted-foreground">
                            {description.length} chars
                        </span>
                    </div>

                    <Textarea
                        id="description"
                        value={description}
                        onChange={(event) =>
                            setDescription(event.target.value)
                        }
                        placeholder="Describe your property..."
                        rows={4}
                        required
                        className="rounded-2xl border border-border bg-background text-sm shadow-sm transition-colors focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary"
                    />
                </div>
            </div>

            <div className="h-px bg-border" />

            {/* Location */}
            <div className="space-y-4">
                <SectionHeading icon={MapPin} title="Location" />

                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="address" className={fieldLabelClass}>
                            Address
                        </Label>

                        <Input
                            id="address"
                            value={address}
                            onChange={(event) =>
                                setAddress(event.target.value)
                            }
                            placeholder="Khulshi"
                            required
                            className={inputClass}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="city" className={fieldLabelClass}>
                            City
                        </Label>

                        <Input
                            id="city"
                            value={city}
                            onChange={(event) =>
                                setCity(event.target.value)
                            }
                            placeholder="Chittagong"
                            required
                            className={inputClass}
                        />
                    </div>
                </div>
            </div>

            <div className="h-px bg-border" />

            {/* Pricing & Details */}
            <div className="space-y-4">
                <SectionHeading icon={Banknote} title="Pricing & Details" />

                {/* Price & Area */}
                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="price" className={fieldLabelClass}>
                            Monthly Price
                        </Label>

                        <div className="relative">
                            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground">
                                ৳
                            </span>
                            <Input
                                id="price"
                                type="number"
                                min="0"
                                value={price}
                                onChange={(event) =>
                                    setPrice(event.target.value)
                                }
                                placeholder="35,000"
                                required
                                className={`${inputClass} pl-8`}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="area" className={fieldLabelClass}>
                            Area (sq ft)
                        </Label>

                        <Input
                            id="area"
                            type="number"
                            min="0"
                            value={area}
                            onChange={(event) =>
                                setArea(event.target.value)
                            }
                            placeholder="1200"
                            className={inputClass}
                        />
                    </div>
                </div>

                {/* Bedrooms, Bathrooms & Category */}
                <div className="grid gap-4 sm:grid-cols-3">
                    {/* Bedrooms */}
                    <div className="space-y-2">
                        <Label htmlFor="bedrooms" className={fieldLabelClass}>
                            Bedrooms
                        </Label>

                        <Input
                            id="bedrooms"
                            type="number"
                            min="1"
                            value={bedrooms}
                            onChange={(event) =>
                                setBedrooms(event.target.value)
                            }
                            className={inputClass}
                        />
                    </div>

                    {/* Bathrooms */}
                    <div className="space-y-2">
                        <Label htmlFor="bathrooms" className={fieldLabelClass}>
                            Bathrooms
                        </Label>

                        <Input
                            id="bathrooms"
                            type="number"
                            min="1"
                            value={bathrooms}
                            onChange={(event) =>
                                setBathrooms(event.target.value)
                            }
                            className={inputClass}
                        />
                    </div>

                    {/* Category */}
                    <div className="space-y-2">
                        <Label className={fieldLabelClass}>Category</Label>

                        <Select
                            value={categoryId}
                            onValueChange={setCategoryId}
                            required
                        >
                            <SelectTrigger className="h-11! w-full rounded-full border border-border bg-background px-4 text-sm shadow-sm transition-colors focus:border-primary focus:ring-1 focus:ring-primary">
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>

                            <SelectContent className="p-2">
                                {categories.map((category) => (
                                    <SelectItem
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            <div className="h-px bg-border" />

            {/* Property Images */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <SectionHeading icon={Building2} title="Property Images" />
                    {totalImageCount > 0 && (
                        <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary">
                            {totalImageCount} / 10
                        </span>
                    )}
                </div>

                <label
                    htmlFor="images"
                    className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border p-8 text-center transition-colors hover:border-primary/40 hover:bg-primary/5"
                >
                    <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform group-hover:scale-110">
                        <ImagePlus className="h-6 w-6" />
                    </span>

                    <p className="text-sm font-semibold text-foreground">
                        Upload property images
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                        PNG, JPG or JPEG &middot; Maximum 10 images
                    </p>

                    <input
                        id="images"
                        type="file"
                        accept="image/png,image/jpeg,image/jpg"
                        multiple
                        className="hidden"
                        onChange={handleImageChange}
                    />
                </label>

                {/* Existing Images */}
                {existingImages.length > 0 && (
                    <div className="space-y-2">
                        <p className="text-sm font-medium text-foreground">
                            Existing Images
                        </p>

                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                            {existingImages.map((image, index) => (
                                <div
                                    key={`${image}-${index}`}
                                    className="group relative overflow-hidden rounded-xl border border-border shadow-sm"
                                >
                                    <div className="relative h-36 w-full">
                                        <Image
                                            src={image}
                                            alt={`Existing property image ${index + 1
                                                }`}
                                            fill
                                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </div>

                                    {index === 0 && (
                                        <span className="absolute left-2 top-2 rounded-full bg-primary px-2 py-0.5 text-[10px] font-medium text-primary-foreground shadow-sm">
                                            Cover
                                        </span>
                                    )}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleRemoveExistingImage(index)
                                        }
                                        className="absolute right-2 top-2 rounded-full bg-foreground/70 p-1.5 text-background shadow-sm backdrop-blur-md transition-colors hover:bg-destructive"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Image Preview */}
                {images.length > 0 && (
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                        {images.map((image, index) => (
                            <div
                                key={`${image.name}-${index}`}
                                className="group relative overflow-hidden rounded-xl border border-primary/30 shadow-sm ring-1 ring-primary/10"
                            >
                                <div className="relative h-36 w-full">
                                    <Image
                                        src={URL.createObjectURL(image)}
                                        alt={`Property image ${index + 1}`}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        unoptimized
                                    />
                                </div>

                                <button
                                    type="button"
                                    onClick={() =>
                                        handleRemoveImage(
                                            index
                                        )
                                    }
                                    className="absolute right-2 top-2 rounded-full bg-foreground/70 p-1.5 text-background shadow-sm backdrop-blur-md transition-colors hover:bg-destructive"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 border-t border-border pt-5">
                {onCancel && (
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onCancel}
                        className="rounded-full border-primary/20 px-5 text-primary hover:bg-primary hover:text-primary-foreground"
                    >
                        Cancel
                    </Button>
                )}

                <Button type="submit" className="rounded-full px-6 shadow-sm">
                    {property
                        ? "Update Property"
                        : "Create Property"}
                </Button>
            </div>
        </form>
    );
}