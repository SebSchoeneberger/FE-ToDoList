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
        <>
        <h1>Login</h1>
        <div className="flex justify-center items-center p-8">
            <LoginForm onSubmit={handleLogin} />
        </div>
        </>
     );
}

export default Login;
