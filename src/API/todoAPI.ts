import { getToken } from "../utils/localStorage";

const API_URL = import.meta.env.VITE_API_URL;

export async function getTodos(): Promise<{ todos: any[] }> {
    const token = getToken();
    if (!token) {
        throw new Error('No token found');
    }

    const res = await fetch(`${API_URL}/todos?depth=1`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        throw new Error('Fetching todos failed');
    }

    const data = await res.json();
    return {todos: data.docs || [] };
}

export async function createTodo(todoData: any): Promise<any> {
    const token = getToken();
    if (!token) {
        throw new Error('No token found');
    }

    const res = await fetch(`${API_URL}/todos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(todoData),
    });

    if (!res.ok) {
        throw new Error('Creating todo failed');
    }

    return res.json();
}