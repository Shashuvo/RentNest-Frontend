"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
    ArrowRight,
    CheckCircle2,
    ClipboardList,
    Clock3,
    CreditCard,
    Home,
    Loader2,
} from "lucide-react";

import { DashboardHeader } from "../_components/shared/DashboardHeader";
import { StatsCard } from "../_components/shared/StatsCard";

import { getMyRentalRequests } from "../_actions/rentalAction";
import { getMyPayments } from "../_actions/paymentAction";

import { Payment, RentalRequest } from "@/lib/types";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function DashboardPage() {
    const [rentalRequests, setRentalRequests] = useState<RentalRequest[]>([]);

    const [payments, setPayments] = useState<Payment[]>([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadDashboardData = async () => {
            try {
                setLoading(true);
                setError(null);

                const [rentalResult, paymentResult] =
                    await Promise.all([
                        getMyRentalRequests(),
                        getMyPayments(),
                    ]);

                setRentalRequests(rentalResult.data);
                setPayments(paymentResult.data);
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

    const totalRequests = rentalRequests.length;

    const pendingRequests = rentalRequests.filter(
        (request) => request.status === "PENDING"
    ).length;

    const activeRentals = rentalRequests.filter(
        (request) => request.status === "ACTIVE"
    ).length;

    const completedPayments = payments.filter(
        (payment) => payment.status === "COMPLETED"
    ).length;

    const recentRequests = rentalRequests.slice(0, 5);

    return (
        <div className="space-y-8 p-6 sm:p-8 lg:p-10">
            {/* Header */}
            <DashboardHeader
                title="Dashboard"
                description="Overview of your rental activity and payments."
            />

            {loading ? (
                <div className="relative overflow-hidden rounded-3xl border bg-card p-10 text-center">
                    <div className="pointer-events-none absolute -top-16 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

                    <div className="relative flex flex-col items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <Loader2 className="h-5 w-5 animate-spin" />
                        </div>

                        <p className="font-serif text-base">
                            Loading dashboard...
                        </p>

                        <p className="text-sm text-muted-foreground">
                            Fetching your latest rental activity.
                        </p>
                    </div>
                </div>
            ) : error ? (
                <div className="relative overflow-hidden rounded-3xl border border-destructive/20 bg-card p-10 text-center">
                    <p className="text-sm text-destructive">
                        {error}
                    </p>
                </div>
            ) : (
                <>
                    {/* Stats */}
                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        <StatsCard
                            title="Rental Requests"
                            value={totalRequests}
                            description="Total requests submitted"
                            icon={ClipboardList}
                        />

                        <StatsCard
                            title="Pending"
                            value={pendingRequests}
                            description="Waiting for landlord"
                            icon={Clock3}
                        />

                        <StatsCard
                            title="Active Rental"
                            value={activeRentals}
                            description="Currently rented"
                            icon={Home}
                        />

                        <StatsCard
                            title="Payments"
                            value={completedPayments}
                            description="Completed payments"
                            icon={CreditCard}
                        />
                    </div>

                    {/* Quick Actions */}
                    <section className="grid gap-4 sm:grid-cols-2">
                        <div className="group relative overflow-hidden rounded-2xl border bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_45px_-20px_hsl(var(--primary)/0.35)]">
                            <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/5 transition-transform duration-500 group-hover:scale-125" />

                            <div className="relative flex items-start justify-between gap-4">
                                <div>
                                    <h2 className="font-serif text-lg">
                                        Find Your Next Home
                                    </h2>

                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Browse available properties and find
                                        a place that fits your needs.
                                    </p>
                                </div>

                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    <Home className="h-5 w-5" />
                                </div>
                            </div>

                            <Button
                                asChild
                                className="relative mt-5 rounded-full"
                            >
                                <Link href="/properties">
                                    Browse Properties
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>

                        <div className="group relative overflow-hidden rounded-2xl border bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_45px_-20px_hsl(var(--primary)/0.35)]">
                            <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/5 transition-transform duration-500 group-hover:scale-125" />

                            <div className="relative flex items-start justify-between gap-4">
                                <div>
                                    <h2 className="font-serif text-lg">
                                        Track Your Requests
                                    </h2>

                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Check the status of your rental
                                        requests and payments.
                                    </p>
                                </div>

                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    <ClipboardList className="h-5 w-5" />
                                </div>
                            </div>

                            <Button
                                asChild
                                variant="outline"
                                className="relative mt-5 rounded-full"
                            >
                                <Link href="/rental-requests">
                                    View Requests
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </section>

                    {/* Recent Requests */}
                    <section className="space-y-4">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <span className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                    Activity
                                </span>

                                <h2 className="font-serif text-lg">
                                    Recent Rental Requests
                                </h2>

                                <p className="text-sm text-muted-foreground">
                                    Your latest rental activity.
                                </p>
                            </div>

                            {rentalRequests.length > 0 && (
                                <Button
                                    asChild
                                    variant="ghost"
                                    size="sm"
                                    className="rounded-full"
                                >
                                    <Link href="/rental-requests">
                                        View All
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            )}
                        </div>

                        {recentRequests.length === 0 ? (
                            <div className="relative overflow-hidden rounded-3xl border border-dashed bg-card p-10 text-center">
                                <div className="pointer-events-none absolute -top-16 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

                                <div className="relative flex flex-col items-center">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary ring-4 ring-primary/10">
                                        <ClipboardList className="h-6 w-6" />
                                    </div>

                                    <p className="mt-4 font-serif text-lg">
                                        No rental requests yet
                                    </p>

                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Browse properties and submit a rental
                                        request to get started.
                                    </p>

                                    <Button
                                        asChild
                                        className="mt-5 rounded-full"
                                    >
                                        <Link href="/properties">
                                            Browse Properties
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {recentRequests.map((request) => (
                                    <Link
                                        key={request.id}
                                        href={`/rental-requests/${request.id}`}
                                        className="block"
                                    >
                                        <div className="group relative overflow-hidden rounded-2xl border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_45px_-20px_hsl(var(--primary)/0.35)] sm:flex sm:flex-row sm:items-center sm:justify-between">
                                            <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-primary/5 transition-transform duration-500 group-hover:scale-125" />

                                            <div className="relative flex items-center gap-4">
                                                <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl bg-muted">
                                                    {request.property.images?.[0] ? (
                                                        <Image
                                                            src={request.property.images[0]}
                                                            alt={request.property.title}
                                                            fill
                                                            sizes="80px"
                                                            loading="lazy"
                                                            className="object-cover"
                                                        />
                                                    ) : (
                                                        <div className="flex h-full items-center justify-center">
                                                            <Home className="h-6 w-6 text-muted-foreground" />
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="min-w-0">
                                                    <h3 className="truncate font-medium">
                                                        {
                                                            request.property
                                                                .title
                                                        }
                                                    </h3>

                                                    <p className="text-sm text-muted-foreground">
                                                        {
                                                            request.property
                                                                .city
                                                        }
                                                    </p>

                                                    <p className="mt-1 font-serif text-sm">
                                                        ৳
                                                        {request.property.price.toLocaleString()}
                                                        /month
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="relative mt-4 flex items-center justify-between gap-3 sm:mt-0 sm:justify-end">
                                                <span
                                                    className={`rounded-full px-3 py-1 text-xs font-medium ${request.status ===
                                                        "PENDING"
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : request.status ===
                                                            "APPROVED"
                                                            ? "bg-blue-100 text-blue-700"
                                                            : request.status ===
                                                                "ACTIVE"
                                                                ? "bg-green-100 text-green-700"
                                                                : request.status ===
                                                                    "COMPLETED"
                                                                    ? "bg-purple-100 text-purple-700"
                                                                    : request.status ===
                                                                        "REJECTED"
                                                                        ? "bg-red-100 text-red-700"
                                                                        : "bg-muted text-muted-foreground"
                                                        }`}
                                                >
                                                    {request.status}
                                                </span>

                                                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </section>

                    {/* Payment Summary */}
                    <section className="relative overflow-hidden rounded-2xl border bg-card p-6 shadow-sm">
                        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/5 blur-3xl" />

                        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-4">
                                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary ring-4 ring-primary/10">
                                    {completedPayments > 0 ? (
                                        <CheckCircle2 className="h-5 w-5" />
                                    ) : (
                                        <CreditCard className="h-5 w-5" />
                                    )}
                                </div>

                                <div>
                                    <h2 className="font-serif text-lg">
                                        Payment History
                                    </h2>

                                    <p className="text-sm text-muted-foreground">
                                        {completedPayments > 0
                                            ? `${completedPayments} completed payment${completedPayments > 1 ? "s" : ""}`
                                            : "No completed payments yet."}
                                    </p>
                                </div>
                            </div>

                            <Button
                                asChild
                                variant="outline"
                                className="rounded-full"
                            >
                                <Link href="/payment">
                                    View Payments
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </section>
                </>
            )}
        </div>
    );
}