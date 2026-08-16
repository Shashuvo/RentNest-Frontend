"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRef, useState } from "react";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
    updateProfileSchema,
    UpdateProfileFormValues,
} from "@/lib/validations/profile";

import { updateMe } from "@/service/updateMe";
import { uploadProfileImage } from "@/service/uploadProfileImage";
import { useRouter } from "next/navigation";

interface ProfileFormProps {
    user: {
        name: string;
        email: string;
        phone: string | null;
        address: string | null;
        photoUrl: string | null;
    };
}

export default function ProfileForm({
    user,
}: ProfileFormProps) {

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<UpdateProfileFormValues>({
        resolver: zodResolver(updateProfileSchema),
        defaultValues: {
            name: user.name ?? "",
            phone: user.phone ?? "",
            address: user.address ?? "",
        },
    });

    const handleProfileImageUpload = async () => {
        if (!selectedFile) return;

        setIsUploading(true);

        const result = await uploadProfileImage(selectedFile);

        if (!result.success) {
            toast.error(
                result.message ||
                "Failed to upload profile image."
            );

            setIsUploading(false);
            return;
        }

        const photoUrl = result.data.url;

        const updateResult = await updateMe({
            name: user.name,
            phone: user.phone ?? "",
            address: user.address ?? "",
            photoUrl,
        });

        if (!updateResult.success) {
            toast.error(
                updateResult.message ||
                "Profile image uploaded but could not be saved."
            );

            setIsUploading(false);
            return;
        }

        toast.success("Profile photo updated successfully.");
        setSelectedFile(null);
        setSelectedImage(null);
        router.refresh();

        setIsUploading(false);
    };

    const onSubmit = async (
        values: UpdateProfileFormValues
    ) => {
        const result = await updateMe(values);

        if (!result.success) {
            toast.error(
                result.message ||
                "Failed to update profile."
            );

            return;
        }

        toast.success("Profile updated successfully.");
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
        >
            <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20 ring-4 ring-primary/10">
                    <AvatarImage
                        src={selectedImage ?? user.photoUrl ?? ""}
                        alt={user.name}
                    />

                    <AvatarFallback className="bg-primary/10 font-serif text-lg text-primary">
                        {user.name
                            .split(" ")
                            .map((name: string) => name[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()}
                    </AvatarFallback>
                </Avatar>

                <div className="space-y-2">
                    <div>
                        <h2 className="font-serif text-base tracking-tight">
                            {user.name}
                        </h2>

                        <p className="text-sm text-muted-foreground">
                            JPG, PNG or WEBP. Maximum 5MB.
                        </p>
                    </div>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(event) => {
                            const file = event.target.files?.[0];

                            if (!file) return;

                            const previewUrl = URL.createObjectURL(file);

                            setSelectedImage(previewUrl);
                            setSelectedFile(file);
                        }}
                    />

                    <div className="flex gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            disabled={isUploading}
                            onClick={() => fileInputRef.current?.click()}
                            className="rounded-full border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground"
                        >
                            Change Photo
                        </Button>

                        {selectedFile && (
                            <Button
                                type="button"
                                size="sm"
                                disabled={isUploading}
                                onClick={handleProfileImageUpload}
                                className="rounded-full shadow-sm transition-shadow hover:shadow-[0_12px_30px_-10px_hsl(var(--primary)/0.5)]"
                            >
                                {isUploading ? "Uploading..." : "Save Photo"}
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <label
                    htmlFor="name"
                    className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground"
                >
                    Name
                </label>

                <Input
                    id="name"
                    placeholder="Your name"
                    {...register("name")}
                    className="h-11 rounded-full border border-border bg-background text-sm shadow-sm transition-colors focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary"
                />

                {errors.name && (
                    <p className="text-sm text-destructive">
                        {errors.name.message}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <label
                    htmlFor="email"
                    className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground"
                >
                    Email
                </label>

                <Input
                    id="email"
                    value={user.email}
                    disabled
                    className="h-11 rounded-full border border-border bg-muted/40 text-sm"
                />

                <p className="text-xs text-muted-foreground">
                    Email cannot be changed.
                </p>
            </div>

            <div className="space-y-2">
                <label
                    htmlFor="phone"
                    className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground"
                >
                    Phone
                </label>

                <Input
                    id="phone"
                    placeholder="Your phone number"
                    {...register("phone")}
                    className="h-11 rounded-full border border-border bg-background text-sm shadow-sm transition-colors focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary"
                />

                {errors.phone && (
                    <p className="text-sm text-destructive">
                        {errors.phone.message}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <label
                    htmlFor="address"
                    className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground"
                >
                    Address
                </label>

                <Textarea
                    id="address"
                    placeholder="Your address"
                    className="min-h-24 resize-none rounded-2xl border border-border bg-background text-sm shadow-sm transition-colors focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary"
                    {...register("address")}
                />

                {errors.address && (
                    <p className="text-sm text-destructive">
                        {errors.address.message}
                    </p>
                )}
            </div>

            <Button
                type="submit"
                disabled={isSubmitting}
                className="rounded-full shadow-sm transition-shadow hover:shadow-[0_12px_30px_-10px_hsl(var(--primary)/0.5)]"
            >
                {isSubmitting
                    ? "Saving..."
                    : "Save Changes"}
            </Button>
        </form>
    );
}