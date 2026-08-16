import { getMe } from "@/service/getMe";
import ProfileForm from "../_components/profile/ProfileForm";


export default async function ProfilePage() {
    const result = await getMe();

    if (!result.success) {
        return (
            <div className="p-6">
                <p className="text-destructive">
                    {result.message}
                </p>
            </div>
        );
    }

    const user = result.data;

    return (
        <div className="mx-auto w-full max-w-3xl p-6">
            <div className="mb-8">
                <h1 className="font-serif text-3xl tracking-tight">
                    Profile
                </h1>

                <p className="mt-1.5 text-sm text-muted-foreground">
                    Manage your personal information and account details.
                </p>
            </div>

            <div className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
                <ProfileForm user={user} />
            </div>
        </div>
    );
}