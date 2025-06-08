import { Router } from 'express';
import sequelize from '../config/database';

const router = Router();

/**
 * GET /health
 *   → 200 OK  se app e banco no ar
 */
router.get('/', async (_req, res) => {
    try {
        await sequelize.authenticate();
        const [rows] = await sequelize.query('SELECT NOW()');
        const timestamp = (rows as any)[0].now;

        res.json({
            status: 'ok',
            database: { connected: true, timestamp },
        });
    } catch (err: any) {
        console.error('Health check failed:', err);
        res.status(500).json({
            status: 'error',
            database: { connected: false, error: err.message },
        });
    }
});

export default router;
