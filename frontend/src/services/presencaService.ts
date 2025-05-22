import axios from 'axios';
import { API_URL } from '../config';

export interface Presenca {
  id?: number;
  alunoId: number;
  turmaId: number;
  data: string;
  presente: boolean;
  observacao?: string;
}

export const presencaService = {
  getAllPresencas: async () => {
    const response = await axios.get(`${API_URL}/presencas`);
    return response.data;
  },

  getPresencaById: async (id: number) => {
    const response = await axios.get(`${API_URL}/presencas/${id}`);
    return response.data;
  },

  createPresenca: async (presenca: Omit<Presenca, 'id'>) => {
    const response = await axios.post(`${API_URL}/presencas`, presenca);
    return response.data;
  },

  updatePresenca: async (id: number, presenca: Partial<Presenca>) => {
    const response = await axios.put(`${API_URL}/presencas/${id}`, presenca);
    return response.data;
  },

  deletePresenca: async (id: number) => {
    const response = await axios.delete(`${API_URL}/presencas/${id}`);
    return response.data;
  },

  getPresencasByTurma: async (turmaId: number) => {
    const response = await axios.get(`${API_URL}/presencas/turma/${turmaId}`);
    return response.data;
  },

  getPresencasByAluno: async (alunoId: number) => {
    const response = await axios.get(`${API_URL}/presencas/aluno/${alunoId}`);
    return response.data;
  }
}; 