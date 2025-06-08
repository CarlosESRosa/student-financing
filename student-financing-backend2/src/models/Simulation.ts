import {
    Table, Column, Model, PrimaryKey, AutoIncrement, AllowNull,
    ForeignKey, BelongsTo, DataType, Default
} from "sequelize-typescript";
import { Student } from "./Student";

@Table({
    tableName: 'simulations',
    timestamps: true
})
export class Simulation extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;

    @ForeignKey(() => Student)
    @Column
    id_estudante!: number;

    @BelongsTo(() => Student)
    student?: Student;

    @AllowNull(false)
    @Column(DataType.DECIMAL(10, 2))
    valor_total!: number;

    @AllowNull(false)
    @Column
    quantidade_parcelas!: number;

    @AllowNull(false)
    @Column(DataType.DECIMAL(5, 2))
    juros_ao_mes!: number;

    @AllowNull(false)
    @Column(DataType.DECIMAL(10, 2))
    valor_parcela_mensal!: number;

    @Default(DataType.NOW)
    @Column
    data_criacao!: Date;
}
