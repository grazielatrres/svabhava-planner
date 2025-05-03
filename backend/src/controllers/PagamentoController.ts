import { Request, Response } from 'express';
import { PagamentoRepository } from '../repositories/PagamentoRepository';

export class PagamentoController {
  static async getAllPagamentos(req: Request, res: Response) {
    try {
      const pagamentos = await PagamentoRepository.findAll();
      res.json(pagamentos);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getPagamentoById(req: Request, res: Response) {
    try {
      const pagamento = await PagamentoRepository.findById(req.params.id);
      if (!pagamento) {
        return res.status(404).json({ error: 'Pagamento not found' });
      }
      res.json(pagamento);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getPagamentosByAluno(req: Request, res: Response) {
    try {
      const pagamentos = await PagamentoRepository.findByAluno(req.params.alunoId);
      res.json(pagamentos);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getPagamentosByStatus(req: Request, res: Response) {
    try {
      const { status } = req.params;
      const pagamentos = await PagamentoRepository.findByStatus(status as 'pendente' | 'pago' | 'atrasado');
      res.json(pagamentos);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async registrarPagamento(req: Request, res: Response) {
    try {
      const { alunoId } = req.params;
      const { valor, observacao } = req.body;

      if (!valor) {
        return res.status(400).json({ error: 'Valor é obrigatório' });
      }

      const pagamento = await PagamentoRepository.registrarPagamento(alunoId, valor, observacao);
      res.status(201).json(pagamento);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Aluno não encontrado') {
          return res.status(404).json({ error: error.message });
        }
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async registrarPagamentoPendente(req: Request, res: Response) {
    try {
      const { alunoId } = req.params;
      const { valor, observacao } = req.body;

      if (!valor) {
        return res.status(400).json({ error: 'Valor é obrigatório' });
      }

      const pagamento = await PagamentoRepository.registrarPagamentoPendente(alunoId, valor, observacao);
      res.status(201).json(pagamento);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Aluno não encontrado') {
          return res.status(404).json({ error: error.message });
        }
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async updatePagamento(req: Request, res: Response) {
    try {
      const { status, valor, observacao } = req.body;
      const pagamento = await PagamentoRepository.update(req.params.id, {
        status,
        valor,
        observacao
      });

      if (!pagamento) {
        return res.status(404).json({ error: 'Pagamento not found' });
      }

      res.json(pagamento);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async deletePagamento(req: Request, res: Response) {
    try {
      const success = await PagamentoRepository.delete(req.params.id);
      if (!success) {
        return res.status(404).json({ error: 'Pagamento not found' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
} 