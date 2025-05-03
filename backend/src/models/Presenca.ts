import { Aluno } from './Aluno';
import { Turma } from './Turma';

export interface Presenca {
  id: string;
  aluno: Aluno;
  turma: Turma;
  presente: boolean;
  data: Date;
  createdAt: Date;
  updatedAt: Date;
} 