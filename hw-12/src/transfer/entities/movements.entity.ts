import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn
} from 'typeorm';
import { Account } from './account.entity';

@Entity('movements')
export class Movement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Account)
  @JoinColumn({ name: 'from_id' })
  from: string;

  @ManyToOne(() => Account)
  @JoinColumn({ name: 'to_id' })
  to: string;

  @Column('numeric', { precision: 15, scale: 2, default: 0 })
  amount: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}