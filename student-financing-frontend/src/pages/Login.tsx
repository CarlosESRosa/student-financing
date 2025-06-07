import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

type FormValues = { email: string; senha: string };

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<FormValues>();

    const onSubmit = async (data: FormValues) => {
        try {
            await login(data.email, data.senha);
            navigate('/home');
        } catch {
            alert('Credenciais inválidas');
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-bg px-4">
            <div className="w-full max-w-md bg-surface shadow-xl rounded-2xl p-10">
                <h1 className="text-center text-3xl font-semibold text-primary mb-8">
                    Entrar
                </h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-text mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
                            placeholder="seu@email.com"
                            {...register('email', { required: true })}
                        />
                    </div>

                    {/* Senha */}
                    <div>
                        <label className="block text-sm font-medium text-text mb-1">
                            Senha
                        </label>
                        <input
                            type="password"
                            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
                            placeholder="••••••••"
                            {...register('senha', { required: true })}
                        />
                    </div>

                    <button
                        disabled={isSubmitting}
                        className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2 rounded-lg disabled:opacity-40 transition-colors"
                    >
                        Entrar
                    </button>
                </form>

                <p className="mt-6 text-center text-sm">
                    Ainda não tem conta?{' '}
                    <a
                        href="/cadastro"
                        className="text-secondary font-medium hover:underline"
                    >
                        Cadastre-se agora
                    </a>
                </p>
            </div>
        </main>
    );
}
