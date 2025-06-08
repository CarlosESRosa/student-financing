import { z } from 'zod';

export const createSimulationSchema = z.object({
    valor_total: z.number().positive("Valor total deve ser positivo"),
    quantidade_parcelas: z.number().int().min(1, "Quantidade de parcelas deve ser maior que 0"),
    juros_ao_mes: z.number().min(0).max(100, "Juros deve estar entre 0 e 100")
});

export const updateSimulationSchema = createSimulationSchema.partial();

export const simulationSchema = {
    create: createSimulationSchema,
    update: updateSimulationSchema
};

export type CreateSimulationInput = z.infer<typeof createSimulationSchema>;
export type UpdateSimulationInput = z.infer<typeof updateSimulationSchema>; 