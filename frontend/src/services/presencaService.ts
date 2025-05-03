import api from './api';

export interface Presenca {
  id?: number;
  alunoId: number;
  turmaId: number;
  data: string;
  presente: boolean;
  observacao?: string;
}

export const presencaService = {
  async getAllPresencas() {
    const response = await api.get('/presencas');
    return response.data;
  },

  async getPresencaById(id: number) {
    const response = await api.get(`/presencas/${id}`);
    return response.data;
  },

  async createPresenca(presenca: Omit<Presenca, 'id'>) {
    const response = await api.post('/presencas', presenca);
    return response.data;
  },

  async updatePresenca(id: number, presenca: Partial<Presenca>) {
    const response = await api.put(`/presencas/${id}`, presenca);
    return response.data;
  },

  async deletePresenca(id: number) {
    const response = await api.delete(`/presencas/${id}`);
    return response.data;
  },

  async getPresencasByTurma(turmaId: number) {
    const response = await api.get(`/presencas/turma/${turmaId}`);
    return response.data;
  },

  async getPresencasByAluno(alunoId: number) {
    const response = await api.get(`/presencas/aluno/${alunoId}`);
    return response.data;
  }
}; 