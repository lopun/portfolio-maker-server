import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  CreateDateColumn,
  JoinColumn,
  UpdateDateColumn
} from "typeorm";
import User from "./User";
import Project from "./Project";

@Entity()
class Like extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(type => User)
  @JoinColumn()
  creator: User;

  @OneToOne(type => Project)
  @JoinColumn()
  project: Project;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

export default Like;
