import { getToken } from "../utils/localStorage";

const API_URL = import.meta.env.VITE_API_URL;

export async function getCategories(): Promise<{ categories: any[] }> {
    const token = getToken();
    if (!token) {
        throw new Error('No token found');
    }

    const res = await fetch(`${API_URL}/categories`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        throw new Error('Fetching categories failed');
    }
    
    const data = await res.json();
    return {categories: data.docs || [] };
}

