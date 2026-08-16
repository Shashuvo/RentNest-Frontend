"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import {
    Ban,
    Building2,
    CheckCircle2,
    Clock3,
    Home,
    Loader2,
    Plus,
    ShieldCheck,
    Tags,
    Trash2,
    Users,
    UserRound,
    XCircle,
} from "lucide-react";

import { DashboardHeader } from "../_components/shared/DashboardHeader";
import { StatsCard } from "../_components/shared/StatsCard";

import {
    AdminUser,
    createCategory,
    deleteCategory,
    deletePropertyForAdmin,
    getAllCategoriesForAdmin,
    getAllPropertiesForAdmin,
    getAllRentalsForAdmin,
    getAllUsers,
    updateRentalStatusForAdmin,
    updateUserStatus,
} from "../_actions/adminAction";

import {
    Category,
    Property,
    RentalRequest,
} from "@/lib/types";

import { Button } from "@/components/ui/button";

import { CategoryDialog } from "../_components/admin/CategoryDialog";
import { DeleteCategoryDialog } from "../_components/admin/DeleteCategoryDialog";
import { DeletePropertyDialog } from "../_components/admin/DeletePropertyDialog";

export default function AdminDashboardPage() {
    const [users, setUsers] = useState<AdminUser[]>([]);
    const [properties, setProperties] = useState<Property[]>([]);
    const [rentals, setRentals] = useState<RentalRequest[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    const [categoryDialogOpen, setCategoryDialogOpen] =
        useState(false);

    const [deletingCategoryId, setDeletingCategoryId] =
        useState<string | null>(null);

    const [categoryToDelete, setCategoryToDelete] =
        useState<Category | null>(null);

    const [deletingPropertyId, setDeletingPropertyId] =
        useState<string | null>(null);

    const [propertyToDelete, setPropertyToDelete] =
        useState<Property | null>(null);

    const [updatingRentalId, setUpdatingRentalId] =
        useState<string | null>(null);

    const [loading, setLoading] = useState(true);

    const [updatingUserId, setUpdatingUserId] =
        useState<string | null>(null);

    useEffect(() => {
        const loadDashboardData = async () => {
            try {
                setLoading(true);

                const [
                    usersResult,
                    propertiesResult,
                    rentalsResult,
                    categoriesResult,
                ] = await Promise.all([
                    getAllUsers(),
                    getAllPropertiesForAdmin(),
                    getAllRentalsForAdmin(),
                    getAllCategoriesForAdmin(),
                ]);

                setUsers(usersResult.data);
                setProperties(propertiesResult.data);
                setRentals(rentalsResult.data);
                setCategories(categoriesResult.data);
            } catch (error) {
                toast.error("Failed to load admin dashboard", {
                    description:
                        error instanceof Error
                            ? error.message
                            : "Please try again.",
                });
            } finally {
                setLoading(false);
            }
        };

        loadDashboardData();
    }, []);

    const totalUsers = users.length;

    const totalLandlords = users.filter(
        (user) => user.role === "LANDLORD"
    ).length;

    const totalTenants = users.filter(
        (user) => user.role === "TENANT"
    ).length;

    const bannedUsers = users.filter(
        (user) => user.status === "BANNED"
    ).length;

    const totalProperties = properties.length;

    const availableProperties = properties.filter(
        (property) => property.isAvailable
    ).length;

    const rentedProperties = properties.filter(
        (property) => !property.isAvailable
    ).length;

    const totalRentals = rentals.length;

    const pendingRentals = rentals.filter(
        (rental) => rental.status === "PENDING"
    ).length;

    const activeRentals = rentals.filter(
        (rental) => rental.status === "ACTIVE"
    ).length;

    const completedRentals = rentals.filter(
        (rental) => rental.status === "COMPLETED"
    ).length;

    const handleUserStatusChange = async (
        userId: string,
        status: "ACTIVE" | "BANNED"
    ) => {
        try {
            setUpdatingUserId(userId);

            const result = await updateUserStatus(
                userId,
                status
            );

            const updatedUser = result.data;

            if (updatedUser) {
                setUsers((currentUsers) =>
                    currentUsers.map((user) =>
                        user.id === userId
                            ? updatedUser
                            : user
                    )
                );

                toast.success(
                    status === "BANNED"
                        ? "User banned"
                        : "User activated"
                );
            }
        } catch (error) {
            toast.error("Failed to update user status", {
                description:
                    error instanceof Error
                        ? error.message
                        : "Please try again.",
            });
        } finally {
            setUpdatingUserId(null);
        }
    };

    // CategoryDialog handles its own success/error toasts, so this
    // simply performs the mutation and lets errors propagate to it.
    const handleCreateCategory = async (
        name: string
    ) => {
        const result = await createCategory(name);

        setCategories((currentCategories) => [
            ...currentCategories,
            result.data,
        ]);

        setCategoryDialogOpen(false);
    };

    const handleDeleteCategory = async (
        categoryId: string
    ) => {
        try {
            setDeletingCategoryId(categoryId);

            await deleteCategory(categoryId);

            setCategories((currentCategories) =>
                currentCategories.filter(
                    (category) =>
                        category.id !== categoryId
                )
            );

            toast.success("Category deleted");
        } catch (error) {
            toast.error("Failed to delete category", {
                description:
                    error instanceof Error
                        ? error.message
                        : "Please try again.",
            });
        } finally {
            setDeletingCategoryId(null);
        }
    };

    const handleDeleteProperty = async (
        propertyId: string
    ) => {
        try {
            setDeletingPropertyId(propertyId);

            await deletePropertyForAdmin(propertyId);

            setProperties((currentProperties) =>
                currentProperties.filter(
                    (property) =>
                        property.id !== propertyId
                )
            );

            toast.success("Property deleted");
        } catch (error) {
            toast.error("Failed to delete property", {
                description:
                    error instanceof Error
                        ? error.message
                        : "Please try again.",
            });
        } finally {
            setDeletingPropertyId(null);
        }
    };

    const handleUpdateRentalStatus = async (
        requestId: string,
        status: RentalRequest["status"]
    ) => {
        try {
            setUpdatingRentalId(requestId);

            const result =
                await updateRentalStatusForAdmin(
                    requestId,
                    status
                );

            setRentals((currentRentals) =>
                currentRentals.map((rental) =>
                    rental.id === requestId
                        ? {
                            ...rental,
                            ...result.data,
                        }
                        : rental
                )
            );

            toast.success("Rental status updated");
        } catch (error) {
            toast.error("Failed to update rental status", {
                description:
                    error instanceof Error
                        ? error.message
                        : "Please try again.",
            });
        } finally {
            setUpdatingRentalId(null);
        }
    };

    return (
        <div className="space-y-8 p-6 sm:p-8 lg:p-10">
            <DashboardHeader
                title="Admin Dashboard"
                description="Monitor users, properties, and rental activity."
            />

            {loading ? (
                <div className="relative overflow-hidden rounded-3xl border bg-card p-10 text-center">
                    <div className="pointer-events-none absolute -top-16 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

                    <div className="relative flex flex-col items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <Loader2 className="h-5 w-5 animate-spin" />
                        </div>

                        <p className="font-serif text-base">
                            Loading admin dashboard...
                        </p>

                        <p className="text-sm text-muted-foreground">
                            Fetching users, properties, and rentals.
                        </p>
                    </div>
                </div>
            ) : (
                <>
                    {/* Overview */}
                    <section className="space-y-4">
                        <div>
                            <h2 className="font-serif text-lg">
                                Overview
                            </h2>

                            <p className="text-sm text-muted-foreground">
                                A quick overview of your platform.
                            </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                            <StatsCard
                                title="Total Users"
                                value={totalUsers}
                                description={`${totalLandlords} landlords · ${totalTenants} tenants`}
                                icon={Users}
                            />

                            <StatsCard
                                title="Properties"
                                value={totalProperties}
                                description={`${availableProperties} available · ${rentedProperties} rented`}
                                icon={Building2}
                            />

                            <StatsCard
                                title="Active Rentals"
                                value={activeRentals}
                                description={`${pendingRentals} pending requests`}
                                icon={Home}
                            />

                            <StatsCard
                                title="Banned Users"
                                value={bannedUsers}
                                description="Currently restricted"
                                icon={Ban}
                            />
                        </div>
                    </section>

                    {/* Rental Overview */}
                    <section className="grid gap-4 sm:grid-cols-3">
                        <div className="relative overflow-hidden rounded-2xl border bg-card p-5 shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500/10 text-yellow-600 ring-4 ring-yellow-500/10">
                                    <Clock3 className="h-5 w-5" />
                                </div>

                                <div>
                                    <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                        Pending Rentals
                                    </p>

                                    <p className="mt-1 font-serif text-2xl">
                                        {pendingRentals}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="relative overflow-hidden rounded-2xl border bg-card p-5 shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10 text-green-600 ring-4 ring-green-500/10">
                                    <CheckCircle2 className="h-5 w-5" />
                                </div>

                                <div>
                                    <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                        Active Rentals
                                    </p>

                                    <p className="mt-1 font-serif text-2xl">
                                        {activeRentals}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="relative overflow-hidden rounded-2xl border bg-card p-5 shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary ring-4 ring-primary/10">
                                    <ShieldCheck className="h-5 w-5" />
                                </div>

                                <div>
                                    <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                        Completed Rentals
                                    </p>

                                    <p className="mt-1 font-serif text-2xl">
                                        {completedRentals}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Categories */}
                    <section className="space-y-4">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <h2 className="font-serif text-lg">
                                    Category Management
                                </h2>

                                <p className="text-sm text-muted-foreground">
                                    Manage property categories available on
                                    the platform.
                                </p>
                            </div>

                            <Button
                                onClick={() =>
                                    setCategoryDialogOpen(true)
                                }
                                className="rounded-full"
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Add Category
                            </Button>
                        </div>

                        <div className="overflow-hidden rounded-2xl border bg-card">
                            {categories.length > 0 ? (
                                <div className="divide-y">
                                    {categories.map((category) => (
                                        <div
                                            key={category.id}
                                            className="flex items-center justify-between gap-4 px-5 py-4"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                                    <Tags className="h-5 w-5" />
                                                </div>

                                                <div>
                                                    <p className="font-medium">
                                                        {category.name}
                                                    </p>

                                                    <p className="text-xs text-muted-foreground">
                                                        Created{" "}
                                                        {new Date(
                                                            category.createdAt
                                                        ).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>

                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="rounded-full text-destructive hover:text-destructive"
                                                onClick={() =>
                                                    setCategoryToDelete(category)
                                                }
                                                disabled={
                                                    deletingCategoryId ===
                                                    category.id
                                                }
                                            >
                                                <Trash2 className="mr-2 h-4 w-4" />
                                                Delete
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="relative overflow-hidden border-dashed p-10 text-center">
                                    <div className="pointer-events-none absolute -top-16 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

                                    <div className="relative flex flex-col items-center">
                                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary ring-4 ring-primary/10">
                                            <Tags className="h-6 w-6" />
                                        </div>

                                        <p className="mt-4 font-serif text-lg">
                                            No categories found
                                        </p>

                                        <p className="mt-1 text-sm text-muted-foreground">
                                            Create your first property category.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <CategoryDialog
                            open={categoryDialogOpen}
                            onOpenChange={setCategoryDialogOpen}
                            onSubmit={handleCreateCategory}
                        />

                        <DeletePropertyDialog
                            open={!!propertyToDelete}
                            propertyTitle={
                                propertyToDelete?.title ?? ""
                            }
                            deleting={
                                deletingPropertyId ===
                                propertyToDelete?.id
                            }
                            onOpenChange={(open) => {
                                if (
                                    !open &&
                                    !deletingPropertyId
                                ) {
                                    setPropertyToDelete(null);
                                }
                            }}
                            onConfirm={async () => {
                                if (!propertyToDelete) {
                                    return;
                                }

                                await handleDeleteProperty(
                                    propertyToDelete.id
                                );

                                setPropertyToDelete(null);
                            }}
                        />

                        <DeleteCategoryDialog
                            open={!!categoryToDelete}
                            categoryName={
                                categoryToDelete?.name ?? ""
                            }
                            deleting={
                                deletingCategoryId ===
                                categoryToDelete?.id
                            }
                            onOpenChange={(open) => {
                                if (
                                    !open &&
                                    !deletingCategoryId
                                ) {
                                    setCategoryToDelete(null);
                                }
                            }}
                            onConfirm={async () => {
                                if (!categoryToDelete) {
                                    return;
                                }

                                await handleDeleteCategory(
                                    categoryToDelete.id
                                );

                                setCategoryToDelete(null);
                            }}
                        />
                    </section>

                    {/* Users */}
                    <section className="space-y-4">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <h2 className="font-serif text-lg">
                                    User Management
                                </h2>

                                <p className="text-sm text-muted-foreground">
                                    Manage user access to the platform.
                                </p>
                            </div>

                            <span className="text-sm text-muted-foreground">
                                {totalUsers} users
                            </span>
                        </div>

                        <div className="overflow-hidden rounded-2xl border bg-card">
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-200">
                                    <thead>
                                        <tr className="border-b bg-muted/30">
                                            <th className="px-5 py-4 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                                User
                                            </th>

                                            <th className="px-5 py-4 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                                Role
                                            </th>

                                            <th className="px-5 py-4 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                                Status
                                            </th>

                                            <th className="px-5 py-4 text-right text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {users.map((user) => (
                                            <tr
                                                key={user.id}
                                                className="border-b last:border-0"
                                            >
                                                <td className="px-5 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-primary/10 text-primary">
                                                            {user.photoUrl ? (
                                                                // eslint-disable-next-line @next/next/no-img-element
                                                                <img
                                                                    src={user.photoUrl}
                                                                    alt={user.name}
                                                                    loading="lazy"
                                                                    className="h-full w-full object-cover"
                                                                />
                                                            ) : (
                                                                <div className="flex h-full w-full items-center justify-center">
                                                                    <UserRound className="h-5 w-5" />
                                                                </div>
                                                            )}
                                                        </div>

                                                        <div>
                                                            <p className="font-medium">
                                                                {
                                                                    user.name
                                                                }
                                                            </p>

                                                            <p className="text-sm text-muted-foreground">
                                                                {
                                                                    user.email
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-5 py-4">
                                                    <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
                                                        {user.role}
                                                    </span>
                                                </td>

                                                <td className="px-5 py-4">
                                                    <span
                                                        className={`rounded-full px-3 py-1 text-xs font-medium ${user.status ===
                                                            "ACTIVE"
                                                            ? "bg-green-100 text-green-700"
                                                            : "bg-red-100 text-red-700"
                                                            }`}
                                                    >
                                                        {user.status}
                                                    </span>
                                                </td>

                                                <td className="px-5 py-4 text-right">
                                                    {user.status ===
                                                        "ACTIVE" ? (
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="rounded-full"
                                                            disabled={
                                                                updatingUserId ===
                                                                user.id
                                                            }
                                                            onClick={() =>
                                                                handleUserStatusChange(
                                                                    user.id,
                                                                    "BANNED"
                                                                )
                                                            }
                                                        >
                                                            <Ban className="mr-2 h-4 w-4" />

                                                            {updatingUserId ===
                                                                user.id
                                                                ? "Updating..."
                                                                : "Ban"}
                                                        </Button>
                                                    ) : (
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="rounded-full"
                                                            disabled={
                                                                updatingUserId ===
                                                                user.id
                                                            }
                                                            onClick={() =>
                                                                handleUserStatusChange(
                                                                    user.id,
                                                                    "ACTIVE"
                                                                )
                                                            }
                                                        >
                                                            <CheckCircle2 className="mr-2 h-4 w-4" />

                                                            {updatingUserId ===
                                                                user.id
                                                                ? "Updating..."
                                                                : "Activate"}
                                                        </Button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {users.length === 0 && (
                                <div className="relative overflow-hidden p-10 text-center">
                                    <div className="pointer-events-none absolute -top-16 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

                                    <div className="relative flex flex-col items-center">
                                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary ring-4 ring-primary/10">
                                            <Users className="h-6 w-6" />
                                        </div>

                                        <p className="mt-4 font-serif text-lg">
                                            No users found
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Properties */}
                    <section className="space-y-4">
                        <div className="flex items-end justify-between gap-4">
                            <div>
                                <h2 className="font-serif text-lg">
                                    Properties
                                </h2>

                                <p className="text-sm text-muted-foreground">
                                    Overview of all properties listed on the
                                    platform.
                                </p>
                            </div>

                            <span className="text-sm text-muted-foreground">
                                {totalProperties} properties
                            </span>
                        </div>

                        <div className="overflow-hidden rounded-2xl border bg-card">
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-225">
                                    <thead>
                                        <tr className="border-b bg-muted/30">
                                            <th className="px-5 py-4 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                                Property
                                            </th>

                                            <th className="px-5 py-4 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                                Landlord
                                            </th>

                                            <th className="px-5 py-4 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                                Category
                                            </th>

                                            <th className="px-5 py-4 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                                Price
                                            </th>

                                            <th className="px-5 py-4 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                                Status
                                            </th>

                                            <th className="px-5 py-4 text-right text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {properties.map(
                                            (property) => (
                                                <tr
                                                    key={property.id}
                                                    className="border-b last:border-0"
                                                >
                                                    <td className="px-5 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-lg bg-muted">
                                                                {property
                                                                    .images?.[0] ? (
                                                                    <Image
                                                                        src={
                                                                            property
                                                                                .images[0]
                                                                        }
                                                                        alt={
                                                                            property.title
                                                                        }
                                                                        fill
                                                                        sizes="64px"
                                                                        loading="lazy"
                                                                        className="object-cover"
                                                                    />
                                                                ) : (
                                                                    <div className="flex h-full items-center justify-center">
                                                                        <Building2 className="h-5 w-5 text-muted-foreground" />
                                                                    </div>
                                                                )}
                                                            </div>

                                                            <div>
                                                                <p className="font-medium">
                                                                    {
                                                                        property.title
                                                                    }
                                                                </p>

                                                                <p className="text-sm text-muted-foreground">
                                                                    {
                                                                        property.city
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td className="px-5 py-4">
                                                        <div>
                                                            <p className="font-medium">
                                                                {
                                                                    property
                                                                        .landlord
                                                                        .name
                                                                }
                                                            </p>

                                                            <p className="text-sm text-muted-foreground">
                                                                {
                                                                    property
                                                                        .landlord
                                                                        .email
                                                                }
                                                            </p>
                                                        </div>
                                                    </td>

                                                    <td className="px-5 py-4">
                                                        {
                                                            property
                                                                .category
                                                                .name
                                                        }
                                                    </td>

                                                    <td className="px-5 py-4 font-serif">
                                                        ৳
                                                        {property.price.toLocaleString()}
                                                    </td>

                                                    <td className="px-5 py-4">
                                                        <span
                                                            className={`rounded-full px-3 py-1 text-xs font-medium ${property.isAvailable
                                                                ? "bg-green-100 text-green-700"
                                                                : "bg-muted text-muted-foreground"
                                                                }`}
                                                        >
                                                            {property.isAvailable
                                                                ? "Available"
                                                                : "Rented"}
                                                        </span>
                                                    </td>

                                                    <td className="px-5 py-4 text-right">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="rounded-full text-destructive hover:text-destructive"
                                                            onClick={() =>
                                                                setPropertyToDelete(
                                                                    property
                                                                )
                                                            }
                                                            disabled={
                                                                deletingPropertyId ===
                                                                property.id
                                                            }
                                                        >
                                                            <Trash2 className="mr-2 h-4 w-4" />

                                                            {deletingPropertyId ===
                                                                property.id
                                                                ? "Deleting..."
                                                                : "Delete"}
                                                        </Button>
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {properties.length === 0 && (
                                <div className="relative overflow-hidden p-10 text-center">
                                    <div className="pointer-events-none absolute -top-16 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

                                    <div className="relative flex flex-col items-center">
                                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary ring-4 ring-primary/10">
                                            <Building2 className="h-6 w-6" />
                                        </div>

                                        <p className="mt-4 font-serif text-lg">
                                            No properties found
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Rentals */}
                    <section className="space-y-4">
                        <div className="flex items-end justify-between gap-4">
                            <div>
                                <h2 className="font-serif text-lg">
                                    Rental Activity
                                </h2>

                                <p className="text-sm text-muted-foreground">
                                    Monitor and manage rental requests across
                                    the platform.
                                </p>
                            </div>

                            <span className="text-sm text-muted-foreground">
                                {totalRentals} rentals
                            </span>
                        </div>

                        <div className="overflow-hidden rounded-2xl border bg-card">
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-225">
                                    <thead>
                                        <tr className="border-b bg-muted/30">
                                            <th className="px-5 py-4 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                                Tenant
                                            </th>

                                            <th className="px-5 py-4 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                                Property
                                            </th>

                                            <th className="px-5 py-4 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                                Status
                                            </th>

                                            <th className="px-5 py-4 text-right text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                                Action
                                            </th>

                                            <th className="px-5 py-4 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                                Payment
                                            </th>

                                            <th className="px-5 py-4 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                                Date
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {rentals.map((rental) => {
                                            const rentalStatus =
                                                String(
                                                    rental.status
                                                )
                                                    .trim()
                                                    .toUpperCase();

                                            return (
                                                <tr
                                                    key={rental.id}
                                                    className="border-b last:border-0"
                                                >
                                                    <td className="px-5 py-4">
                                                        <p className="font-medium">
                                                            {
                                                                rental
                                                                    .tenant
                                                                    ?.name
                                                            }
                                                        </p>

                                                        <p className="text-sm text-muted-foreground">
                                                            {
                                                                rental
                                                                    .tenant
                                                                    ?.email
                                                            }
                                                        </p>
                                                    </td>

                                                    <td className="px-5 py-4">
                                                        <p className="font-medium">
                                                            {
                                                                rental
                                                                    .property
                                                                    .title
                                                            }
                                                        </p>

                                                        <p className="text-sm text-muted-foreground">
                                                            {
                                                                rental
                                                                    .property
                                                                    .city
                                                            }
                                                        </p>
                                                    </td>

                                                    <td className="px-5 py-4">
                                                        <span
                                                            className={`rounded-full px-3 py-1 text-xs font-medium ${rentalStatus ===
                                                                "PENDING"
                                                                ? "bg-yellow-100 text-yellow-700"
                                                                : rentalStatus ===
                                                                    "APPROVED"
                                                                    ? "bg-blue-100 text-blue-700"
                                                                    : rentalStatus ===
                                                                        "ACTIVE"
                                                                        ? "bg-green-100 text-green-700"
                                                                        : rentalStatus ===
                                                                            "COMPLETED"
                                                                            ? "bg-emerald-100 text-emerald-700"
                                                                            : rentalStatus ===
                                                                                "REJECTED"
                                                                                ? "bg-red-100 text-red-700"
                                                                                : rentalStatus ===
                                                                                    "CANCELLED"
                                                                                    ? "bg-muted text-muted-foreground"
                                                                                    : "bg-muted text-muted-foreground"
                                                                }`}
                                                        >
                                                            {
                                                                rentalStatus
                                                            }
                                                        </span>
                                                    </td>


                                                    <td className="px-5 py-4 text-right">
                                                        {rental.status === "PENDING" ? (
                                                            <div className="flex justify-end gap-2">
                                                                <Button
                                                                    size="sm"
                                                                    variant="outline"
                                                                    className="rounded-full text-destructive hover:text-destructive"
                                                                    disabled={updatingRentalId === rental.id}
                                                                    onClick={() =>
                                                                        handleUpdateRentalStatus(
                                                                            rental.id,
                                                                            "REJECTED"
                                                                        )
                                                                    }
                                                                >
                                                                    <XCircle className="mr-1.5 h-4 w-4" />
                                                                    {updatingRentalId === rental.id
                                                                        ? "Updating..."
                                                                        : "Reject"}
                                                                </Button>

                                                                <Button
                                                                    size="sm"
                                                                    className="rounded-full"
                                                                    disabled={updatingRentalId === rental.id}
                                                                    onClick={() =>
                                                                        handleUpdateRentalStatus(
                                                                            rental.id,
                                                                            "APPROVED"
                                                                        )
                                                                    }
                                                                >
                                                                    <CheckCircle2 className="mr-1.5 h-4 w-4" />
                                                                    {updatingRentalId === rental.id
                                                                        ? "Updating..."
                                                                        : "Approve"}
                                                                </Button>
                                                            </div>
                                                        ) : rental.status === "ACTIVE" ? (
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                className="rounded-full"
                                                                disabled={updatingRentalId === rental.id}
                                                                onClick={() =>
                                                                    handleUpdateRentalStatus(
                                                                        rental.id,
                                                                        "COMPLETED"
                                                                    )
                                                                }
                                                            >
                                                                <CheckCircle2 className="mr-1.5 h-4 w-4" />
                                                                {updatingRentalId === rental.id
                                                                    ? "Updating..."
                                                                    : "Complete"}
                                                            </Button>
                                                        ) : (
                                                            <span className="text-sm text-muted-foreground">
                                                                No action
                                                            </span>
                                                        )}
                                                    </td>

                                                    <td className="px-5 py-4">
                                                        {rental.payment ? (
                                                            <span
                                                                className={`rounded-full px-3 py-1 text-xs font-medium ${rental
                                                                    .payment
                                                                    .status ===
                                                                    "COMPLETED"
                                                                    ? "bg-green-100 text-green-700"
                                                                    : rental
                                                                        .payment
                                                                        .status ===
                                                                        "PENDING"
                                                                        ? "bg-yellow-100 text-yellow-700"
                                                                        : "bg-red-100 text-red-700"
                                                                    }`}
                                                            >
                                                                {
                                                                    rental
                                                                        .payment
                                                                        .status
                                                                }
                                                            </span>
                                                        ) : (
                                                            <span className="text-sm text-muted-foreground">
                                                                No payment
                                                            </span>
                                                        )}
                                                    </td>

                                                    <td className="px-5 py-4 text-sm text-muted-foreground">
                                                        {new Date(
                                                            rental.createdAt
                                                        ).toLocaleDateString()}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>

                            {rentals.length === 0 && (
                                <div className="relative overflow-hidden p-10 text-center">
                                    <div className="pointer-events-none absolute -top-16 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

                                    <div className="relative flex flex-col items-center">
                                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary ring-4 ring-primary/10">
                                            <Home className="h-6 w-6" />
                                        </div>

                                        <p className="mt-4 font-serif text-lg">
                                            No rental activity found
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>
                </>
            )}
        </div>
    );
}