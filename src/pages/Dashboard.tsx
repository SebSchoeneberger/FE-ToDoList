import { useAuth } from "../context/AuthProvider";
import { useEffect, useState } from "react";
import { getTodos } from "../API/todoAPI";
import { useNavigate } from "react-router-dom";


function Dashboard() {
    const { user, loading } = useAuth();
    const [todos, setTodos] = useState<any[]>([]);
    const [loadingTodos, setLoadingTodos] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchTodos() {
            try {
                const data = await getTodos();
                setTodos(data.todos);
            } catch (error) {
                console.error("Error fetching todos:", error);
            } finally {
                setLoadingTodos(false);
            }   
        }

        fetchTodos();
    }, []);

    if (loading || loadingTodos) {
        return <div>Loading...</div>;
    }

    if (todos.length === 0) {
        return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md text-center">
            <h1 className="text-2xl font-semibold mb-4">
                Welcome {user?.firstName}!
            </h1>
            <p className="text-gray-600 mb-6">You don’t have any to-dos yet.</p>
            <button
            onClick={() => navigate("/create-todo")}
                className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
            >
                Create To-Do
            </button>
            </div>
        </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-2xl font-semibold mb-4">
            Welcome back, {user?.firstName}!
        </h1>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {todos.map((todo) => (
            <div key={todo.id}
                onClick={() => navigate(`/todo/${todo.id}`)} 
                className="rounded-lg bg-white p-4 shadow hover:shadow-lg cursor-pointer">
                <h2 className="text-lg font-medium">{todo.title}</h2>

                {todo.description && (
                <p className="mt-2 text-sm text-gray-600">
                    {todo.description}
                </p>
                )}

                <div className="mt-3 text-sm text-gray-500">
                {todo.category && typeof todo.category === "object"
                    ? `Category: ${todo.category.name}`
                    : "No category"}
                </div>

                {todo.dueDate && (
                <div className="text-sm text-gray-500">
                    Due: {new Date(todo.dueDate).toLocaleDateString()}
                </div>
                )}

                {todo.status && (
                <div className="text-sm text-gray-500">
                    Status: {todo.status}
                </div>
                )
                }

                {todo.priority && (
                <div className="text-sm text-gray-500">
                    Priority: {todo.priority}
                </div>
                )}
            </div>
            ))}
        </div>

        <div className="mt-8">
            <button
            onClick={() => navigate("/create-todo")}
            className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
            >
            Create To-Do
            </button>
        </div>
        </div>
    );
    }

export default Dashboard;