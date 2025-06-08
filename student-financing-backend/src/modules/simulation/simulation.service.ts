import { Simulation } from './simulation.model';
import { CreateSimulationInput } from './simulation.schema';
import { SimulationResponse } from './types';
import { calculateMonthlyInstallment } from '../../core/utils/finance';
import { AppError } from '../../core/middlewares/error.middleware';


const mapToResponse = (sim: Simulation): SimulationResponse => {
    const {
        id_estudante,
        studentId,
        updatedAt,
        ...safe
    } = sim.toJSON() as any;
    return safe;
};

export const createSimulationService = async (studentId: number, data: CreateSimulationInput): Promise<SimulationResponse> => {
    const valor_parcela_mensal = calculateMonthlyInstallment(
        data.valor_total,
        data.quantidade_parcelas,
        data.juros_ao_mes,
    );

    const sim = await Simulation.create({
        id_estudante: studentId,
        valor_total: data.valor_total,
        quantidade_parcelas: data.quantidade_parcelas,
        juros_ao_mes: data.juros_ao_mes,
        valor_parcela_mensal,
    });

    return mapToResponse(sim);
};

export const listSimulationsByStudent = async (studentId: number): Promise<SimulationResponse[]> => {
    const sims = await Simulation.findAll({
        where: { id_estudante: studentId },
        order: [['createdAt', 'DESC']],
    });

    if (!sims.length) {
        throw new AppError(404, 'Nenhuma simulação encontrada para este estudante');
    }

    return sims.map(mapToResponse);
};
