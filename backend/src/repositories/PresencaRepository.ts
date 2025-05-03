import { Presenca } from '../models/Presenca';
import { Aluno } from '../models/Aluno';
import { Turma } from '../models/Turma';
import { AlunoRepository } from './AlunoRepository';
import { TurmaRepository } from './TurmaRepository';

// In-memory storage for presenças
const presencas: Presenca[] = [];

export class PresencaRepository {
  static async findAll(): Promise<Presenca[]> {
    return presencas;
  }

  static async findById(id: string): Promise<Presenca | undefined> {
    return presencas.find(presenca => presenca.id === id);
  }

  static async findByAluno(alunoId: string): Promise<Presenca[]> {
    return presencas.filter(presenca => presenca.aluno.id === alunoId);
  }

  static async findByTurma(turmaId: string): Promise<Presenca[]> {
    return presencas.filter(presenca => presenca.turma.id === turmaId);
  }

  static async create(presencaData: Omit<Presenca, 'id' | 'createdAt' | 'updatedAt'>): Promise<Presenca> {
    const newPresenca: Presenca = {
      id: Math.random().toString(36).substr(2, 9),
      ...presencaData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    presencas.push(newPresenca);
    return newPresenca;
  }

  static async update(id: string, presencaData: Partial<Presenca>): Promise<Presenca | undefined> {
    const index = presencas.findIndex(presenca => presenca.id === id);
    if (index === -1) return undefined;

    presencas[index] = {
      ...presencas[index],
      ...presencaData,
      updatedAt: new Date()
    };

    return presencas[index];
  }

  static async delete(id: string): Promise<boolean> {
    const index = presencas.findIndex(presenca => presenca.id === id);
    if (index === -1) return false;

    presencas.splice(index, 1);
    return true;
  }

  static async registrarPresenca(alunoId: string, turmaId: string, presente: boolean): Promise<Presenca> {
    const aluno = await AlunoRepository.findById(alunoId);
    if (!aluno) throw new Error('Aluno não encontrado');

    const turma = await TurmaRepository.findById(turmaId);
    if (!turma) throw new Error('Turma não encontrada');

    // Verifica se o aluno está matriculado na turma
    if (!turma.alunos.some(a => a.id === alunoId)) {
      throw new Error('Aluno não está matriculado nesta turma');
    }

    // Verifica se já existe registro de presença para esta turma e aluno
    const presencaExistente = presencas.find(
      p => p.aluno.id === alunoId && p.turma.id === turmaId
    );

    if (presencaExistente) {
      return this.update(presencaExistente.id, { presente, updatedAt: new Date() }) as Presenca;
    }

    return this.create({
      aluno,
      turma,
      presente,
      data: new Date()
    });
  }
} 