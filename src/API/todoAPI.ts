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

export async function getTodobyId(id: string): Promise<any> {
    const token = getToken();
    if (!token) {
        throw new Error('No token found');
    }
    
    const res = await fetch(`${API_URL}/todos/${id}?depth=1`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        throw new Error('Fetching todo by ID failed');
    }

    return res.json();
}

export async function updateTodo(id: string, todoData: any): Promise<any> {
    const token = getToken();
    if (!token) {
        throw new Error('No token found');
    }

    const res = await fetch(`${API_URL}/todos/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(todoData),
    });

    if (!res.ok) {
        throw new Error('Updating todo failed');
    }

    return res.json();
}

export async function deleteTodo(id: string): Promise<any> {
    const token = getToken();
    if (!token) {
        throw new Error('No token found');
    }

    const res = await fetch(`${API_URL}/todos/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        throw new Error('Deleting todo failed');
    }

    return res.json();
}


export async function markTodoDone(id: string): Promise<any> {
    const token = getToken();
    if (!token) throw new Error('No token found');

    const res = await fetch(`${API_URL}/todos/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ status: "completed" }),
    });

    if (!res.ok) throw new Error("Marking todo complete failed");

    return res.json();
}
