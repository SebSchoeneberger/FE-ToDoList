import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { getCategories, createCategory, deleteCategory } from "../API/categoryAPI";

type CategoryFormValues = {
    name: string;
    description: string;
    color: string;
};

function Categories() {
    const { token } = useAuth();
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<CategoryFormValues>({
        defaultValues: {
            name: "",
            description: "",
            color: "",
        },
    });

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getCategories();
                setCategories(data.categories);
            } catch (err) {
                console.error("Error fetching categories:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    async function refreshCategories() {
        try {
            const data = await getCategories();
            setCategories(data.categories);
        } catch (err) {
            console.error("Error refreshing categories:", err);
        }
    }

    async function onSubmit(formData: CategoryFormValues) {
        try {
            await createCategory({
                name: formData.name,
                description: formData.description,
                color: formData.color,
            });

            reset({
                name: "",
                description: "",
                color: "",
            });

            await refreshCategories();
        } catch (err) {
            console.error("Error creating category:", err);
        }
    }

    async function handleDelete(id: string) {
        const confirmed = window.confirm(
            "Are you sure you want to delete this category?"
        );
        if (!confirmed) return;

        setDeletingId(id);
        try {
            await deleteCategory(id);
            await refreshCategories();
        } catch (err) {
            console.error("Error deleting category:", err);
        } finally {
            setDeletingId(null);
        }
    }

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-100">
                <div className="text-gray-700">Loading categories...</div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md">
                <h2 className="mb-4 text-2xl font-bold text-center">Categories</h2>
                <p className="mb-6 text-sm text-gray-600 text-center">
                    Create simple categories to organize your to-dos.
                </p>

                {categories.length === 0 ? (
                    <p className="text-center text-gray-600">
                        You don’t have any categories yet.
                    </p>
                ) : (
                    <div className="space-y-2">
                        {categories.map((cat) => (
                            <div
                                key={cat.id}
                                className="flex items-center justify-between rounded-md border px-4 py-3"
                            >
                                <div>
                                    <div className="font-medium">{cat.name}</div>
                                    {cat.description && (
                                        <div className="text-sm text-gray-600">{cat.description}</div>
                                    )}
                                    {cat.color && (
                                        <div className="text-xs text-gray-500 mt-1">Color: {cat.color}</div>
                                    )}
                                </div>

                                <button
                                    onClick={() => handleDelete(cat.id.toString())}
                                    disabled={deletingId === cat.id.toString()}
                                    className="rounded-md bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
                                >
                                    {deletingId === cat.id.toString() ? "Deleting..." : "Delete"}
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                <h2 className="mb-4 text-2xl font-bold text-center pt-6">Create Category</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="mb-8 space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            className="w-full rounded-md border px-3 py-2"
                            {...register("name", { required: "Name is required" })}
                        />
                        {errors.name && (
                            <p className="text-sm text-red-600">{errors.name.message}</p>
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
                        <label className="block text-sm font-medium mb-1">
                            Color (Hex, optional)
                        </label>
                        <input
                            className="w-full rounded-md border px-3 py-2"
                            placeholder="#3498db"
                            {...register("color")}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded-md bg-blue-600 px-3 py-2 font-medium text-white hover:bg-blue-700"
                    >
                        {isSubmitting ? "Creating..." : "Create Category"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Categories;
