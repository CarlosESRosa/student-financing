import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '../ui/Input';
import { PrimaryButton } from '../ui/PrimaryButton';
import { registerSchema, type RegisterFormData } from '../schemas/auth';

export default function Register() {
    const { register: registerUser } = useAuth();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        mode: 'onBlur',
    });

    const onSubmit = async (data: RegisterFormData) => {
        try {
            await registerUser(data.nome, data.sobrenome, data.email, data.senha);
            navigate('/home');
        } catch (error) {
            alert('Erro ao criar conta');
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-bg px-4">
            <div className="w-full max-w-md bg-surface shadow-xl rounded-2xl p-10">
                <h1 className="text-center text-3xl font-semibold text-primary mb-8">
                    Criar Conta
                </h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <Input
                        label="Nome"
                        placeholder="Seu nome"
                        register={register('nome')}
                        error={errors.nome?.message}
                    />

                    <Input
                        label="Sobrenome"
                        placeholder="Seu sobrenome"
                        register={register('sobrenome')}
                        error={errors.sobrenome?.message}
                    />

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

                    <Input
                        label="Confirmar Senha"
                        type="password"
                        placeholder="••••••••"
                        register={register('confirmarSenha')}
                        error={errors.confirmarSenha?.message}
                    />

                    <PrimaryButton
                        type="submit"
                        isLoading={isSubmitting}
                        loadingText="Criando conta..."
                        className="w-full"
                    >
                        Criar Conta
                    </PrimaryButton>
                </form>

                <p className="mt-6 text-center text-sm">
                    Já tem uma conta?{' '}
                    <a
                        href="/"
                        className="text-secondary font-medium hover:underline"
                    >
                        Entre aqui
                    </a>
                </p>
            </div>
        </main>
    );
}
