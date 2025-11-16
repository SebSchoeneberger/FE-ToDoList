import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { getCategories } from "../API/categoryAPI";
import { createTodo } from "../API/todoAPI";
import { useNavigate } from "react-router-dom";

function CreateToDoForm() {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {
            title: '',
            description: "",
            dueDate: "",
            category: "",
            status: "pending",
            priority: "medium",
        }
    });
    const [categories, setCategories] = useState<any[]>([]);
    const [loadingCategories, setLoadingCategories] = useState<boolean>(true);
    const navigate = useNavigate();
    

    useEffect(() => {
        async function fetchCategories() {
            try {
                const data = await getCategories();
                setCategories(data.categories);
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                setLoadingCategories(false);
            }
        }

        fetchCategories();
    }, []);

    async function onSubmit(formData: any) {
        try {
            const categoryValue = formData.category === "" ? undefined : formData.category;
            const dueDateValue = formData.dueDate === "" ? undefined : formData.dueDate;
            await createTodo({
                title: formData.title,
                description: formData.description,
                dueDate: dueDateValue,
                category: categoryValue,
                status: formData.status,
                priority: formData.priority,
            });
            navigate("/dashboard");
        } catch (error) {
            console.error("Error creating todo:", error);
        }
    }

    return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md space-y-4">

        <div>
       <label className="block text-sm font-medium mb-1">
          Title <span className="text-red-500">*</span>
        </label>
        <input
            className="w-full rounded-md border px-3 py-2"
            {...register("title", { required: "Title is required" })}
        />
        {errors.title && (
            <p className="text-red-600 text-sm">{errors.title.message}</p>
        )}
        </div>

        <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
            className="w-full rounded-md border px-3 py-2"
            {...register("description")}
        />
        </div>

        <div>
        <label className="block text-sm font-medium mb-1">Due Date</label>
        <input
            type="date"
            className="w-full rounded-md border px-3 py-2"
            {...register("dueDate")}
        />
        </div>

        <div>
        <label className="block text-sm font-medium mb-1">Category</label>

        {loadingCategories ? (
            <p className="text-sm text-gray-500">Loading categories...</p>
        ) : (
            <select
            className="w-full rounded-md border px-3 py-2"
            {...register("category")}
            >
            <option value="">No category</option>
            {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                {cat.name}
                </option>
            ))}
            </select>
        )}
        </div>

        <div>
        <label className="block text-sm font-medium mb-1">Status</label>
        <select
            className="w-full rounded-md border px-3 py-2"
            {...register("status")}
        >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
        </select>
        </div>

        <div>
        <label className="block text-sm font-medium mb-1">Priority</label>
        <select
            className="w-full rounded-md border px-3 py-2"
            {...register("priority")}
        >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
        </select>
        </div>

        <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-md bg-blue-600 px-3 py-2 font-medium text-white hover:bg-blue-700"
        >
        {isSubmitting ? "Creating..." : "Create To-Do"}
        </button>

    </form>
    );

}
export default CreateToDoForm;