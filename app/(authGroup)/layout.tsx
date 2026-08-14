import { Navbar } from "@/components/shared/navbar";
import { IUser } from "@/lib/types";

const mockUser: IUser = {
    success: true,
    statusCode: 200,
    message: "User profile fetched successfully",
    data: {
        profile: {
            id: "user-123",
            name: "Shahariat Hossen",
            email: "shahariat@example.com",
            role: "TENANT",
            status: "ACTIVE",
            phone: "+8801712345678",
            address: "Chattogram, Bangladesh",
            photoUrl: "https://i.pravatar.cc/150?img=12",
            createdAt: "2026-08-14T10:00:00.000Z",
            updatedAt: "2026-08-14T10:00:00.000Z",
        },
    },
};


const AuthLayout = async (
    { children }: { children: React.ReactNode }
) => {
    return (
        <div>
            <Navbar user={mockUser}></Navbar>
            {children}
        </div>
    )
}

export default AuthLayout