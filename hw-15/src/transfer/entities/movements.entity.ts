import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, Check
} from 'typeorm';
import { Account } from './account.entity';

@Entity()
@Check('amount > 0')
export class Movement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Account, { onDelete: "RESTRICT" })
  @JoinColumn({ name: 'from_id' })
  from: string;

  @ManyToOne(() => Account, { onDelete: "RESTRICT" })
  @JoinColumn({ name: 'to_id' })
  to: string;

  @Column('numeric', { precision: 15, scale: 2, default: 0 })
  amount: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}