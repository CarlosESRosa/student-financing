// src/core/middlewares/validate.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { AppError } from './error.middleware';

type Location = 'body' | 'query' | 'params';

/**
 * validate(schema)           → valida req.body
 * validate(schema, 'query')  → valida req.query
 * validate(schema, 'params') → valida req.params
 */
export const validate =
    (schema: AnyZodObject, location: Location = 'body') =>
        (req: Request, _res: Response, next: NextFunction) => {
            try {
                schema.parse(req[location]);
                return next();
            } catch (error) {
                if (error instanceof ZodError) {
                    return next(new AppError(400, 'Erro de validação', error.errors));
                }
                return next(error);
            }
        };
