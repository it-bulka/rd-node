import { Entity, PrimaryGeneratedColumn, Column, Check } from 'typeorm'

@Entity()
@Check('balance >= 0')
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('numeric', { precision: 15, scale: 2, default: 0 })
  balance: number;
}