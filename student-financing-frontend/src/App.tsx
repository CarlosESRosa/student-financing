import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './ui/ProtectedRoute';

// Páginas
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardHome from './pages/DashboardHome';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Públicas */}
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Register />} />

          {/* Privadas */}
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<DashboardHome />} />
            {/* adicione outras rotas privadas aqui */}
          </Route>

          {/* 404 */}
          <Route path="*" element={<p className="p-10">Página não encontrada</p>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
