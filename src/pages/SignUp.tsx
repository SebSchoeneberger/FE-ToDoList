import SignUpForm from "../components/SignUpForm";
import type { SignUpValues } from "../components/SignUpForm";
import { signup } from "../API/authAPI";
import {useAuth} from "../context/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";

function SignUp() {
    const { token, loginUser } = useAuth();
    const navigate = useNavigate();
    
    if (token) {
        return <Navigate to="/dashboard" replace />;
    }

    async function handleSignUp(data: SignUpValues) {
        try {
            await signup(data.firstName, data.lastName, data.email, data.password);
            await loginUser(data.email, data.password);
            navigate("/dashboard", { replace: true });
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