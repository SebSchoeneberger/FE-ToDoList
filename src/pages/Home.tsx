import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 text-center">
        <h1 className="text-2xl font-bold mb-3">To-Do App</h1>
        <p className="text-gray-600 mb-6">
          Keep track of your tasks, stay organized, and never miss a deadline.
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate("/login")}
            className="w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
          >
            Log In
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="w-full rounded-md border border-gray-300 px-4 py-2 font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
