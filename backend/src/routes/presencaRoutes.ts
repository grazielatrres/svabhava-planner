import { Router } from 'express';
import { PresencaController } from '../controllers/PresencaController';

const router = Router();

// CRUD de presenças
router.get('/presencas', PresencaController.getAllPresencas);
router.get('/presencas/:id', PresencaController.getPresencaById);
router.put('/presencas/:id', PresencaController.updatePresenca);
router.delete('/presencas/:id', PresencaController.deletePresenca);

// Presenças por aluno
router.get('/alunos/:alunoId/presencas', PresencaController.getPresencasByAluno);

// Presenças por turma
router.get('/turmas/:turmaId/presencas', PresencaController.getPresencasByTurma);

// Registrar presença
router.post('/turmas/:turmaId/alunos/:alunoId/presenca', PresencaController.registrarPresenca);

export default router; 