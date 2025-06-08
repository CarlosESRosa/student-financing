/** Interface refletindo as colunas da tabela `students`*/
export interface IStudent {
    id: number;
    nome: string;
    sobrenome: string;
    email: string;
    senha: string;
    createdAt: Date;
    updatedAt: Date;
}

/** Mesmo objeto, mas sem o campo `senha` */
export interface IStudentResponse
    extends Omit<IStudent, 'senha' | 'createdAt' | 'updatedAt'> { }

/** Retorno de login/registro */
export interface ILoginResponse {
    student: IStudentResponse;
    token: string;
}
