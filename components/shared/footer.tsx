"use client"


import Link from "next/link";
import {
    ArrowUpRight,
    Building2,
    House,
    Mail,
} from "lucide-react";

import {
    FaFacebookF,
    FaGithub,
    FaInstagram,
    FaLinkedinIn,
    FaXTwitter,
} from "react-icons/fa6";

const footerLinks = {
    Explore: [
        { label: "Home", href: "/" },
        { label: "Properties", href: "/properties" },
        { label: "How It Works", href: "/works" },
        { label: "About Us", href: "/about" },
    ],
    Account: [
        { label: "Login", href: "/login" },
        { label: "Register", href: "/register" },
        { label: "Profile", href: "/profile" },
    ],
};

const socialLinks = [
    {
        label: "Facebook",
        href: "https://www.facebook.com/shahariat.hossen.524",
        icon: FaFacebookF,
    },
    {
        label: "Instagram",
        href: "https://www.instagram.com/o__shuv__o/?__pwa=1",
        icon: FaInstagram,
    },
    {
        label: "Twitter",
        href: "#",
        icon: FaXTwitter,
    },
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/shahariat-hossen/",
        icon: FaLinkedinIn,
    },
    {
        label: "GitHub",
        href: "https://github.com/Shashuvo",
        icon: FaGithub,
    },
];

export function Footer() {
    return (
        <footer className="border-t bg-muted/30">
            <div className="mx-auto max-w-full px-10">
                {/* Main footer */}
                <div className="grid gap-12 py-14 sm:py-16 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
                    {/* Brand */}
                    <div className="max-w-sm">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2.5"
                        >
                            <span className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm transition-transform duration-200 hover:scale-105">
                                <House
                                    className="size-4.5"
                                    strokeWidth={2.5}
                                />
                            </span>

                            <span className="font-serif text-xl tracking-tight">
                                Rent<span className="text-primary">Nest</span>
                            </span>
                        </Link>

                        <p className="mt-5 text-sm leading-6 text-muted-foreground">
                            A simpler way to discover homes, connect with
                            landlords, and manage your rental journey from
                            one place.
                        </p>

                        {/* Social links */}
                        <div className="mt-6 flex flex-wrap items-center gap-2">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;

                                return (
                                    <Link
                                        key={social.label}
                                        href={social.href}
                                        aria-label={social.label}
                                        className="flex size-9 items-center justify-center rounded-full border bg-background text-muted-foreground transition-all duration-200 hover:border-primary/30 hover:bg-primary/10 hover:text-primary hover:-translate-y-0.5"
                                    >
                                        <Icon className="size-4" />
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Explore */}
                    <div>
                        <h3 className="text-sm font-semibold">
                            Explore
                        </h3>

                        <ul className="mt-5 space-y-3">
                            {footerLinks.Explore.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground transition-colors hover:text-primary"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Account */}
                    <div>
                        <h3 className="text-sm font-semibold">
                            Account
                        </h3>

                        <ul className="mt-5 space-y-3">
                            {footerLinks.Account.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground transition-colors hover:text-primary"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* CTA */}
                    <div>
                        <div className="flex size-10 items-center justify-center rounded-xl border bg-background">
                            <Building2 className="size-5" />
                        </div>

                        <h3 className="mt-4 text-lg font-semibold tracking-tight">
                            Looking for a new home?
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                            Explore properties and find a place that feels
                            right for you.
                        </p>

                        <Link
                            href="/properties"
                            className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                        >
                            Browse properties
                            <ArrowUpRight className="size-4" />
                        </Link>
                    </div>
                </div>

                {/* Bottom */}
                <div className="flex flex-col gap-5 border-t py-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">
                            © {new Date().getFullYear()} RentNest. All rights
                            reserved.
                        </p>

                        <p className="text-xs text-muted-foreground">
                            Built with care by{" "}
                            <Link
                                href="#"
                                className="font-medium text-foreground transition-colors hover:text-primary"
                            >
                                MD. Shahariat Hossen Shuvo
                            </Link>
                        </p>
                    </div>

                    <div className="flex items-center gap-5">
                        <Link
                            href="#"
                            className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                        >
                            Privacy Policy
                        </Link>

                        <Link
                            href="#"
                            className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                        >
                            Terms of Service
                        </Link>

                        <a
                            href="mailto:contact@rentnest.com"
                            className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-primary"
                        >
                            <Mail className="size-3.5" />
                            Contact
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

