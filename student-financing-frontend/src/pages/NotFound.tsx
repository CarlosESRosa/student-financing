import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from '../ui/PrimaryButton';
import { ArrowLeftIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid';

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <main className="min-h-screen flex items-center justify-center bg-bg px-4">
            <div className="w-full max-w-2xl text-center">
                {/* Ilustração */}
                <div className="mb-8">
                    <ExclamationCircleIcon className="w-32 h-32 mx-auto text-error" />
                </div>

                {/* Título e mensagem */}
                <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                    Página não encontrada
                </h2>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">
                    A página que você está procurando não existe ou você não tem permissão para
                    acessá-la. Verifique o endereço ou faça login para continuar.
                </p>

                {/* Botão de ação */}
                <div className="flex justify-center">
                    <PrimaryButton
                        onClick={() => navigate('/')}
                        icon={<ArrowLeftIcon className="h-5 w-5" />}
                    >
                        Voltar para o login
                    </PrimaryButton>
                </div>
            </div>
        </main>
    );
} 