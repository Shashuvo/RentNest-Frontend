"use client";

import { useEffect, useState } from "react";
import {
    ClipboardList,
    CreditCard,
    Home,
    Clock3,
} from "lucide-react";

import { DashboardHeader } from "../_components/shared/DashboardHeader";
import { StatsCard } from "../_components/shared/StatsCard";

import { getMyRentalRequests } from "../_actions/rentalAction";
import { getMyPayments } from "../_actions/paymentAction";

import {
    Payment,
    RentalRequest,
} from "@/lib/types";

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

                const [
                    rentalResult,
                    paymentResult,
                ] = await Promise.all([
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
        <div className="space-y-8 p-10">
            {/* Header */}
            <DashboardHeader
                title="Dashboard"
                description="Overview of your rental activity and payments."
            />

            {loading ? (
                <div className="rounded-xl border p-10 text-center">
                    <p className="text-sm text-muted-foreground">
                        Loading dashboard...
                    </p>
                </div>
            ) : error ? (
                <div className="rounded-xl border p-10 text-center">
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

                    {/* Recent Requests */}
                    <section className="space-y-4">
                        <div>
                            <h2 className="text-lg font-semibold">
                                Recent Rental Requests
                            </h2>

                            <p className="text-sm text-muted-foreground">
                                Your latest rental activity.
                            </p>
                        </div>

                        {recentRequests.length === 0 ? (
                            <div className="rounded-2xl border p-10 text-center">
                                <ClipboardList className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />

                                <p className="font-medium">
                                    No rental requests yet
                                </p>

                                <p className="mt-1 text-sm text-muted-foreground">
                                    Browse properties and submit a rental
                                    request to get started.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {recentRequests.map((request) => (
                                    <div
                                        key={request.id}
                                        className="flex flex-col gap-4 rounded-2xl border bg-card p-5 transition-shadow hover:shadow-sm sm:flex-row sm:items-center sm:justify-between"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="h-16 w-20 overflow-hidden rounded-xl bg-muted">
                                                {request.property.images?.[0] ? (
                                                    <img
                                                        src={
                                                            request.property
                                                                .images[0]
                                                        }
                                                        alt={
                                                            request.property
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

                                            <div>
                                                <h3 className="font-medium">
                                                    {request.property.title}
                                                </h3>

                                                <p className="text-sm text-muted-foreground">
                                                    {request.property.city}
                                                </p>

                                                <p className="mt-1 text-sm font-medium">
                                                    ৳
                                                    {request.property.price.toLocaleString()}
                                                    /month
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
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
                                                                    : "bg-muted text-muted-foreground"
                                                    }`}
                                            >
                                                {request.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                </>
            )}
        </div>
    );
}