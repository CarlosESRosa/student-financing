import { api } from './api';

export type Simulation = {
    id: number;
    valor_total: string;
    quantidade_parcelas: number;
    juros_ao_mes: string;
    valor_parcela_mensal: string;
    createdAt: string;
};

export async function fetchSimulations() {
    const { data } = await api.get<{ data: Simulation[] }>('/simulations');
    return data.data;
}
