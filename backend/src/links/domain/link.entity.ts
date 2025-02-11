import { User } from 'src/users/domain/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';

@Entity()
export class Link {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  link: string;

  @Column()
  icon: string;

  @JoinColumn({
    name: 'userId',
    referencedColumnName: 'id',
  })
  @OneToOne(() => User, { nullable: false })
  userId: string;

  @Column({ default: true })
  isActive: boolean;
}
