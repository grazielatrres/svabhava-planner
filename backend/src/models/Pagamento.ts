import { Aluno } from './Aluno';

export interface Pagamento {
  id: string;
  aluno: Aluno;
  valor: number;
  data: Date;
  status: 'pendente' | 'pago' | 'atrasado';
  observacao?: string;
  createdAt: Date;
  updatedAt: Date;
} 