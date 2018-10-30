import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne
} from "typeorm";
import User from "./User";
import Project from "./Project";

@Entity()
class Like extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", nullable: true })
  creatorId: number;

  @ManyToOne(type => User, user => user.likes)
  creator: User;

  @Column({ type: "text", nullable: true })
  projectId: number;

  @ManyToOne(type => Project, project => project.likes)
  project: Project;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

export default Like;
