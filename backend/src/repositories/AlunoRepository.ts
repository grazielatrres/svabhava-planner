import { AppDataSource } from '../config/database';
import { Aluno } from '../models/Aluno';
import { Request, Response } from 'express';

export class AlunoRepository {
    private static repository = AppDataSource.getRepository(Aluno);

    static async findAll(): Promise<Aluno[]> {
        return this.repository.find();
    }

    static async findById(id: string): Promise<Aluno | null> {
        return this.repository.findOneBy({ id });
    }

    static async create(alunoData: Omit<Aluno, 'id' | 'createdAt' | 'updatedAt'>): Promise<Aluno> {
        const aluno = this.repository.create(alunoData);
        return this.repository.save(aluno);
    }

    static async update(id: string, alunoData: Partial<Aluno>): Promise<Aluno | null> {
        const aluno = await this.findById(id);
        if (!aluno) return null;

        Object.assign(aluno, alunoData);
        return this.repository.save(aluno);
    }

    static async delete(id: string): Promise<boolean> {
        const result = await this.repository.delete(id);
        return result.affected !== 0;
    }

    static async getAllAlunos(req: Request, res: Response) {
        try {
            const alunos = await AlunoRepository.findAll();
            res.json(alunos);
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    }
} 