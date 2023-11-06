export class User {}
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { hashSync } from 'bcrypt';

export type RoleEnum = 'admin' | 'client' | 'editor';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ name: 'role', type: 'enum', enum: ['admin', 'client', 'editor'], default: null })
  role: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at', select: false })
  deletedAt: string;

  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, 10);
  }

  constructor(todo?: Partial<UserEntity>) {
    this.id = todo?.id;
    this.firstName = todo?.firstName;
    this.lastName = todo?.lastName;
    this.email = todo?.email;
    this.password = todo?.password;
    this.role = todo?.role;
    this.createdAt = todo?.createdAt;
    this.updatedAt = todo?.updatedAt;
    this.deletedAt = todo?.deletedAt;
  }
}
