import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '../ui/Input';
import { PrimaryButton } from '../ui/PrimaryButton';
import { loginSchema, type LoginFormData } from '../schemas/auth';

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        mode: 'onBlur',
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
            await login(data.email, data.senha);
            navigate('/home');
        } catch (error) {
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
                    <Input
                        label="Email"
                        type="email"
                        placeholder="seu@email.com"
                        register={register('email')}
                        error={errors.email?.message}
                    />

                    <Input
                        label="Senha"
                        type="password"
                        placeholder="••••••••"
                        register={register('senha')}
                        error={errors.senha?.message}
                    />

                    <PrimaryButton
                        type="submit"
                        isLoading={isSubmitting}
                        loadingText="Entrando..."
                        className="w-full"
                    >
                        Entrar
                    </PrimaryButton>
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
