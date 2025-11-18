import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold mb-2">404</h1>
        <p className="text-gray-600 mb-6">The page you’re looking for doesn’t exist.</p>

        <Link
          to="/"
          className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
