"use client"

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import {
    LayoutDashboard,
    Settings,
    CreditCard,
    LogOut,
    Menu,
    X,
    House,
    Building2,
    Compass,
    Info,
    User,
    ClipboardList,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { NavbarProps } from "@/lib/types"
import { logout } from "@/service/logout"

const navItems = [
    { label: "Home", href: "/", icon: House },
    { label: "Properties", href: "/properties", icon: Building2 },
    { label: "How It Works", href: "/works", icon: Compass },
    { label: "About Us", href: "/about", icon: Info },
]

const getUserMenuItems = (role?: string) => [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        action: "dashboard",
    },
    {
        label: "Profile",
        icon: User,
        action: "profile",
    },
    ...(role === "TENANT" ? [
        {
            label: "Payment",
            icon: CreditCard,
            action: "payment",
        },
    ] : []),
    ...(role === "LANDLORD" ? [
        {
            label: "Rental Requests",
            icon: ClipboardList,
            action: "rental-requests",
        },
    ] : []),
    {
        label: "Settings",
        icon: Settings,
        action: "settings",
    },
];

export function Navbar({ user }: NavbarProps) {
    const [mobileOpen, setMobileOpen] = useState(false)
    const pathname = usePathname()
    const router = useRouter()

    const handleUserMenuAction = async (action: string) => {
        if (action === "dashboard") {
            if (user.data?.role === "TENANT") {
                router.push("/dashboard")
            } else if (user.data?.role === "LANDLORD") {
                router.push("/landlord-dashboard")
            } else if (user.data?.role === "ADMIN") {
                router.push("/admin-dashboard")
            }
        }

        if (action === "logout") {
            await logout();
            toast.success("User logged out successfully.")
            router.push("/login")
        }

        if (action === "rental-requests") {
            router.push("/landlord-requests");
        }

        if (action === "payment") {
            router.push("/payment");
        }
    }

    return (
        <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md supports-backdrop-filter:bg-background/60">
            <nav className="mx-auto flex h-18 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2.5 font-semibold text-lg">
                    <span className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm transition-transform duration-200 hover:scale-105">
                        <House className="size-4.5" strokeWidth={2.5} />
                    </span>
                    <span className="font-serif text-xl tracking-tight">
                        Rent<span className="text-primary">Nest</span>
                    </span>
                </Link>

                {/* Desktop nav links */}
                <ul className="hidden items-center gap-1 rounded-full border border-border bg-card/60 p-1 shadow-sm md:flex">
                    {navItems.map((item) => {
                        const Icon = item.icon
                        const isActive = pathname === item.href
                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
                                        isActive
                                            ? "bg-primary text-primary-foreground shadow-sm"
                                            : "text-muted-foreground hover:bg-primary/10 hover:text-primary",
                                    )}
                                >
                                    <Icon className="size-4" />
                                    {item.label}
                                </Link>
                            </li>
                        )
                    })}
                </ul>

                {/* Right side: user dropdown + mobile toggle */}
                <div className="flex items-center gap-2.5">
                    {user.success ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="relative size-10 rounded-full p-0.5 ring-2 ring-primary/15 transition-all duration-200 hover:ring-primary/40"
                                    aria-label="Open user menu"
                                >
                                    <Avatar className="size-9">
                                        <AvatarImage
                                            src={user.data?.photoUrl || "/placeholder.svg"}
                                            alt={user.data?.name}
                                        />
                                        <AvatarFallback className="bg-primary/10 font-medium text-primary">
                                            {(user.data?.name || "John Doe")
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-60 rounded-2xl p-2 shadow-lg">
                                <DropdownMenuGroup>
                                    <DropdownMenuLabel className="px-2 py-2">
                                        <div className="flex items-center gap-2.5">
                                            <Avatar className="size-9 ring-2 ring-primary/10">
                                                <AvatarImage
                                                    src={user.data?.photoUrl || "/placeholder.svg"}
                                                    alt={user.data?.name}
                                                />
                                                <AvatarFallback className="bg-primary/10 text-xs font-medium text-primary">
                                                    {(user.data?.name || "John Doe")
                                                        .split(" ")
                                                        .map((n) => n[0])
                                                        .join("")}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex min-w-0 flex-col gap-0.5">
                                                <span className="truncate text-sm font-semibold text-foreground">
                                                    {user.data?.name || "John Doe"}
                                                </span>
                                                <span className="truncate text-xs font-normal text-muted-foreground">
                                                    {user.data?.email || "JohnDoe@email.com"}
                                                </span>
                                            </div>
                                        </div>
                                    </DropdownMenuLabel>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    {getUserMenuItems(user.data?.role).map((item) => {
                                        const Icon = item.icon
                                        return (
                                            <DropdownMenuItem
                                                key={item.action}
                                                className="gap-2.5 rounded-lg py-2"
                                                onClick={() => handleUserMenuAction(item.action)}
                                            >
                                                <span className="flex size-7 items-center justify-center rounded-full bg-primary/10 text-primary">
                                                    <Icon className="size-3.5" />
                                                </span>
                                                {item.label}
                                            </DropdownMenuItem>
                                        )
                                    })}
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    variant="destructive"
                                    className="gap-2.5 rounded-lg py-2"
                                    onClick={async () => {
                                        await handleUserMenuAction("logout")
                                    }}
                                >
                                    <span className="flex size-7 items-center justify-center rounded-full bg-destructive/10">
                                        <LogOut className="size-3.5" />
                                    </span>
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Link href={"/login"}>
                            <Button className="rounded-full px-8 shadow-sm">Login</Button>
                        </Link>
                    )}

                    <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground md:hidden"
                        aria-label="Toggle navigation menu"
                        aria-expanded={mobileOpen}
                        onClick={() => setMobileOpen((v) => !v)}
                    >
                        {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
                    </Button>
                </div>
            </nav>

            {/* Mobile nav links */}
            {mobileOpen && (
                <div className="border-t border-border bg-background/95 backdrop-blur-md md:hidden">
                    <ul className="mx-auto flex max-w-6xl flex-col gap-1.5 px-4 py-4 sm:px-6">
                        {navItems.map((item) => {
                            const Icon = item.icon
                            const isActive = pathname === item.href
                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        onClick={() => setMobileOpen(false)}
                                        className={cn(
                                            "flex items-center gap-3 rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-200",
                                            isActive
                                                ? "bg-primary text-primary-foreground shadow-sm"
                                                : "text-muted-foreground hover:bg-primary/10 hover:text-primary",
                                        )}
                                    >
                                        <Icon className="size-4" />
                                        {item.label}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            )}
        </header>
    )
}