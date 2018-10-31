import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne
} from "typeorm";
import User from "./User";

@Entity()
class Project extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  name: string;

  @Column({ type: "text", nullable: true })
  content: string;

  @Column({ nullable: true })
  authorId: number;

  @ManyToOne(type => User, user => user.projects)
  author: User;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

export default Project;
