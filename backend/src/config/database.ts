import { DataSource } from 'typeorm';
import { Aluno } from '../models/Aluno';
import { Turma } from '../models/Turma';
import { Presenca } from '../models/Presenca';
import { Pagamento } from '../models/Pagamento';
import 'reflect-metadata';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '', // Coloque sua senha do MySQL aqui
    database: 'svabhava_planner',
    synchronize: true, // Cria as tabelas automaticamente (use apenas em desenvolvimento)
    logging: true,
    entities: [Aluno, Turma, Presenca, Pagamento],
    subscribers: [],
    migrations: [],
}); 