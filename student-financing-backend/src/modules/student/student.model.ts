import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import { Simulation } from "../simulation/simulation.model";

@Table({
    tableName: "students",
    timestamps: true
})
export class Student extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    nome!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    sobrenome!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true
    })
    email!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    senha!: string;

    @HasMany(() => Simulation)
    simulations!: Simulation[];
} 