import { Request, Response } from 'express';
import { PresencaRepository } from '../repositories/PresencaRepository';

export class PresencaController {
  static async getAllPresencas(req: Request, res: Response) {
    try {
      const presencas = await PresencaRepository.findAll();
      res.json(presencas);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getPresencaById(req: Request, res: Response) {
    try {
      const presenca = await PresencaRepository.findById(parseInt(req.params.id));
      if (!presenca) {
        return res.status(404).json({ error: 'Presença not found' });
      }
      res.json(presenca);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getPresencasByAluno(req: Request, res: Response) {
    try {
      const presencas = await PresencaRepository.findByAluno(parseInt(req.params.alunoId));
      res.json(presencas);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getPresencasByTurma(req: Request, res: Response) {
    try {
      const presencas = await PresencaRepository.findByTurma(parseInt(req.params.turmaId));
      res.json(presencas);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async registrarPresenca(req: Request, res: Response) {
    try {
      const { alunoId, turmaId } = req.params;
      const { presente } = req.body;

      const presenca = await PresencaRepository.registrarPresenca(parseInt(alunoId), parseInt(turmaId), presente);
      res.status(201).json(presenca);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Aluno não encontrado' || error.message === 'Turma não encontrada') {
          return res.status(404).json({ error: error.message });
        }
        if (error.message === 'Aluno não está matriculado nesta turma') {
          return res.status(400).json({ error: error.message });
        }
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async updatePresenca(req: Request, res: Response) {
    try {
      const { presente } = req.body;
      const presenca = await PresencaRepository.update(parseInt(req.params.id), { presente });

      if (!presenca) {
        return res.status(404).json({ error: 'Presença not found' });
      }

      res.json(presenca);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async deletePresenca(req: Request, res: Response) {
    try {
      const success = await PresencaRepository.delete(parseInt(req.params.id));
      if (!success) {
        return res.status(404).json({ error: 'Presença not found' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
} 