import { DataSource } from 'typeorm';
import { Aluno } from '../models/aluno';
import { Turma } from '../models/Turma';
import { Presenca } from '../models/Presenca';
import { Pagamento } from '../models/Pagamento';
import 'reflect-metadata';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '', 
    database: 'svabhava_planner',
    synchronize: false, 
    logging: true,
    entities: [Aluno, Turma, Presenca, Pagamento],
    subscribers: [],
    migrations: [],
}); 