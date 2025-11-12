import { getToken } from "../utils/localStorage";

const API_URL = import.meta.env.VITE_API_URL;

export async function login(email: string, password: string): Promise<{ token: string }> {
    const res = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
        throw new Error('Login failed');
    }

    return res.json();
}

export async function signup(firstName: string, lastName: string, email: string, password: string): Promise<{ doc: any; message: string }> {
    const res = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
    });
    
    if (!res.ok) {
        throw new Error('Signup failed');
    }

    return res.json();
}

export async function me(): Promise<{user: any}> {
    const token = getToken();
    if (!token) {
        throw new Error('No token found');
    }

    const res = await fetch(`${API_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        throw new Error('Fetching user info failed');
    }

    return res.json();
}
