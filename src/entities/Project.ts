import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany
} from "typeorm";
import User from "./User";
import Like from "./Like";

@Entity()
class Project extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  name: string;

  @Column({ type: "text" })
  content: string;

  @Column({ type: "text", nullable: true })
  authorId: number;

  @ManyToOne(type => User, user => user.projects)
  author: User;

  @OneToMany(type => Like, like => like.project)
  likes: Like[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

export default Project;
