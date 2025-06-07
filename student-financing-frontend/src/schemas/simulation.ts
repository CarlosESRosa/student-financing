import { z } from 'zod';

export const simulationSchema = z.object({
    valor_total: z
        .number({ invalid_type_error: 'Informe um valor' })
        .positive('Deve ser maior que zero'),
    quantidade_parcelas: z
        .number({ invalid_type_error: 'Informe as parcelas' })
        .int('Número inteiro')
        .min(1, 'Mínimo 1'),
    juros_ao_mes: z
        .number({ invalid_type_error: 'Informe a taxa' })
        .min(0, 'Não pode ser negativo'),
});

export type SimulationFormData = z.infer<typeof simulationSchema>;
