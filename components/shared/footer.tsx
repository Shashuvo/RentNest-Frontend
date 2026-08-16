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
        <footer className="relative overflow-hidden border-t border-border bg-muted/30">
            {/* Ambient glow accent */}
            <div
                className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
                aria-hidden="true"
            />

            <div className="relative mx-auto max-w-full px-10">
                {/* Main footer */}
                <div className="grid gap-8 py-10 sm:py-12 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
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

                            <span className="font-serif text-xl font-bold tracking-tight">
                                Rent<span className="text-primary">Nest</span>
                            </span>
                        </Link>

                        <p className="mt-3.5 text-sm leading-6 text-muted-foreground">
                            A simpler way to discover homes, connect with
                            landlords, and manage your rental journey from
                            one place.
                        </p>

                        {/* Social links */}
                        <div className="mt-4 flex flex-wrap items-center gap-2">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;

                                return (
                                    <Link
                                        key={social.label}
                                        href={social.href}
                                        aria-label={social.label}
                                        className="flex size-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary/10 hover:text-primary"
                                    >
                                        <Icon className="size-4" />
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Explore */}
                    <div>
                        <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                            Explore
                        </h3>

                        <ul className="mt-3 space-y-2">
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
                        <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                            Account
                        </h3>

                        <ul className="mt-3 space-y-2">
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
                    <div className="rounded-2xl border border-primary/15 bg-card p-4 shadow-sm">
                        <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary ring-4 ring-primary/5">
                            <Building2 className="size-4.5" />
                        </div>

                        <h3 className="mt-3 font-serif text-base tracking-tight text-foreground">
                            Looking for a new home?
                        </h3>

                        <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                            Explore properties and find a place that feels
                            right for you.
                        </p>

                        <Link
                            href="/properties"
                            className="group mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                        >
                            Browse properties
                            <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                    </div>
                </div>

                {/* Bottom */}
                <div className="flex flex-col gap-3 border-t border-border py-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-0.5">
                        <p className="text-xs text-muted-foreground">
                            © {new Date().getFullYear()} RentNest. All rights
                            reserved.
                        </p>

                        <p className="text-xs text-muted-foreground">
                            Built with care by{" "}
                            <Link
                                href="https://shahariat.netlify.app/"
                                className="font-medium text-foreground transition-colors hover:text-primary"
                            >
                                MD. Shahariat Hossen
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