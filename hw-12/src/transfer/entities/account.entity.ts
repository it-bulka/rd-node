import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('numeric', { precision: 15, scale: 2, default: 0 })
  balance: number;
}