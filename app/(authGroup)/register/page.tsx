import RegisterForm from "../_components/RegisterForm";

const RegisterPage = () => {
    return (
        <div className="flex min-h-screen items-center justify-center px-4">
            <div className="w-full max-w-md space-y-6 rounded-lg border p-8 shadow-sm">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold">Create an Account</h1>

                    <p className="text-gray-500">
                        Enter your information to create your RentNest account
                    </p>
                </div>

                <RegisterForm />
            </div>
        </div>
    );
};

export default RegisterPage;