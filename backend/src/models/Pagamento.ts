import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Aluno } from './Aluno';

@Entity('pagamentos')
export class Pagamento {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Aluno, aluno => aluno.pagamentos)
    aluno: Aluno;

    @Column('decimal', { precision: 10, scale: 2 })
    valor: number;

    @Column()
    data: Date;

    @Column({
        type: 'enum',
        enum: ['pendente', 'pago', 'atrasado'],
        default: 'pendente'
    })
    status: 'pendente' | 'pago' | 'atrasado';

    @Column({ nullable: true })
    observacao?: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
} 