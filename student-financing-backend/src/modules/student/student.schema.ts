import { z } from 'zod';

export const createStudentSchema = z.object({
    nome: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres'),
    sobrenome: z.string().min(2, 'Sobrenome deve ter no mínimo 2 caracteres'),
    email: z.string().email('Email inválido'),
    senha: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres')
});

export const updateStudentSchema = z.object({
    nome: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres').optional(),
    sobrenome: z.string().min(2, 'Sobrenome deve ter no mínimo 2 caracteres').optional(),
    email: z.string().email('Email inválido').optional(),
    senha: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres').optional()
}).strict();

export const loginSchema = z.object({
    email: z.string().email('Email inválido'),
    senha: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres')
});

export const studentSchema = {
    create: createStudentSchema,
    update: updateStudentSchema,
    login: loginSchema
};

export type CreateStudentInput = z.infer<typeof createStudentSchema>;
export type UpdateStudentInput = z.infer<typeof updateStudentSchema>;
export type LoginInput = z.infer<typeof loginSchema>; 