import CreateToDoForm from "../components/CreateToDoForm";
import { useAuth } from "../context/AuthProvider";
import { Navigate } from "react-router-dom";

function CreateTodo() {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center">Create a New To-Do</h2>

        <CreateToDoForm />
      </div>
    </div>
  );
}

export default CreateTodo;