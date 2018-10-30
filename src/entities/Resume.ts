import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne
} from "typeorm";
import User from "./User";

@Entity()
class Resume extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  name: string;

  @Column({ type: "text" })
  content: string;

  @Column({ type: "text" })
  createdAt: string;

  @Column({ type: "text" })
  updatedAt: string;

  @OneToOne(type => User, user => user.resume)
  author: User;
}

export default Resume;
