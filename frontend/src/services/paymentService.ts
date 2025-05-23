import axios from 'axios';
import { API_URL } from '../config';

export interface Payment {
  id: string;
  aluno: {
    id: string;
    nome: string;
  };
  valor: number;
  data: Date;
  status: 'pendente' | 'pago' | 'atrasado';
  observacao?: string;
  createdAt: Date;
  updatedAt: Date;
}

export const paymentService = {
  async getAll(): Promise<Payment[]> {
    const response = await axios.get(`${API_URL}/pagamentos`);
    return response.data;
  },

  async getById(id: string): Promise<Payment> {
    const response = await axios.get(`${API_URL}/pagamentos/${id}`);
    return response.data;
  },

  async getByAluno(alunoId: string): Promise<Payment[]> {
    const response = await axios.get(`${API_URL}/alunos/${alunoId}/pagamentos`);
    return response.data;
  },

  async getByStatus(status: 'pendente' | 'pago' | 'atrasado'): Promise<Payment[]> {
    const response = await axios.get(`${API_URL}/pagamentos/status/${status}`);
    return response.data;
  },

  async create(alunoId: string, valor: number, data: Date, observacao?: string): Promise<Payment> {
    const response = await axios.post(`${API_URL}/alunos/${alunoId}/pagamentos`, {
      valor,
      data,
      observacao
    });
    return response.data;
  },

  async createPending(alunoId: string, valor: number, data: Date, observacao?: string): Promise<Payment> {
    const response = await axios.post(`${API_URL}/alunos/${alunoId}/pagamentos/pendente`, {
      valor,
      data,
      observacao
    });
    return response.data;
  },

  async update(id: string, data: Partial<Payment>): Promise<Payment> {
    const response = await axios.put(`${API_URL}/pagamentos/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await axios.delete(`${API_URL}/pagamentos/${id}`);
  }
}; 