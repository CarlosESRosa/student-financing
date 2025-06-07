import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './ui/ProtectedRoute';
import AppLayout from './layouts/AppLayout';

/* Páginas */
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardHome from './pages/DashboardHome';
import NewSimulationForm from './pages/NewSimulationForm';       // ← pode ser placeholder
import SimulationHistory from './pages/SimulationHistory'; // ← idem
import Profile from './pages/Profile';                     // ← idem

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* ---------- Públicas ---------- */}
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Register />} />

          {/* ---------- Privadas ---------- */}
          <Route element={<ProtectedRoute />}>
            {/* Layout com header/footer */}
            <Route element={<AppLayout />}>
              <Route path="/home" element={<DashboardHome />} />
              <Route path="/nova-simulacao" element={<NewSimulationForm />} />
              <Route path="/historico" element={<SimulationHistory />} />
              <Route path="/perfil" element={<Profile />} />
            </Route>
          </Route>

          {/* 404 */}
          <Route
            path="*"
            element={<p className="p-10">Página não encontrada</p>}
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
