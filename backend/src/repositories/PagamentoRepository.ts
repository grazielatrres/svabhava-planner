import { AppDataSource } from '../config/database';
import { Pagamento } from '../models/Pagamento';
import { Aluno } from '../models/aluno';

export class PagamentoRepository {
    private static repository = AppDataSource.getRepository(Pagamento);

    static async findAll(): Promise<Pagamento[]> {
        return this.repository.find({ relations: ['aluno'] });
    }

    static async findById(id: string): Promise<Pagamento | null> {
        return this.repository.findOne({
            where: { id },
            relations: ['aluno']
        });
    }

    static async findByAluno(alunoId: string): Promise<Pagamento[]> {
        return this.repository.find({
            where: { aluno: { id: alunoId } },
            relations: ['aluno']
        });
    }

    static async findByStatus(status: Pagamento['status']): Promise<Pagamento[]> {
        return this.repository.find({
            where: { status },
            relations: ['aluno']
        });
    }

    static async create(pagamentoData: Omit<Pagamento, 'id' | 'createdAt' | 'updatedAt'>): Promise<Pagamento> {
        const pagamento = this.repository.create(pagamentoData);
        return this.repository.save(pagamento);
    }

    static async update(id: string, pagamentoData: Partial<Pagamento>): Promise<Pagamento | null> {
        const pagamento = await this.findById(id);
        if (!pagamento) return null;

        Object.assign(pagamento, pagamentoData);
        return this.repository.save(pagamento);
    }

    static async delete(id: string): Promise<boolean> {
        const result = await this.repository.delete(id);
        return result.affected !== 0;
    }

    static async registrarPagamento(alunoId: string, valor: number, observacao?: string): Promise<Pagamento> {
        const alunoRepository = AppDataSource.getRepository(Aluno);
        const aluno = await alunoRepository.findOneBy({ id: alunoId });
        if (!aluno) throw new Error('Aluno não encontrado');

        return this.create({
            aluno,
            valor,
            data: new Date(),
            status: 'pago',
            observacao
        });
    }

    static async registrarPagamentoPendente(alunoId: string, valor: number, observacao?: string): Promise<Pagamento> {
        const alunoRepository = AppDataSource.getRepository(Aluno);
        const aluno = await alunoRepository.findOneBy({ id: alunoId });
        if (!aluno) throw new Error('Aluno não encontrado');

        return this.create({
            aluno,
            valor,
            data: new Date(),
            status: 'pendente',
            observacao
        });
    }
} 