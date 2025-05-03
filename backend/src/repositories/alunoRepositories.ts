/* eslint-disable @typescript-eslint/no-explicit-any */
import connection from "../config/bd";


const alunoRepositories = {
    create: (nome: string, endereco: string, email: string, telefone: string, motivo: string, observacoes: string, 
        callback: (err: Error | null, results?: any) => void) => {
        const query = 'INSERT INTO aluno (nome, endereco, email, telefone, motivo, observacoes) VALUES (?, ?, ?, ?, ?, ?)';
        connection.query(query, [nome, endereco, email, telefone, motivo, observacoes], (err: Error | null, results?: any) => {
            if (err) return callback (err);
            callback (null, results);
        });
    },
    findAll: (callback: (err: Error | null, results?: any) => void) => {
        const query = 'SELECT * FROM aluno';
        connection.query(query, (err: Error | null, results?: any) => {
            if (err) return callback (err);
            callback (null, results); 
        });
    }, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    findById: (ID_aluno: any, callback: (err: Error | null, results?: any ) => void) => {
        const query = 'SELECT * FROM aluno WHERE ID_aluno = ?';
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        connection.query(query, [ID_aluno], (err: Error | null, results?: any) => {
            if (err) return callback (err);
            callback (null, results);
        });
    },
    update: (nome: string, endereco: string, email: string, telefone: string, 
        motivo: string, observacoes: string, ID_aluno: any, callback: (err: Error | null, results?: any) => void) => {
            console.log("Valores recebidos no update:", { nome, endereco, email, telefone, motivo, observacoes, ID_aluno });

            const query = 'UPDATE aluno SET nome = ?, endereco = ?, email = ?, telefone = ?, motivo = ?, observacoes = ? WHERE ID_aluno = ?';
            connection.query(query, [nome, endereco, email, telefone, motivo, observacoes, ID_aluno], (err: Error | null, results?: any) => {
                if (err) return callback (err);
                callback (null, results);
            });
        },
    delete: (ID_aluno: any, callback: (err: Error | null, results?: any) => void) => {
        const query = 'DELETE FROM aluno WHERE ID_aluno = ?';
        connection.query(query, [ID_aluno], (err: Error | null, results?: any) => {
            if (err) return callback (err);
            callback (null, results); 
        });
    }
};

export default alunoRepositories;