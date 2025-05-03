import { AppDataSource } from '../config/database';
import { Aluno } from '../models/Aluno';
import { Turma } from '../models/Turma';

export class TurmaRepository {
    private static repository = AppDataSource.getRepository(Turma);

    static async findAll(): Promise<Turma[]> {
        return this.repository.find({ relations: ['alunos'] });
    }

    static async findById(id: string): Promise<Turma | null> {
        return this.repository.findOne({
            where: { id },
            relations: ['alunos']
        });
    }

    static async create(turmaData: Omit<Turma, 'id' | 'createdAt' | 'updatedAt' | 'alunos' | 'presencas'>): Promise<Turma> {
        const turma = this.repository.create(turmaData);
        return this.repository.save(turma);
    }

    static async update(id: string, turmaData: Partial<Turma>): Promise<Turma | null> {
        const turma = await this.findById(id);
        if (!turma) return null;

        Object.assign(turma, turmaData);
        return this.repository.save(turma);
    }

    static async delete(id: string): Promise<boolean> {
        const result = await this.repository.delete(id);
        return result.affected !== 0;
    }

    static async addAluno(turmaId: string, alunoId: string): Promise<Turma | null> {
        const turma = await this.findById(turmaId);
        if (!turma) return null;

        const alunoRepository = AppDataSource.getRepository('Aluno');
        const aluno = await alunoRepository.findOneBy({ id: alunoId });
        if (!aluno) return null;

        turma.alunos = [...(turma.alunos || []), aluno as Aluno];
        return this.repository.save(turma);
    }

    static async removeAluno(turmaId: string, alunoId: string): Promise<Turma | null> {
        const turma = await this.findById(turmaId);
        if (!turma) return null;

        turma.alunos = turma.alunos.filter(aluno => aluno.id !== alunoId);
        return this.repository.save(turma);
    }
} 