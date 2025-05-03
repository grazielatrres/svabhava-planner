import { Turma } from '../models/Turma';
import { Aluno } from '../models/Aluno';
import { AlunoRepository } from './AlunoRepository';

// In-memory storage for turmas
const turmas: Turma[] = [];

export class TurmaRepository {
  static async findAll(): Promise<Turma[]> {
    return turmas;
  }

  static async findById(id: string): Promise<Turma | undefined> {
    return turmas.find(turma => turma.id === id);
  }

  static async create(turmaData: Omit<Turma, 'id' | 'alunos' | 'createdAt' | 'updatedAt'>): Promise<Turma> {
    const newTurma: Turma = {
      id: Math.random().toString(36).substr(2, 9),
      ...turmaData,
      alunos: [],
      maxAlunos: 20, // Limite máximo de alunos por turma
      createdAt: new Date(),
      updatedAt: new Date()
    };
    turmas.push(newTurma);
    return newTurma;
  }

  static async update(id: string, turmaData: Partial<Turma>): Promise<Turma | undefined> {
    const index = turmas.findIndex(turma => turma.id === id);
    if (index === -1) return undefined;

    turmas[index] = {
      ...turmas[index],
      ...turmaData,
      updatedAt: new Date()
    };

    return turmas[index];
  }

  static async delete(id: string): Promise<boolean> {
    const index = turmas.findIndex(turma => turma.id === id);
    if (index === -1) return false;

    turmas.splice(index, 1);
    return true;
  }

  static async matricularAluno(turmaId: string, alunoId: string): Promise<Turma | undefined> {
    const turma = await this.findById(turmaId);
    if (!turma) return undefined;

    const aluno = await AlunoRepository.findById(alunoId);
    if (!aluno) return undefined;

    // Verifica se a turma já está cheia
    if (turma.alunos.length >= turma.maxAlunos) {
      throw new Error('Turma já está cheia');
    }

    // Verifica se o aluno já está matriculado
    if (turma.alunos.some(a => a.id === alunoId)) {
      throw new Error('Aluno já está matriculado nesta turma');
    }

    turma.alunos.push(aluno);
    turma.updatedAt = new Date();

    return turma;
  }

  static async cancelarMatricula(turmaId: string, alunoId: string): Promise<Turma | undefined> {
    const turma = await this.findById(turmaId);
    if (!turma) return undefined;

    const alunoIndex = turma.alunos.findIndex(a => a.id === alunoId);
    if (alunoIndex === -1) return undefined;

    turma.alunos.splice(alunoIndex, 1);
    turma.updatedAt = new Date();

    return turma;
  }
} 