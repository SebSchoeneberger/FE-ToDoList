import { createContext, useContext, useEffect, useState } from "react";
import { login, me } from "../API/authAPI";
import { getToken, storeToken, clearToken } from "../utils/localStorage";

type AuthContextValue= {
    token: string | null;
    user: any | null;
    loginUser: (email: string, password: string) => Promise<void>;
    logoutUser: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState<string | null>(getToken());
    const [user, setUser] = useState<any | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {

        async function fetchUser() {
            if (!token) {
                setUser(null);
                setLoading(false);
                return;
            }
            setLoading(true);
            try {
                const res = await me();
                setUser(res.user);
            } catch (error) {
                console.error("Failed to fetch user:", error);
                clearToken();
                setToken(null)
                setUser(null);
            } finally {
                setLoading(false);
            }
        }

        fetchUser();
    }, [token]);

    async function loginUser(email: string, password: string) {
        setLoading(true);
        try {
            const res = await login(email, password);
            storeToken(res.token);
            setToken(res.token);
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    }
    
    function logoutUser() {
        clearToken();
        setToken(null);
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ token, user, loginUser, logoutUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

