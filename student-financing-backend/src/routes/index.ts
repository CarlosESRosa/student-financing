import { Router } from 'express';
import studentRoutes from '../modules/student/student.routes';
import simulationRoutes from '../modules/simulation/simulation.routes';

const router = Router();
router.use('/', studentRoutes);
router.use('/', simulationRoutes);

export default router;
