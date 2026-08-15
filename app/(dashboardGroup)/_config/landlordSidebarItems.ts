
import { SidebarItemsProps } from "@/lib/types";
import {
    Building2,
    ClipboardList,
    LayoutDashboard,
} from "lucide-react";

export const LANDLORD_SIDEBAR_ITEMS: SidebarItemsProps[] = [
    {
        label: "My Dashboard",
        href: "/landlord-dashboard",
        icon: LayoutDashboard,
    },
    {
        label: "My Properties",
        href: "/landlord-dashboard/properties",
        icon: Building2,
    },
    {
        label: "Rental Requests",
        href: "/landlord-dashboard/requests",
        icon: ClipboardList,
    },
];