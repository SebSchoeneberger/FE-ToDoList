import SignUpForm from "../components/SignUpForm";
import type { SignUpValues } from "../components/SignUpForm";
import { signup, login } from "../API/authAPI";
import { storeToken } from "../utils/localStorage";

function SignUp() {
    const handleSignUp = async (data: SignUpValues) => {
        try {
            await signup(data.firstName, data.lastName, data.email, data.password);

            const loginRes = await login(data.email, data.password);
            storeToken(loginRes.token);
            window.location.href = "/dashboard";
        } catch (error) {
            console.error("Signup failed:", error);
        }
    };
    
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h2 className="mb-6 text-2xl font-bold text-center">Sign Up</h2>
                <SignUpForm onSubmit={handleSignUp} />
            </div>
        </div>
    );
}

export default SignUp;