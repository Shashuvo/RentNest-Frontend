import { getMe } from "@/service/getMe";


export default async function ProfilePage() {
    const result = await getMe();

    console.log(result);

    return (
        <div className="p-6">
            Profile
        </div>
    );
}