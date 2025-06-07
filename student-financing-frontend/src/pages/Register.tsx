import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

type FormValues = { nome: string; sobrenome: string; email: string; senha: string };

export default function Register() {
    const { register: signup } = useAuth();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<FormValues>();

    const onSubmit = async (data: FormValues) => {
        try {
            await signup(data.nome, data.sobrenome, data.email, data.senha);
            navigate('/home');
        } catch {
            alert('Erro ao criar conta');
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-bg px-4">
            <div className="w-full max-w-md bg-surface shadow-xl rounded-2xl p-10">
                <h1 className="text-center text-3xl font-semibold text-primary mb-8">
                    Criar conta
                </h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Nome */}
                    <div>
                        <label className="block text-sm font-medium text-text mb-1">
                            Nome
                        </label>
                        <input
                            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
                            placeholder="Carlos Eduardo"
                            {...register('nome', { required: true })}
                        />
                    </div>

                    {/* Sobrenome */}
                    <div>
                        <label className="block text-sm font-medium text-text mb-1">
                            Sobrenome
                        </label>
                        <input
                            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
                            placeholder="Soares Rosa"
                            {...register('sobrenome', { required: true })}
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-text mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
                            placeholder="carlos@example.com"
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
                            placeholder="******"
                            {...register('senha', { required: true, minLength: 6 })}
                        />
                    </div>

                    <button
                        disabled={isSubmitting}
                        className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2 rounded-lg disabled:opacity-40 transition-colors"
                    >
                        Criar conta
                    </button>
                </form>

                <p className="mt-6 text-center text-sm">
                    Já possui cadastro?{' '}
                    <a
                        href="/"
                        className="text-secondary font-medium hover:underline"
                    >
                        Fazer login
                    </a>
                </p>
            </div>
        </main>
    );
}
