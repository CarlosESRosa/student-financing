import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Student } from "../student/student.model";

@Table({
    tableName: "simulations",
    timestamps: true
})
export class Simulation extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id!: number;

    @ForeignKey(() => Student)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    id_estudante!: number;

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false
    })
    valor_total!: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    quantidade_parcelas!: number;

    @Column({
        type: DataType.DECIMAL(5, 2),
        allowNull: false
    })
    juros_ao_mes!: number;

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false
    })
    valor_parcela_mensal!: number;

    @BelongsTo(() => Student)
    student!: Student;
} 