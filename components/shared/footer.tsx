"use client"


import Link from "next/link";
import {
    ArrowUpRight,
    House,
    Mail,
    Sparkles,
} from "lucide-react";

import {
    FaFacebookF,
    FaGithub,
    FaInstagram,
    FaLinkedinIn,
    FaXTwitter,
} from "react-icons/fa6";

const footerLinks = [
    { label: "Home", href: "/" },
    { label: "Properties", href: "/properties" },
    { label: "How It Works", href: "/works" },
    { label: "About Us", href: "/about" },
    { label: "Login", href: "/login" },
    { label: "Register", href: "/register" },
];

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
        <footer className="relative overflow-hidden bg-primary/5 shadow-[0_-30px_80px_-30px_hsl(var(--primary)/0.35)]">
            {/* Ambient glow accent */}
            <div
                className="pointer-events-none absolute left-1/2 top-0 h-96 w-xl -translate-x-1/2 -translate-y-1/3 rounded-full bg-primary/10 blur-3xl"
                aria-hidden="true"
            />

            <div className="relative mx-auto max-w-3xl px-6 pt-16 text-center lg:px-10 lg:pt-20">
                {/* Logo mark */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2.5"
                >
                    <span className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm transition-transform duration-200 hover:scale-105">
                        <House className="size-6.5" strokeWidth={2.5} />
                    </span>

                    <span className="font-serif font-bold text-3xl tracking-tight text-foreground">
                        Rent<span className="text-primary">Nest</span>
                    </span>
                </Link>

                {/* Description under logo */}
                <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
                    A simpler way to discover homes, connect with landlords,
                    and manage your rental journey from one place.
                </p>

                {/* Nav links */}
                <nav className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
                    {footerLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Social links */}
                <div className="mt-8 flex items-center justify-center gap-3">
                    {socialLinks.map((social) => {
                        const Icon = social.icon;

                        return (
                            <Link
                                key={social.label}
                                href={social.href}
                                aria-label={social.label}
                                className="flex size-11 items-center justify-center rounded-full border border-primary/15 bg-card text-muted-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary/10 hover:text-primary"
                            >
                                <Icon className="size-4" />
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* CTA — wide, short, single row */}
            <div className="relative mx-auto mt-10 max-w-5xl px-6 lg:px-10">
                <div className="relative flex flex-col items-center gap-4 overflow-hidden rounded-3xl border border-primary/20 bg-card px-6 py-5 shadow-sm sm:flex-row sm:justify-between sm:gap-6 sm:px-8">
                    {/* Half primary shadow, left side */}
                    <div
                        className="pointer-events-none absolute -left-16 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-primary/25 blur-3xl"
                        aria-hidden="true"
                    />

                    <div className="relative flex flex-col items-center gap-3 text-center sm:flex-row sm:text-left">
                        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium tracking-wide text-primary">
                            <Sparkles className="size-3.5" />
                            Ready to move?
                        </span>

                        <h3 className="font-serif text-xl tracking-tight text-foreground">
                            Find your next home today.
                        </h3>
                    </div>

                    <Link
                        href="/properties"
                        className="group/btn relative inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:shadow-lg hover:shadow-primary/25"
                    >
                        Browse properties
                        <ArrowUpRight className="size-4 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </Link>
                </div>
            </div>

            {/* Full-width border above bottom bar */}
            <div className="relative mt-14 w-full border-t border-primary/10">
                <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 py-6 text-center sm:flex-row sm:justify-between sm:text-left lg:px-10">
                    <p className="text-xs text-muted-foreground">
                        © {new Date().getFullYear()} RentNest. Built with care
                        by{" "}
                        <Link
                            href="https://shahariat.netlify.app/"
                            className="font-medium text-foreground transition-colors hover:text-primary"
                        >
                            MD. Shahariat Hossen
                        </Link>
                    </p>

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