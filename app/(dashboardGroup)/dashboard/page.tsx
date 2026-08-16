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
} from "lucide-react";

import { DashboardHeader } from "../_components/shared/DashboardHeader";
import { StatsCard } from "../_components/shared/StatsCard";

import { getMyRentalRequests } from "../_actions/rentalAction";
import { getMyPayments } from "../_actions/paymentAction";

import { Payment, RentalRequest } from "@/lib/types";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
    const [rentalRequests, setRentalRequests] = useState<
        RentalRequest[]
    >([]);

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
                <div className="rounded-2xl border bg-card p-10 text-center">
                    <p className="text-sm text-muted-foreground">
                        Loading dashboard...
                    </p>
                </div>
            ) : error ? (
                <div className="rounded-2xl border border-destructive/20 bg-card p-10 text-center">
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
                        <div className="rounded-2xl border bg-card p-6">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h2 className="font-semibold">
                                        Find Your Next Home
                                    </h2>

                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Browse available properties and find
                                        a place that fits your needs.
                                    </p>
                                </div>

                                <Home className="h-5 w-5 shrink-0 text-primary" />
                            </div>

                            <Button
                                asChild
                                className="mt-5 rounded-full"
                            >
                                <Link href="/properties">
                                    Browse Properties
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>

                        <div className="rounded-2xl border bg-card p-6">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h2 className="font-semibold">
                                        Track Your Requests
                                    </h2>

                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Check the status of your rental
                                        requests and payments.
                                    </p>
                                </div>

                                <ClipboardList className="h-5 w-5 shrink-0 text-primary" />
                            </div>

                            <Button
                                asChild
                                variant="outline"
                                className="mt-5 rounded-full"
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
                                <h2 className="text-lg font-semibold">
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
                                >
                                    <Link href="/rental-requests">
                                        View All
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            )}
                        </div>

                        {recentRequests.length === 0 ? (
                            <div className="rounded-2xl border bg-card p-10 text-center">
                                <ClipboardList className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />

                                <p className="font-medium">
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
                        ) : (
                            <div className="space-y-3">
                                {recentRequests.map((request) => (
                                    <Link
                                        key={request.id}
                                        href={`/rental-requests/${request.id}`}
                                        className="block"
                                    >
                                        <div className="flex flex-col gap-4 rounded-2xl border bg-card p-5 transition-all hover:-translate-y-0.5 hover:shadow-md sm:flex-row sm:items-center sm:justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="h-16 w-20 shrink-0 overflow-hidden rounded-xl bg-muted">
                                                    {request.property
                                                        .images?.[0] ? (
                                                        <img
                                                            src={
                                                                request
                                                                    .property
                                                                    .images[0]
                                                            }
                                                            alt={
                                                                request
                                                                    .property
                                                                    .title
                                                            }
                                                            className="h-full w-full object-cover"
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

                                                    <p className="mt-1 text-sm font-medium">
                                                        ৳
                                                        {request.property.price.toLocaleString()}
                                                        /month
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between gap-3 sm:justify-end">
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
                    <section className="rounded-2xl border bg-card p-6">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-4">
                                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    {completedPayments > 0 ? (
                                        <CheckCircle2 className="h-5 w-5" />
                                    ) : (
                                        <CreditCard className="h-5 w-5" />
                                    )}
                                </div>

                                <div>
                                    <h2 className="font-semibold">
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