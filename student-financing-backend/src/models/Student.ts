import {
    Table, Column, Model, PrimaryKey, AutoIncrement, AllowNull,
    Unique, HasMany, BeforeCreate, DataType
} from "sequelize-typescript";
import bcrypt from "bcrypt";
import { Simulation } from "./Simulation";

@Table({
    tableName: 'students',
    timestamps: true
})
export class Student extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;

    @AllowNull(false)
    @Column
    nome!: string;

    @AllowNull(false)
    @Column
    sobrenome!: string;

    @Unique
    @AllowNull(false)
    @Column
    email!: string;

    @AllowNull(false)
    @Column
    senha!: string;

    @HasMany(() => Simulation)
    simulations?: Simulation[];

    @BeforeCreate
    static async hashPassword(instance: Student) {
        instance.senha = await bcrypt.hash(instance.senha, 10);
    }
}
