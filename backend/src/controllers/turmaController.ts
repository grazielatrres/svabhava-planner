import { Request, Response } from 'express';
import { TurmaRepository } from '../repositories/TurmaRepository';
import { Turma } from '../models/Turma';

export class TurmaController {
  static async getAllTurmas(req: Request, res: Response) {
    try {
      const turmas = await TurmaRepository.findAll();
      res.json(turmas);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getTurmaById(req: Request, res: Response) {
    try {
      const turma = await TurmaRepository.findById(req.params.id);
      if (!turma) {
        return res.status(404).json({ error: 'Turma not found' });
      }
      res.json(turma);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async createTurma(req: Request, res: Response) {
    try {
      const { nome, horario, professor, observacao, data_aula } = req.body;
      if (!nome || !horario || !professor || !data_aula) {
        return res.status(400).json({ error: 'Nome, horário, professor e data da aula são obrigatórios' });
      }

      const turmaData: Omit<Turma, 'id' | 'createdAt' | 'updatedAt' | 'alunos' | 'presencas'> = {
        nome,
        horario,
        professor,
        observacao,
        data_aula: new Date(data_aula)
      };

      const turma = await TurmaRepository.create(turmaData);
      res.status(201).json(turma);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async updateTurma(req: Request, res: Response) {
    try {
      const { nome, horario, professor, observacao, data_aula } = req.body;
      const turma = await TurmaRepository.update(req.params.id, {
        nome,
        horario,
        professor,
        observacao,
        data_aula: data_aula ? new Date(data_aula) : undefined
      });

      if (!turma) {
        return res.status(404).json({ error: 'Turma not found' });
      }

      res.json(turma);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async deleteTurma(req: Request, res: Response) {
    try {
      const success = await TurmaRepository.delete(req.params.id);
      if (!success) {
        return res.status(404).json({ error: 'Turma not found' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async addAluno(req: Request, res: Response) {
    try {
      const { turmaId, alunoId } = req.params;
      const turma = await TurmaRepository.addAluno(turmaId, alunoId);

      if (!turma) {
        return res.status(404).json({ error: 'Turma ou aluno não encontrado' });
      }

      res.json(turma);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async removeAluno(req: Request, res: Response) {
    try {
      const { turmaId, alunoId } = req.params;
      const turma = await TurmaRepository.removeAluno(turmaId, alunoId);

      if (!turma) {
        return res.status(404).json({ error: 'Turma ou aluno não encontrado' });
      }

      res.json(turma);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

        
