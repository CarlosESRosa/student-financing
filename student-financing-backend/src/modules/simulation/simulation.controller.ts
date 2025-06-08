import { Request, Response, NextFunction } from 'express';
import { createSimulationService, listSimulationsByStudent } from './simulation.service';
import { CreateSimulationInput } from './simulation.schema';

export const createSimulation = async (
    req: Request<{}, {}, CreateSimulationInput>,
    res: Response,
    next: NextFunction,
) => {
    try {
        const sim = await createSimulationService(req.student!.id, req.body);
        res.status(201).json({ status: 'success', data: sim });
    } catch (err) {
        next(err);
    }
};

export const listSimulations = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const list = await listSimulationsByStudent(req.student!.id);
        res.json({ status: 'success', data: list });
    } catch (err) {
        next(err);
    }
};
