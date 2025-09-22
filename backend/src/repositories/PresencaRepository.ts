import { AppDataSource } from '../config/database';
import { Presenca } from '../models/Presenca';
import { Aluno } from '../models/aluno';
import { Turma } from '../models/Turma';

export class PresencaRepository {
    private static repository = AppDataSource.getRepository(Presenca);

    static async findAll(): Promise<Presenca[]> {
        return this.repository.find({ relations: ['aluno', 'turma'] });
    }

    static async findById(id: string): Promise<Presenca | null> {
        return this.repository.findOne({
            where: { id },
            relations: ['aluno', 'turma']
        });
    }

    static async findByAluno(alunoId: string): Promise<Presenca[]> {
        return this.repository.find({
            where: { aluno: { id: alunoId } },
            relations: ['aluno', 'turma']
        });
    }

    static async findByTurma(turmaId: string): Promise<Presenca[]> {
        return this.repository.find({
            where: { turma: { id: turmaId } },
            relations: ['aluno', 'turma']
        });
    }

    static async create(presencaData: Omit<Presenca, 'id' | 'createdAt' | 'updatedAt'>): Promise<Presenca> {
        const presenca = this.repository.create(presencaData);
        return this.repository.save(presenca);
    }

    static async update(id: string, presencaData: Partial<Presenca>): Promise<Presenca | null> {
        const presenca = await this.findById(id);
        if (!presenca) return null;

        Object.assign(presenca, presencaData);
        return this.repository.save(presenca);
    }

    static async delete(id: string): Promise<boolean> {
        const result = await this.repository.delete(id);
        return result.affected !== 0;
    }

    static async registrarPresenca(alunoId: string, turmaId: string, presente: boolean): Promise<Presenca> {
        const alunoRepository = AppDataSource.getRepository(Aluno);
        const turmaRepository = AppDataSource.getRepository(Turma);

        const aluno = await alunoRepository.findOneBy({ id: alunoId });
        if (!aluno) throw new Error('Aluno não encontrado');

        const turma = await turmaRepository.findOne({
            where: { id: turmaId },
            relations: ['alunos']
        });
        if (!turma) throw new Error('Turma não encontrada');

        // Verifica se o aluno está matriculado na turma
        if (!turma.alunos.some(a => a.id === alunoId)) {
            throw new Error('Aluno não está matriculado nesta turma');
        }

        // Verifica se já existe registro de presença para esta turma e aluno
        const presencaExistente = await this.repository.findOne({
            where: {
                aluno: { id: alunoId },
                turma: { id: turmaId }
            }
        });

        if (presencaExistente) {
            return this.update(presencaExistente.id, { presente }) as Promise<Presenca>;
        }

        return this.create({
            aluno,
            turma,
            presente,
            data: new Date()
        });
    }
} 