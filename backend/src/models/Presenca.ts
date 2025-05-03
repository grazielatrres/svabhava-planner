import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Aluno } from './Aluno';
import { Turma } from './Turma';

@Entity('presencas')
export class Presenca {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Aluno, aluno => aluno.presencas)
    aluno: Aluno;

    @ManyToOne(() => Turma, turma => turma.presencas)
    turma: Turma;

    @Column()
    presente: boolean;

    @Column()
    data: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
} 