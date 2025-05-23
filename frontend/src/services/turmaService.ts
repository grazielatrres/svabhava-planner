import axios from 'axios';
import { API_URL } from '../config';

export interface Turma {
  id: string;
  nome: string;
  horario: string;
  data_aula: string;
  professor: string;
  observacao?: string;
  alunos?: any[];
  presencas?: any[];
  createdAt: Date;
  updatedAt: Date;
}

export const turmaService = {
  getAll: async (): Promise<Turma[]> => {
    const response = await axios.get(`${API_URL}/turmas`);
    return response.data;
  },

  getById: async (id: string): Promise<Turma> => {
    const response = await axios.get(`${API_URL}/turmas/${id}`);
    return response.data;
  },

  create: async (turma: Omit<Turma, 'id' | 'createdAt' | 'updatedAt' | 'alunos' | 'presencas'>): Promise<Turma> => {
    const response = await axios.post(`${API_URL}/turmas`, turma);
    return response.data;
  },

  update: async (id: string, turma: Partial<Turma>): Promise<Turma> => {
    const response = await axios.put(`${API_URL}/turmas/${id}`, turma);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/turmas/${id}`);
  },

  addAluno: async (turmaId: string, alunoId: string): Promise<Turma> => {
    const response = await axios.post(`${API_URL}/turmas/${turmaId}/alunos/${alunoId}`);
    return response.data;
  },

  removeAluno: async (turmaId: string, alunoId: string): Promise<Turma> => {
    const response = await axios.delete(`${API_URL}/turmas/${turmaId}/alunos/${alunoId}`);
    return response.data;
  }
}; 