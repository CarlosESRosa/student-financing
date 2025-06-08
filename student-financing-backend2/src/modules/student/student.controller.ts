import { Request, Response, NextFunction } from 'express';
import { createStudent, loginStudentService, getStudentById, updateStudent } from './student.service';
import { CreateStudentInput, LoginInput, UpdateStudentInput } from './student.schema';

export const registerStudent = async (req: Request<{}, {}, CreateStudentInput>, res: Response, next: NextFunction) => {
    try {
        console.log('Register student request body:', req.body);
        const result = await createStudent(req.body);
        res.status(201).json({ status: 'success', data: result });
    } catch (err) {
        next(err);
    }
};

export const loginStudent = async (req: Request<{}, {}, LoginInput>, res: Response, next: NextFunction) => {
    try {
        console.log('Login request body:', req.body);
        const { email, senha } = req.body;
        const result = await loginStudentService(email, senha);
        res.json({ status: 'success', data: result });
    } catch (err) {
        next(err);
    }
};

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const student = await getStudentById(req.student!.id);
        res.json({ status: 'success', data: student });
    } catch (err) {
        next(err);
    }
};

export const updateProfile = async (req: Request<{}, {}, UpdateStudentInput>, res: Response, next: NextFunction) => {
    try {
        console.log('Update profile request body:', req.body);
        const student = await updateStudent(req.student!.id, req.body);
        res.json({ status: 'success', data: student });
    } catch (err) {
        next(err);
    }
};
