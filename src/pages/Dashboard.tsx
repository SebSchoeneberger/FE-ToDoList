import { useAuth } from "../context/AuthProvider";
import { useState } from "react";
import { getTodos, markTodoDone } from "../API/todoAPI";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../API/categoryAPI";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";


function Dashboard() {
    const { user, loading } = useAuth();
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [selectedStatus, setSelectedStatus] = useState<string>("all");
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    // Tanstack React Query to fetch todos and categories
    const {
        data: todosData,
        isLoading: loadingTodos,
    } = useQuery({
        queryKey: ["todos"],
        queryFn: getTodos,
    });
    
    const { data: categoriesData } = useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
    });

    const todos = todosData?.todos || [];
    const categories = categoriesData?.categories || [];

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

    const categoryOptions = [
    { id: "all", name: "All" },
    { id: "none", name: "No category" },
    ...categories.map((cat) => ({
        id: cat.id,
        name: cat.name,
    })),
    ];

    const statusOptions = [
  { id: "all", name: "All" },
  { id: "pending", name: "Pending" },
  { id: "in-progress", name: "In Progress" },
  { id: "completed", name: "Completed" },
];


const filteredTodos = todos.filter((todo) => {
  if (selectedCategory !== "all") {
    if (selectedCategory === "none" && todo.category) return false;

    const catId =
      todo.category && typeof todo.category === "object"
        ? todo.category.id
        : todo.category;

    if (selectedCategory !== "none" && Number(selectedCategory) !== Number(catId)) {
      return false;
    }
  }

  if (selectedStatus !== "all" && todo.status !== selectedStatus) {
    return false;
  }

  return true;
});

    const markDoneMutation = useMutation({
        mutationFn: (id: string) => markTodoDone(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
    });


    async function handleMarkDone(id: string) {
        markDoneMutation.mutate(id);
    }


    return (
        <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-2xl font-semibold mb-4">
            Welcome back, {user?.firstName}!
        </h1>

       <div className="mb-4 flex gap-4 justify-center items-center">
        <label className="block mb-1 text-sm font-medium">Filter by Category</label>
        <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-md border px-3 py-2"
        >
            {categoryOptions.map((cat) => (
            <option key={cat.id} value={cat.id}>
                {cat.name}
            </option>
            ))}
        </select>

            <label className="block mb-1 text-sm font-medium">Filter by Status</label>
            <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="rounded-md border px-3 py-2"
                >
                {statusOptions.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                    {opt.name}
                </option>
                ))}
            </select>

                </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTodos.map((todo) => (
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

                {todo.status !== "completed" ? (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleMarkDone(todo.id);
                        }}
                        className="mt-3 text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                        Mark as Done
                    </button>
                ) : (
                    <div className="mt-3 text-sm text-green-600 font-semibold">
                        ✓ Completed
                    </div>
                )}
            </div>
            ))}
        </div>

        <div className="mt-8 flex gap-4 justify-center">
            <button
            onClick={() => navigate("/create-todo")}
            className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
            >
            Create To-Do
            </button>

            <button
            onClick={() => navigate("/categories")}
            className="rounded-md border border-gray-300 px-4 py-2 font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
            Manage Categories
        </button>
        </div>
        </div>
    );
    }

export default Dashboard;