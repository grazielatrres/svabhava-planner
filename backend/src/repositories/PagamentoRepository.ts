import { Pagamento } from '../models/Pagamento';
import { Aluno } from '../models/Aluno';
import { AlunoRepository } from './AlunoRepository';

// In-memory storage for pagamentos
const pagamentos: Pagamento[] = [];

export class PagamentoRepository {
  static async findAll(): Promise<Pagamento[]> {
    return pagamentos;
  }

  static async findById(id: string): Promise<Pagamento | undefined> {
    return pagamentos.find(pagamento => pagamento.id === id);
  }

  static async findByAluno(alunoId: string): Promise<Pagamento[]> {
    return pagamentos.filter(pagamento => pagamento.aluno.id === alunoId);
  }

  static async findByStatus(status: Pagamento['status']): Promise<Pagamento[]> {
    return pagamentos.filter(pagamento => pagamento.status === status);
  }

  static async create(pagamentoData: Omit<Pagamento, 'id' | 'createdAt' | 'updatedAt'>): Promise<Pagamento> {
    const newPagamento: Pagamento = {
      id: Math.random().toString(36).substr(2, 9),
      ...pagamentoData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    pagamentos.push(newPagamento);
    return newPagamento;
  }

  static async update(id: string, pagamentoData: Partial<Pagamento>): Promise<Pagamento | undefined> {
    const index = pagamentos.findIndex(pagamento => pagamento.id === id);
    if (index === -1) return undefined;

    pagamentos[index] = {
      ...pagamentos[index],
      ...pagamentoData,
      updatedAt: new Date()
    };

    return pagamentos[index];
  }

  static async delete(id: string): Promise<boolean> {
    const index = pagamentos.findIndex(pagamento => pagamento.id === id);
    if (index === -1) return false;

    pagamentos.splice(index, 1);
    return true;
  }

  static async registrarPagamento(alunoId: string, valor: number, observacao?: string): Promise<Pagamento> {
    const aluno = await AlunoRepository.findById(alunoId);
    if (!aluno) throw new Error('Aluno não encontrado');

    return this.create({
      aluno,
      valor,
      data: new Date(),
      status: 'pago',
      observacao
    });
  }

  static async registrarPagamentoPendente(alunoId: string, valor: number, observacao?: string): Promise<Pagamento> {
    const aluno = await AlunoRepository.findById(alunoId);
    if (!aluno) throw new Error('Aluno não encontrado');

    return this.create({
      aluno,
      valor,
      data: new Date(),
      status: 'pendente',
      observacao
    });
  }
} 