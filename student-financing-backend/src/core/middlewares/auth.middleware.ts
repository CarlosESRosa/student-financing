import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { AppError } from './error.middleware';
import { Student } from "../../modules/student/student.model";

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: number;
                email: string;
            };
            student?: Student;
        }
    }
}

interface AuthRequest extends Request {
    student?: Student;
}

const extractToken = (authHeader: string | undefined): string => {
    if (!authHeader) {
        throw new AppError(401, "Token não fornecido");
    }

    const [, token] = authHeader.split(" ");
    if (!token) {
        throw new AppError(401, "Token não fornecido");
    }

    return token;
};

const findStudentById = async (id: number): Promise<Student> => {
    const student = await Student.findByPk(id);
    if (!student) {
        throw new AppError(401, "Usuário não encontrado");
    }
    return student;
};

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const token = extractToken(req.headers.authorization);
        const decoded = verifyToken(token);
        const student = await findStudentById(decoded.id);

        req.student = student;
        return next();
    } catch (error) {
        return next(error);
    }
}; 