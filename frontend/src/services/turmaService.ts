import api from './api';

export interface Turma {
  id?: number;
  nome: string;
  descricao: string;
  dataInicio: string;
  dataFim: string;
  professorId: number;
  capacidade: number;
}

export const turmaService = {
  async getAllTurmas() {
    const response = await api.get('/turmas');
    return response.data;
  },

  async getTurmaById(id: number) {
    const response = await api.get(`/turmas/${id}`);
    return response.data;
  },

  async createTurma(turma: Omit<Turma, 'id'>) {
    const response = await api.post('/turmas', turma);
    return response.data;
  },

  async updateTurma(id: number, turma: Partial<Turma>) {
    const response = await api.put(`/turmas/${id}`, turma);
    return response.data;
  },

  async deleteTurma(id: number) {
    const response = await api.delete(`/turmas/${id}`);
    return response.data;
  },

  async getAlunosByTurma(turmaId: number) {
    const response = await api.get(`/turmas/${turmaId}/alunos`);
    return response.data;
  }
}; 