import { useAuth } from "../context/AuthProvider";


function Dashboard() {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    return ( 
        <>
         <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-semibold">
                    Welcome {user?.firstName} {user?.lastName}!
                </h1>
            </div>
        </div>
        </>
     );
}

export default Dashboard;