import { Request, Response } from "express";
import { AlunoRepository } from "../repositories/AlunoRepository";

export class AlunoController {
    static async getAllAlunos(req: Request, res: Response) {
        try {
            const alunos = await AlunoRepository.findAll();
            res.json(alunos);
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    }

    static async getAlunoById(req: Request, res: Response) {
        try {
            const aluno = await AlunoRepository.findById(req.params.id);
            if (!aluno) {
                return res.status(404).json({ error: "Aluno not found" });
            }
            res.json(aluno);
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    }

    static async createAluno(req: Request, res: Response) {
        try {
            const { nome, email, telefone } = req.body;
            if (!nome || !email || !telefone) {
                return res.status(400).json({ error: "Nome, email e telefone são obrigatórios" });
            }

            const aluno = await AlunoRepository.create({
                nome,
                email,
                telefone
            });

            res.status(201).json(aluno);
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    }

    static async updateAluno(req: Request, res: Response) {
        try {
            const { nome, email, telefone } = req.body;
            const aluno = await AlunoRepository.update(req.params.id, {
                nome,
                email,
                telefone
            });

            if (!aluno) {
                return res.status(404).json({ error: "Aluno not found" });
            }

            res.json(aluno);
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    }

    static async deleteAluno(req: Request, res: Response) {
        try {
            const success = await AlunoRepository.delete(req.params.id);
            if (!success) {
                return res.status(404).json({ error: "Aluno not found" });
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    }
}