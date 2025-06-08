import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { PencilSquareIcon, XMarkIcon, CheckIcon } from '@heroicons/react/24/solid';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import EditProfileModal from '../ui/EditProfileModal';
import Input from '../ui/Input';
import { PrimaryButton } from '../ui/PrimaryButton';
import { CancelButton } from '../ui/CancelButton';
import { profileSchema, type ProfileFormData } from '../schemas/auth';
import avatar from '../assets/profile.jpg';           // imagem fixa
import { showAlert } from '../utils/alert';

/* ------ styled wrappers (Tailwind via className) ----------------------- */
const Card = styled.section.attrs({
    className: 'bg-surface shadow-lg rounded-2xl p-8 flex flex-col gap-8',
})``;

const Row = styled.div.attrs({
    className: 'grid grid-cols-1 sm:grid-cols-2 gap-8',
})``;

/* ---------------------------------------------------------------------- */
export default function Profile() {
    const { user: ctxUser } = useAuth();
    const [user, setUser] = useState(ctxUser);
    const [open, setOpen] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitting, errors },
    } = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        mode: 'onBlur',
    });

    // Reset form when modal opens with current user data
    useEffect(() => {
        if (open && user) {
            reset({
                nome: user.nome,
                sobrenome: user.sobrenome,
                email: user.email,
            });
        }
    }, [open, user, reset]);

    const onSubmit = async (data: ProfileFormData) => {
        try {
            const res = await api.put<{ data: typeof user }>('/me', data);
            setUser(res.data.data);
            setOpen(false);
        } catch (error) {
            showAlert({
                title: 'Erro ao atualizar perfil',
                text: 'Não foi possível atualizar seu perfil. Tente novamente mais tarde.',
                icon: 'error',
            });
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    if (!user) return null; // fallback seguro

    return (
        <div className="max-w-4xl mx-auto space-y-10 py-8 px-4">
            {/* ---------- Header ---------- */}
            <div className="flex flex-col sm:flex-row items-center justify-between bg-surface p-4 sm:p-6 rounded-2xl shadow-lg gap-4 sm:gap-0">
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left">
                    <div className="relative">
                        <img
                            src={avatar}
                            alt="Foto de perfil"
                            className="h-20 w-20 sm:h-24 sm:w-24 rounded-full object-cover ring-4 ring-primary/20"
                        />
                        <div className="absolute -bottom-1 -right-1 bg-primary text-white p-1.5 rounded-full">
                            <PencilSquareIcon className="h-4 w-4" />
                        </div>
                    </div>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                            {user.nome} {user.sobrenome}
                        </h1>
                        <p className="text-gray-500 mt-1">{user.email}</p>
                    </div>
                </div>
                <PrimaryButton
                    onClick={() => setOpen(true)}
                    icon={<PencilSquareIcon className="h-5 w-5" />}
                    className="w-full sm:w-auto"
                >
                    Editar Perfil
                </PrimaryButton>
            </div>

            {/* ---------- Card de detalhes ---------- */}
            <Card>
                <h2 className="text-2xl font-semibold text-gray-800">Informações Pessoais</h2>
                <Row>
                    <div className="space-y-2">
                        <span className="block text-sm font-medium text-gray-500">Nome</span>
                        <p className="text-lg text-gray-800">{user.nome}</p>
                    </div>
                    <div className="space-y-2">
                        <span className="block text-sm font-medium text-gray-500">Sobrenome</span>
                        <p className="text-lg text-gray-800">{user.sobrenome}</p>
                    </div>
                    <div className="space-y-2">
                        <span className="block text-sm font-medium text-gray-500">Email</span>
                        <p className="text-lg text-gray-800 break-all">{user.email}</p>
                    </div>
                </Row>
            </Card>

            {/* ---------- Modal de edição ---------- */}
            <EditProfileModal
                isOpen={open}
                onClose={handleClose}
                title="Atualizar perfil"
            >
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

                    <div className="flex justify-center gap-4 pt-4">
                        <CancelButton
                            type="button"
                            onClick={handleClose}
                            icon={<XMarkIcon className="h-5 w-5" />}
                        >
                            Cancelar
                        </CancelButton>
                        <PrimaryButton
                            type="submit"
                            isLoading={isSubmitting}
                            loadingText="Salvando..."
                            icon={<CheckIcon className="h-5 w-5" />}
                        >
                            Salvar
                        </PrimaryButton>
                    </div>
                </form>
            </EditProfileModal>
        </div>
    );
}
