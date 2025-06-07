import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute() {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return <p className="text-center p-10">Carregando...</p>;

    return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
}
