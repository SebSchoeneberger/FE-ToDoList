import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function ProtectedLayout() {
    const { token, loading } = useAuth();

if (loading) {
        return <div>Loading...</div>;
    }

if (!token) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}

export default ProtectedLayout;