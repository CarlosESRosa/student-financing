import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { initializeDatabase } from './config/database';
import { errorHandler } from './core/middlewares/error.middleware';
import apiRouter from './routes/index';
import healthRouter from './routes/health.route';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());


app.use('/api', apiRouter);
app.use('/health', healthRouter);

app.use(errorHandler);

(async () => {
    try {
        await initializeDatabase();
        app.listen(PORT, () =>
            console.log(`🚀  Server running at http://localhost:${PORT}`),
        );
    } catch (err) {
        console.error('❌  Server startup error:', err);
        process.exit(1);
    }
})();
