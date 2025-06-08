import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
    HomeIcon,
    PlusCircleIcon,
    ClockIcon,
    UserCircleIcon,
    ArrowRightOnRectangleIcon,
    Bars3Icon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.svg';

export default function AppLayout() {
    const [open, setOpen] = useState(false);        // ⬅️ controla o menu mobile
    const { logout } = useAuth();
    const navigate = useNavigate();

    const navBase =
        'flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition';
    const icon = 'h-5 w-5';

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    /* lista de links para reaproveitar */
    const links = [
        {
            to: '/home',
            label: 'Dashboard',
            icon: <HomeIcon className={icon} />,
        },
        {
            to: '/nova-simulacao',
            label: 'Nova simulação',
            icon: <PlusCircleIcon className={icon} />,
        },
        {
            to: '/historico',
            label: 'Histórico',
            icon: <ClockIcon className={icon} />,
        },
        {
            to: '/perfil',
            label: 'Perfil',
            icon: <UserCircleIcon className={icon} />,
        },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-bg text-text">
            {/* ---------- Header ---------- */}
            <header className="bg-surface shadow-md">
                <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                    {/* Logo */}
                    <button
                        onClick={() => navigate('/home')}
                        className="flex items-center gap-2"
                    >
                        <img src={logo} alt="Logo" className="h-8 w-auto" />
                    </button>

                    {/* -------- botão hambúrguer -------- */}
                    <button
                        className="md:hidden p-2 rounded-lg hover:bg-primary/10"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                    </button>

                    {/* -------- navegação desktop -------- */}
                    <nav className="hidden md:flex items-center gap-1">
                        {links.map(l => (
                            <NavLink
                                key={l.to}
                                to={l.to}
                                className={({ isActive }) =>
                                    `${navBase} ${isActive ? 'bg-primary/10 text-primary' : 'hover:bg-primary/5'
                                    }`
                                }
                            >
                                {l.icon}
                                {l.label}
                            </NavLink>
                        ))}

                        <button
                            onClick={handleLogout}
                            className={`${navBase} text-red-600 hover:bg-red-50`}
                        >
                            <ArrowRightOnRectangleIcon className={icon} />
                            Sair
                        </button>
                    </nav>
                </div>

                {/* -------- navegação mobile (drawer) -------- */}
                {open && (
                    <nav className="md:hidden bg-surface border-t shadow-inner">
                        {links.map(l => (
                            <NavLink
                                key={l.to}
                                to={l.to}
                                onClick={() => setOpen(false)}
                                className={({ isActive }) =>
                                    `${navBase} mx-4 mt-2 ${isActive ? 'bg-primary/10 text-primary' : 'hover:bg-primary/5'
                                    }`
                                }
                            >
                                {l.icon}
                                {l.label}
                            </NavLink>
                        ))}

                        <button
                            onClick={() => {
                                setOpen(false);
                                handleLogout();
                            }}
                            className={`${navBase} mx-4 mt-2 text-red-600 hover:bg-red-50`}
                        >
                            <ArrowRightOnRectangleIcon className={icon} />
                            Sair
                        </button>
                    </nav>
                )}
            </header>

            {/* ---------- Conteúdo ---------- */}
            <main className="flex-1 container mx-auto px-6 py-8">
                <Outlet />
            </main>

            {/* ---------- Footer ---------- */}
            <footer className="bg-surface border-t">
                <div className="container mx-auto px-6 h-14 flex items-center justify-center text-sm">
                    © {new Date().getFullYear()} • Carlos Eduardo Soares Rosa
                </div>
            </footer>
        </div>
    );
}
