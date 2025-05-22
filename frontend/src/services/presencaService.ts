import axios from 'axios';
import { API_URL } from '../config';

export interface Presenca {
  id?: string;
  alunoId?: string;
  turmaId?: string;
  data: string;
  presente: boolean;
  observacao?: string;
  aluno?: { id: string; nome: string; email: string };
  turma?: { id: string; nome: string };
}

export const presencaService = {
  getAllPresencas: async () => {
    const response = await axios.get(`${API_URL}/presencas`);
    return response.data;
  },

  getPresencaById: async (id: string) => {
    const response = await axios.get(`${API_URL}/presencas/${id}`);
    return response.data;
  },

  createPresenca: async (presenca: Omit<Presenca, 'id'>) => {
    const response = await axios.post(
      `${API_URL}/turmas/${presenca.turmaId}/alunos/${presenca.alunoId}/presenca`,
      { presente: presenca.presente }
    );
    return response.data;
  },

  updatePresenca: async (id: string, presenca: Partial<Presenca>) => {
    const response = await axios.put(`${API_URL}/presencas/${id}`, presenca);
    return response.data;
  },

  deletePresenca: async (id: string) => {
    const response = await axios.delete(`${API_URL}/presencas/${id}`);
    return response.data;
  },

  getPresencasByTurma: async (turmaId: string) => {
    const response = await axios.get(`${API_URL}/turmas/${turmaId}/presencas`);
    return response.data;
  },

  getPresencasByAluno: async (alunoId: string) => {
    const response = await axios.get(`${API_URL}/alunos/${alunoId}/presencas`);
    return response.data;
  }
}; 