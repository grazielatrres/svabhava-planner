import { Router } from 'express';
import { PagamentoController } from '../controllers/PagamentoController';

const router = Router();

// CRUD de pagamentos
router.get('/pagamentos', PagamentoController.getAllPagamentos);
router.get('/pagamentos/:id', PagamentoController.getPagamentoById);
router.put('/pagamentos/:id', PagamentoController.updatePagamento);
router.delete('/pagamentos/:id', PagamentoController.deletePagamento);

// Pagamentos por aluno
router.get('/alunos/:alunoId/pagamentos', PagamentoController.getPagamentosByAluno);

// Pagamentos por status
router.get('/pagamentos/status/:status', PagamentoController.getPagamentosByStatus);

// Registrar pagamentos
router.post('/alunos/:alunoId/pagamentos', PagamentoController.registrarPagamento);
router.post('/alunos/:alunoId/pagamentos/pendente', PagamentoController.registrarPagamentoPendente);

export default router; 