import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  CreateDateColumn,
  JoinColumn,
  UpdateDateColumn,
  Column
} from "typeorm";
import User from "./User";
import Project from "./Project";

@Entity()
class Like extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  creatorId: number;

  @OneToOne(type => User)
  @JoinColumn()
  creator: User;

  @Column({ type: "text" })
  projectId: number;

  @OneToOne(type => Project)
  @JoinColumn()
  project: Project;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

export default Like;
