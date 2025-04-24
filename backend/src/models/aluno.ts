export class Aluno {
    id?: number;
    nome: string;
    endereco: string;
    email: string;
    telefone: string;
    motivo: string;
    observacoes: string;

    constructor (nome: string, endereco: string, email: string, telefone: string, motivo: string, observacoes: string, id: number) {
        this.id = id;
        this.nome = nome;
        this.endereco = endereco;
        this.email = email;
        this.telefone = telefone;
        this.motivo = motivo;
        this.observacoes = observacoes
    }
}
