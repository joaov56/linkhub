import { User } from 'src/users/domain/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Link {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({nullable: true})
  name: string;

  @Column({nullable: true})
  link: string;

  @Column({nullable: true})
  icon: string;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;

  @Column({ default: true })
  isActive: boolean;
}