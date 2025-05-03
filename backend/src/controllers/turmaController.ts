import { Request, Response } from 'express';
import { TurmaRepository } from '../repositories/TurmaRepository';

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
      const { data, horario } = req.body;
      if (!data || !horario) {
        return res.status(400).json({ error: 'Data e horário são obrigatórios' });
      }

      const turma = await TurmaRepository.create({
        data: new Date(data),
        horario,
        maxAlunos: 20,
      });

      res.status(201).json(turma);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async updateTurma(req: Request, res: Response) {
    try {
      const { data, horario } = req.body;
      const turma = await TurmaRepository.update(req.params.id, {
        data: data ? new Date(data) : undefined,
        horario
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

  static async matricularAluno(req: Request, res: Response) {
    try {
      const { turmaId, alunoId } = req.params;
      const turma = await TurmaRepository.matricularAluno(turmaId, alunoId);

      if (!turma) {
        return res.status(404).json({ error: 'Turma ou aluno não encontrado' });
      }

      res.json(turma);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Turma já está cheia') {
          return res.status(400).json({ error: error.message });
        }
        if (error.message === 'Aluno já está matriculado nesta turma') {
          return res.status(400).json({ error: error.message });
        }
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async cancelarMatricula(req: Request, res: Response) {
    try {
      const { turmaId, alunoId } = req.params;
      const turma = await TurmaRepository.cancelarMatricula(turmaId, alunoId);

      if (!turma) {
        return res.status(404).json({ error: 'Turma ou aluno não encontrado' });
      }

      res.json(turma);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

        
