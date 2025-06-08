export interface ISimulation {
    id: number;
    id_estudante: number;
    valor_total: number;
    quantidade_parcelas: number;
    juros_ao_mes: number;
    valor_parcela_mensal: number;
    createdAt: Date;
    updatedAt: Date;
}

export type SimulationResponse = Omit<
    ISimulation,
    'id_estudante' | 'updatedAt'
>;
