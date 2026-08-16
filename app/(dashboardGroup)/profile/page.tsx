import { UserRound } from "lucide-react";

import { getMe } from "@/service/getMe";
import ProfileForm from "../_components/profile/ProfileForm";
import { ProfileErrorToast } from "../_components/profile/ProfileErrorToast";

export default async function ProfilePage() {
    const result = await getMe();

    if (!result.success) {
        return (
            <div className="mx-auto w-full max-w-3xl p-6">
                <div className="mb-8 flex items-center gap-4">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary ring-4 ring-primary/5">
                        <UserRound className="size-5" />
                    </span>

                    <div>
                        <h1 className="font-serif text-3xl tracking-tight text-foreground">
                            Profile
                        </h1>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Manage your personal information and account details.
                        </p>
                    </div>
                </div>

                <div className="relative flex min-h-64 flex-col items-center justify-center overflow-hidden rounded-3xl border border-dashed border-border bg-card/40 px-6 text-center">
                    <div
                        className="pointer-events-none absolute -top-10 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-destructive/10 blur-3xl"
                        aria-hidden="true"
                    />

                    <div className="relative flex size-14 items-center justify-center rounded-full bg-destructive/10 text-destructive ring-4 ring-destructive/10">
                        <UserRound className="size-6" />
                    </div>

                    <h2 className="relative mt-5 font-serif text-xl tracking-tight text-foreground">
                        Couldn&apos;t load your profile
                    </h2>

                    <p className="relative mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                        We ran into a problem loading your account details. Please try again.
                    </p>

                    <a
                        href="/profile"
                        className="relative mt-5 inline-flex h-10 items-center rounded-full border border-primary/20 px-5 text-sm font-medium text-primary shadow-sm transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                        Try again
                    </a>
                </div>

                <ProfileErrorToast message={result.message} />
            </div>
        );
    }

    const user = result.data;

    return (
        <div className="mx-auto w-full max-w-3xl p-6">
            <div className="mb-8 flex items-center gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary ring-4 ring-primary/5">
                    <UserRound className="size-5" />
                </span>

                <div>
                    <h1 className="font-serif text-3xl tracking-tight text-foreground">
                        Profile
                    </h1>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Manage your personal information and account details.
                    </p>
                </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
                <div
                    className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl"
                    aria-hidden="true"
                />

                <div className="relative">
                    <ProfileForm user={user} />
                </div>
            </div>
        </div>
    );
}