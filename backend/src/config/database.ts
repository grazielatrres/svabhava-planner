import { DataSource } from 'typeorm';
import { Aluno } from '../models/aluno';
import { Turma } from '../models/Turma';
import { Presenca } from '../models/Presenca';
import { Pagamento } from '../models/Pagamento';
import 'reflect-metadata';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.MYSQL_HOST || process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.MYSQL_PORT || process.env.DB_PORT || '3306'),
    username: process.env.MYSQL_USER || process.env.DB_USERNAME || 'root',
    password: process.env.MYSQL_PASSWORD || process.env.DB_PASSWORD || 'root', 
    database: process.env.MYSQL_DATABASE || process.env.DB_NAME || 'svabhava',
    synchronize: process.env.NODE_ENV === 'development', 
    logging: process.env.NODE_ENV === 'development',
    connectTimeout: 60000,
    acquireTimeout: 60000,
    entities: [Aluno, Turma, Presenca, Pagamento],
    subscribers: [],
    migrations: [],
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
}); 