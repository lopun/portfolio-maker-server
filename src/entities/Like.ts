import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  CreateDateColumn,
  JoinColumn
} from "typeorm";
import User from "./User";
import Project from "./Project";

@Entity()
class Resume extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: string;

  @OneToOne(type => User)
  @JoinColumn()
  creator: User;

  @OneToOne(type => Project)
  @JoinColumn()
  project: Project;
}

export default Resume;
