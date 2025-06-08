import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { Student } from '../modules/student/student.model';
import { Simulation } from '../modules/simulation/simulation.model';

const sequelizeOptions: SequelizeOptions = {
    dialect: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'postgres',
    database: process.env.DB_NAME || 'student_financing',
    models: [Student, Simulation],
    logging: false
};

const sequelize = new Sequelize(sequelizeOptions);

// Initialize database connection
export const initializeDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Database connection established successfully.');

        await sequelize.sync();
        console.log('✅ Database synchronized successfully.');
    } catch (error) {
        console.error('❌ Unable to connect to the database:', error);
        throw error;
    }
};

export default sequelize; 