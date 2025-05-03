import { Router } from 'express';
import { AlunoController } from '../controllers/alunoController';

const router = Router();

router.get('/alunos', AlunoController.getAllAlunos);
router.get('/alunos/:id', AlunoController.getAlunoById);
router.post('/alunos', AlunoController.createAluno);
router.put('/alunos/:id', AlunoController.updateAluno);
router.delete('/alunos/:id', AlunoController.deleteAluno);

export default router; 