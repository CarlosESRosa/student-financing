import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
    HomeIcon,
    PlusCircleIcon,
    ClockIcon,
    UserCircleIcon,
    ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.svg';

export default function AppLayout() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    /* estilos base */
    const navBase =
        'flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition';

    /* ícone */
    const icon = 'h-5 w-5';

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="min-h-screen flex flex-col bg-bg text-text">
            {/* Header */}
            <header className="bg-surface shadow-md">
                <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                    {/* Logo */}
                    <button
                        onClick={() => navigate('/home')}
                        className="flex items-center gap-2"
                    >
                        <img src={logo} alt="Logo" className="h-8 w-auto" />
                    </button>

                    {/* Navegação */}
                    <nav className="flex items-center gap-1">
                        <NavLink
                            to="/home"
                            className={({ isActive }) =>
                                `${navBase} ${isActive ? 'bg-primary/10 text-primary' : 'hover:bg-primary/5'
                                }`
                            }
                        >
                            <HomeIcon className={icon} />
                            Dashboard
                        </NavLink>

                        <NavLink
                            to="/nova-simulacao"
                            className={({ isActive }) =>
                                `${navBase} ${isActive ? 'bg-primary/10 text-primary' : 'hover:bg-primary/5'
                                }`
                            }
                        >
                            <PlusCircleIcon className={icon} />
                            Nova simulação
                        </NavLink>

                        <NavLink
                            to="/historico"
                            className={({ isActive }) =>
                                `${navBase} ${isActive ? 'bg-primary/10 text-primary' : 'hover:bg-primary/5'
                                }`
                            }
                        >
                            <ClockIcon className={icon} />
                            Histórico
                        </NavLink>

                        <NavLink
                            to="/perfil"
                            className={({ isActive }) =>
                                `${navBase} ${isActive ? 'bg-primary/10 text-primary' : 'hover:bg-primary/5'
                                }`
                            }
                        >
                            <UserCircleIcon className={icon} />
                            Perfil
                        </NavLink>

                        <button
                            onClick={handleLogout}
                            className={`${navBase} text-red-600 hover:bg-red-50`}
                        >
                            <ArrowRightOnRectangleIcon className={icon} />
                            Sair
                        </button>
                    </nav>
                </div>
            </header>

            {/* Conteúdo */}
            <main className="flex-1 container mx-auto px-6 py-8">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-surface border-t">
                <div className="container mx-auto px-6 h-14 flex items-center justify-center text-sm">
                    © {new Date().getFullYear()} • Carlos Eduardo Soares Rosa
                </div>
            </footer>
        </div>
    );
}

