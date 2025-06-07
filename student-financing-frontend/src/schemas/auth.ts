import { z } from 'zod';

export const loginSchema = z.object({
    email: z
        .string()
        .min(1, 'Email é obrigatório')
        .email('Email inválido'),
    senha: z
        .string()
        .min(1, 'Senha é obrigatória')
        .min(6, 'A senha deve ter no mínimo 6 caracteres'),
});

export const registerSchema = z
    .object({
        nome: z
            .string()
            .min(1, 'Nome é obrigatório')
            .min(2, 'O nome deve ter no mínimo 2 caracteres'),
        sobrenome: z
            .string()
            .min(1, 'Sobrenome é obrigatório')
            .min(2, 'O sobrenome deve ter no mínimo 2 caracteres'),
        email: z
            .string()
            .min(1, 'Email é obrigatório')
            .email('Email inválido'),
        senha: z
            .string()
            .min(1, 'Senha é obrigatória')
            .min(6, 'A senha deve ter no mínimo 6 caracteres'),
        confirmarSenha: z
            .string()
            .min(1, 'Confirmação de senha é obrigatória'),
    })
    .refine((data) => data.senha === data.confirmarSenha, {
        message: 'As senhas não coincidem',
        path: ['confirmarSenha'],
    });

export const profileSchema = z.object({
    nome: z
        .string()
        .min(1, 'Nome é obrigatório')
        .min(2, 'O nome deve ter no mínimo 2 caracteres'),
    sobrenome: z
        .string()
        .min(1, 'Sobrenome é obrigatório')
        .min(2, 'O sobrenome deve ter no mínimo 2 caracteres'),
    email: z
        .string()
        .min(1, 'Email é obrigatório')
        .email('Email inválido'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ProfileFormData = z.infer<typeof profileSchema>; 