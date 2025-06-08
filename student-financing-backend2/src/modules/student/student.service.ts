import bcrypt from 'bcrypt';
import { Op } from 'sequelize';
import { Student } from './student.model';
import { CreateStudentInput, UpdateStudentInput } from './student.schema';
import { IStudentResponse, ILoginResponse } from './types';
import { generateToken } from '../../core/utils/jwt';
import { AppError } from '../../core/middlewares/error.middleware';

/** Remove o campo `senha` antes de expor dados do aluno */
const mapToResponse = (student: Student): IStudentResponse => {
    const { senha, ...rest } = student.toJSON();
    return rest as unknown as IStudentResponse;
};

/** Geração de hash usando bcrypt (10 salt rounds) */
const hashPassword = (password: string): Promise<string> => bcrypt.hash(password, 10);

/** Garante unicidade de e-mail na tabela `students` */
const validateEmailUniqueness = async (email: string, excludeId?: number): Promise<void> => {
    const where = excludeId
        ? { email, id: { [Op.ne]: excludeId } }
        : { email };

    const existing = await Student.findOne({ where });
    if (existing) throw new AppError(400, 'Email já registrado');
};

export const createStudent = async (data: CreateStudentInput): Promise<ILoginResponse> => {
    await validateEmailUniqueness(data.email);

    const hashed = await hashPassword(data.senha);

    const student = await Student.create({ ...data, senha: hashed });

    const token = generateToken({ id: student.id, email: student.email });

    return { student: mapToResponse(student), token };
};

export const loginStudentService = async (email: string, senha: string): Promise<ILoginResponse> => {
    const student = await Student.findOne({ where: { email } });
    if (!student) throw new AppError(401, 'Credenciais inválidas');

    const valid = await bcrypt.compare(senha, student.senha);
    if (!valid) throw new AppError(401, 'Credenciais inválidas');

    const token = generateToken({ id: student.id, email: student.email });

    return { student: mapToResponse(student), token };
};

export const getStudentById = async (id: number): Promise<IStudentResponse> => {
    const student = await Student.findByPk(id);
    if (!student) throw new AppError(404, 'Estudante não encontrado');

    return mapToResponse(student);
};

export const updateStudent = async (id: number, data: UpdateStudentInput): Promise<IStudentResponse> => {
    const student = await Student.findByPk(id);
    if (!student) throw new AppError(404, 'Estudante não encontrado');

    if (!Object.keys(data).length) {
        throw new AppError(400, 'Nenhum campo válido para atualização');
    }

    if (data.email) await validateEmailUniqueness(data.email, id);
    if (data.senha) data.senha = await hashPassword(data.senha);

    await student.update(data);
    return mapToResponse(student);
};