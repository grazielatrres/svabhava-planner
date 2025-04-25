import { Request, Response } from "express";
import alunoRepositories from "../repositories/alunoRepositories";

const alunoController = {
    create: (req: Request, res: Response) => {
        const {nome, endereco, email, telefone, motivo, observacoes} = req.body;
        alunoRepositories.create(nome, endereco, email, telefone, motivo, observacoes, (err, result) => {
            if (err) return res.status(500).json({ error: "Erro no servidor" });
            res.status(201).json({ message: "Aluno criado com sucesso", result })
        });
    },
    findAll: (req: Request, res: Response) => {
        alunoRepositories.findAll((err, aluno) => {
            if (err) return res.status(500).json({ error: "Erro no servidor" });
            res.status(201).json(aluno);
        });
    },
    findByID: (req: Request, res: Response) => {
        const { ID_aluno } = req.params;
        alunoRepositories.findById((ID_aluno), (err, aluno) => {
            if (err) return res.status(500).json({ error: "Erro no servidor" });
            if (!aluno) return res.status(404).json({ error: "Aluno não encontrado" });
            res.status(200).json(aluno);
        });
    },
    update: (req: Request, res: Response) => {
        const ID_aluno = Number(req.params.ID_animal);
        const { nome, endereco, email, telefone, motivo, observacoes } = req.body;
        console.log("ID_aluno recebido:", ID_aluno);
        console.log("Dados recebidos:", { nome, endereco, email, telefone, motivo, observacoes });

        alunoRepositories.update(ID_aluno, nome, endereco, email, telefone, motivo, observacoes, (err, result) => {
            if (err) {
                console.error("Erro no update:", err);
                return res.status(500).json({ error: "Erro no servidor", details: err });
            }
            res.status(200).json({ message: "Aluno atualizado com sucesso", result });
        });
    },
    delete: (req: Request, res: Response) => {
        const { ID_aluno } = req.params;
        alunoRepositories.delete((ID_aluno), (err, result) => {
            if (err) return res.status(500).json({ error: "Erro no servidor" });
            res.status(200).json({ message: "Aluno deletado com sucesso", result });
        });
    }
}

export default alunoController;