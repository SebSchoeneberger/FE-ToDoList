import LoginForm from "../components/LoginForm";
import type { LoginValues } from "../validation/authSchemas";
import { useAuth } from "../context/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";


function Login() {

    const { loginUser, token } = useAuth();
    const navigate = useNavigate();

    if (token) {
      return <Navigate to="/dashboard" replace />;
    }

    async function handleLogin(data: LoginValues) {
    try {
      await loginUser(data.email, data.password);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h2 className="mb-6 text-2xl font-bold text-center">Login</h2>
                <LoginForm onSubmit={handleLogin} />
            </div>
        </div>
     );
}

export default Login;
