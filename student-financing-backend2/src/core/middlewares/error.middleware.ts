import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
export class AppError extends Error {
    constructor(
        public statusCode: number,
        public message: string,
        public errors?: any[]
    ) {
        super(message);
        this.name = "AppError";
    }
}

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            status: 'error',
            message: error.message,
            errors: error.errors
        });
    }

    if (error instanceof TokenExpiredError) {
        return res.status(401).json({
            status: 'error',
            message: 'Token expirado',
        });
    }

    if (error instanceof JsonWebTokenError) {
        return res.status(401).json({
            status: 'error',
            message: 'Token inválido',
        });
    }

    if (error instanceof ZodError) {
        return res.status(400).json({
            status: 'error',
            message: 'Erro de validação',
            errors: error.errors,
        });
    }

    console.error('Unhandled Error:', error);

    return res.status(500).json({
        status: 'error',
        message: "Erro interno do servidor"
    });
}; 