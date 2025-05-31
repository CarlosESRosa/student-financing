import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';

export const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Basic route for testing
app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Student Financing API is running' });
}); 