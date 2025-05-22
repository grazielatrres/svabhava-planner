import axios from 'axios';
import { API_URL } from '../config';

export interface Student {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  presencas: any[];
  pagamentos: any[];
}

export const studentService = {
  getAll: async (): Promise<Student[]> => {
    const response = await axios.get(`${API_URL}/alunos`);
    return response.data;
  },

  getById: async (id: string): Promise<Student> => {
    const response = await axios.get(`${API_URL}/alunos/${id}`);
    return response.data;
  },

  create: async (student: Omit<Student, 'id' | 'presencas' | 'pagamentos'>): Promise<Student> => {
    const response = await axios.post(`${API_URL}/alunos`, student);
    return response.data;
  },

  update: async (id: string, student: Partial<Student>): Promise<Student> => {
    const response = await axios.put(`${API_URL}/alunos/${id}`, student);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/alunos/${id}`);
  }
}; 