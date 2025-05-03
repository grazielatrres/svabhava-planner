import api from './api';

export interface Aluno {
  id?: number;
  nome: string;
  email: string;
  telefone: string;
  dataNascimento: string;
  endereco: string;
  turmaId?: number;
}

export const alunoService = {
  async getAllAlunos() {
    const response = await api.get('/alunos');
    return response.data;
  },

  async getAlunoById(id: number) {
    const response = await api.get(`/alunos/${id}`);
    return response.data;
  },

  async createAluno(aluno: Omit<Aluno, 'id'>) {
    const response = await api.post('/alunos', aluno);
    return response.data;
  },

  async updateAluno(id: number, aluno: Partial<Aluno>) {
    const response = await api.put(`/alunos/${id}`, aluno);
    return response.data;
  },

  async deleteAluno(id: number) {
    const response = await api.delete(`/alunos/${id}`);
    return response.data;
  }
}; 