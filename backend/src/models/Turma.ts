import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Aluno } from './Aluno';
import { Presenca } from './Presenca';

@Entity('turmas')
export class Turma {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    nome!: string;

    @Column()
    horario!: string;

    @Column()
    professor!: string;

    @Column({ nullable: true })
    observacao?: string;

    @ManyToMany(() => Aluno)
    @JoinTable({
        name: 'turma_alunos',
        joinColumn: {
            name: 'turma_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'aluno_id',
            referencedColumnName: 'id'
        }
    })
    alunos!: Aluno[];

    @OneToMany(() => Presenca, presenca => presenca.turma)
    presencas!: Presenca[];

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
} 