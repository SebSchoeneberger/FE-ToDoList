import LoginForm from "../components/LoginForm";
import type { LoginValues } from "../components/LoginForm";
import { login } from "../API/authAPI";
import { storeToken } from "../utils/localStorage";


function Login() {

    const handleLogin = async (data: LoginValues) => {
    try {
      const res = await login(data.email, data.password);
        storeToken(res.token);
        window.location.href = "/dashboard";
      console.log("Login successful:", res);
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
