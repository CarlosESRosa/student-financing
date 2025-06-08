import { Router } from 'express';
import { createSimulation, listSimulations } from './simulation.controller';
import { authMiddleware } from '../../core/middlewares/auth.middleware';
import { validate } from '../../core/middlewares/validate.middleware';
import { simulationSchema } from './simulation.schema';

const router = Router();

/** POST /simulations – cria nova simulação para o aluno logado */
router.post('/simulations', authMiddleware, validate(simulationSchema.create), createSimulation);

/** GET /simulations – lista simulações do aluno logado */
router.get('/simulations', authMiddleware, listSimulations);

export default router;
