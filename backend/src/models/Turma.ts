import { Aluno } from './Aluno';

export interface Turma {
  id: string;
  data: Date;
  horario: string;
  alunos: Aluno[];
  maxAlunos: number;
  createdAt: Date;
  updatedAt: Date;
} 