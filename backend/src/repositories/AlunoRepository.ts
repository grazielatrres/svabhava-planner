import { Aluno } from '../models/Aluno';

// In-memory storage for alunos
const alunos: Aluno[] = [];

export class AlunoRepository {
  static async findAll(): Promise<Aluno[]> {
    return alunos;
  }

  static async findById(id: string): Promise<Aluno | undefined> {
    return alunos.find(aluno => aluno.id === id);
  }

  static async create(alunoData: Omit<Aluno, 'id' | 'createdAt' | 'updatedAt'>): Promise<Aluno> {
    const newAluno: Aluno = {
      id: Math.random().toString(36).substr(2, 9),
      ...alunoData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    alunos.push(newAluno);
    return newAluno;
  }

  static async update(id: string, alunoData: Partial<Aluno>): Promise<Aluno | undefined> {
    const index = alunos.findIndex(aluno => aluno.id === id);
    if (index === -1) return undefined;

    alunos[index] = {
      ...alunos[index],
      ...alunoData,
      updatedAt: new Date()
    };

    return alunos[index];
  }

  static async delete(id: string): Promise<boolean> {
    const index = alunos.findIndex(aluno => aluno.id === id);
    if (index === -1) return false;

    alunos.splice(index, 1);
    return true;
  }
} 