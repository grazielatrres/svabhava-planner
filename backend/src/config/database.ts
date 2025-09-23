import { DataSource } from 'typeorm';
import { Aluno } from '../models/Aluno';
import { Turma } from '../models/Turma';
import { Presenca } from '../models/Presenca';
import { Pagamento } from '../models/Pagamento';
import 'reflect-metadata';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'root', 
    database: process.env.DB_NAME || 'svabhava',
    synchronize: false, 
    
    logging: true,
    connectTimeout: 60000,
    acquireTimeout: 60000,
    entities: [Aluno, Turma, Presenca, Pagamento],
    subscribers: [],
    migrations: [],
}); 