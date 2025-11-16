import { useEffect, useState } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { getTodobyId, updateTodo, deleteTodo } from "../API/todoAPI";
import { getCategories } from "../API/categoryAPI";
import { useAuth } from "../context/AuthProvider";

function ToDoDetails() {
    const {token} = useAuth();
    const { id } = useParams<{ id: string }>();
    const [categories, setCategories] = useState<any[]>([]);
    const [formValues, setFormValues] = useState({
        title: "",
        description: "",
        dueDate: "",
        status: "pending",
        priority: "medium",
        category: "",
        });
    const [update, setUpdate] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    useEffect(() => {
        if (!id) return;

        async function fetchTodo(todoId: string) {
            try {
                const data = await getTodobyId(todoId);

                const catData = await getCategories();
                setCategories(catData.categories);

                setFormValues({
                    title: data.title || "",
                    description: data.description || "",
                    dueDate: data.dueDate ? data.dueDate.split("T")[0] : "",
                    status: data.status || "pending",
                    priority: data.priority || "medium",
                    category: data.category && typeof data.category === "object" ? data.category.id : data.category || "",
                });
            } catch (error) {
                console.error("Error fetching todo details:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchTodo(id);
    }, [id]);

    async function handleUpdate() {
        if (!id) return;
        setUpdate(true);

        try {
            const categoryValue = formValues.category === "" ? null : formValues.category;
            const dueDateValue = formValues.dueDate === "" ? null : formValues.dueDate;

            await updateTodo(id, {
            title: formValues.title,
            description: formValues.description || "",
            dueDate: dueDateValue,
            category: categoryValue,
            status: formValues.status,
            priority: formValues.priority,
            });
            navigate("/dashboard");
        } catch (err) {
            console.error("Error updating todo:", err);
        } finally {
            setUpdate(false);
        }
        }

    async function handleDelete(){
        if (!id) return;

        const confirmed = window.confirm("Are you sure you want to delete this To-Do?");
        if (!confirmed) return;

        try {
            await deleteTodo(id);
            navigate("/dashboard")
        } catch (error) {
            console.error("Error deleting todo:", error)
        }
    }
    
    if (loading) {
        return <div>Loading...</div>;
    }

   return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-start">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow space-y-4">
            <h1 className="text-xl font-semibold">Edit To-Do</h1>

            <div>
            <label className="block text-sm font-medium mb-1">Title *</label>
            <input
                className="w-full rounded border px-3 py-2"
                value={formValues.title}
                onChange={(e) =>
                setFormValues((prev) => ({ ...prev, title: e.target.value }))
                }
            />
            </div>

            <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
                className="w-full rounded border px-3 py-2"
                value={formValues.description}
                onChange={(e) =>
                setFormValues((prev) => ({ ...prev, description: e.target.value }))
                }
            />
            </div>

            <div>
            <label className="block text-sm font-medium mb-1">Due Date</label>
            <input
                type="date"
                className="w-full rounded border px-3 py-2"
                value={formValues.dueDate}
                onChange={(e) =>
                setFormValues((prev) => ({ ...prev, dueDate: e.target.value }))
                }
            />
            </div>

            <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
                className="w-full rounded border px-3 py-2"
                value={formValues.category}
                onChange={(e) =>
                setFormValues((prev) => ({
                    ...prev,
                    category: e.target.value,
                }))
                }
            >
                <option value="">No category</option>
                {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                    {cat.name}
                </option>
                ))}
            </select>
            </div>

            <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
                className="w-full rounded border px-3 py-2"
                value={formValues.status}
                onChange={(e) =>
                setFormValues((prev) => ({ ...prev, status: e.target.value }))
                }
            >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
            </select>
            </div>

            <div>
            <label className="block text-sm font-medium mb-1">Priority</label>
            <select
                className="w-full rounded border px-3 py-2"
                value={formValues.priority}
                onChange={(e) =>
                setFormValues((prev) => ({ ...prev, priority: e.target.value }))
                }
            >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
            </div>

            <button
            onClick={handleUpdate}
            disabled={update}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
            {update ? "Saving..." : "Save Changes"}
            </button>

            <button
            onClick={handleDelete}
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
            >
            Delete To-Do
            </button>

            <button
            onClick={() => navigate("/dashboard")}
            className="w-full mt-2 text-sm text-gray-600 underline"
            >
            Back to Dashboard
            </button>
        </div>
        </div>

    );
}
export default ToDoDetails;