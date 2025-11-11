import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../utils/localStorage";

function ProtectedLayout() {
    const token = getToken();

    if (!token) {
        return <Navigate to="/login" replace />;
    }
    return <Outlet />;
}

export default ProtectedLayout;