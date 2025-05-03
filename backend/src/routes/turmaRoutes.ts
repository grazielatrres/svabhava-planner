import { Router } from 'express';
import { TurmaController } from '../controllers/turmaController';

const router = Router();

// CRUD de turmas
router.get('/turmas', TurmaController.getAllTurmas);
router.get('/turmas/:id', TurmaController.getTurmaById);
router.post('/turmas', TurmaController.createTurma);
router.put('/turmas/:id', TurmaController.updateTurma);
router.delete('/turmas/:id', TurmaController.deleteTurma);

// Gerenciamento de alunos nas turmas
router.post('/turmas/:turmaId/alunos/:alunoId', TurmaController.matricularAluno);
router.delete('/turmas/:turmaId/alunos/:alunoId', TurmaController.cancelarMatricula);

export default router;

