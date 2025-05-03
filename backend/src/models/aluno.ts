import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Presenca } from './Presenca';
import { Pagamento } from './Pagamento';

@Entity('Alunos')
export class Aluno {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    nome!: string;

    @Column()
    email!: string;

    @Column()
    telefone!: string;

    @Column({ nullable: true })
    endereco?: string;

    @Column({ nullable: true })
    observacao?: string;

    @OneToMany(() => Presenca, presenca => presenca.aluno)
    presencas!: Presenca[];

    @OneToMany(() => Pagamento, pagamento => pagamento.aluno)
    pagamentos!: Pagamento[];

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
