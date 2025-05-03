import api from './api';

export interface Pagamento {
  id?: number;
  alunoId: number;
  valor: number;
  dataPagamento: string;
  metodoPagamento: string;
  status: 'pendente' | 'pago' | 'cancelado';
  observacao?: string;
}

export const pagamentoService = {
  async getAllPagamentos() {
    const response = await api.get('/pagamentos');
    return response.data;
  },

  async getPagamentoById(id: number) {
    const response = await api.get(`/pagamentos/${id}`);
    return response.data;
  },

  async createPagamento(pagamento: Omit<Pagamento, 'id'>) {
    const response = await api.post('/pagamentos', pagamento);
    return response.data;
  },

  async updatePagamento(id: number, pagamento: Partial<Pagamento>) {
    const response = await api.put(`/pagamentos/${id}`, pagamento);
    return response.data;
  },

  async deletePagamento(id: number) {
    const response = await api.delete(`/pagamentos/${id}`);
    return response.data;
  },

  async getPagamentosByAluno(alunoId: number) {
    const response = await api.get(`/pagamentos/aluno/${alunoId}`);
    return response.data;
  },

  async getPagamentosByStatus(status: Pagamento['status']) {
    const response = await api.get(`/pagamentos/status/${status}`);
    return response.data;
  }
}; 