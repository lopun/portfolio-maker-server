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

@Entity()
class Like extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int", nullable: true })
  state: number;

  @Column({ type: "text", nullable: true })
  creatorId: number;

  @ManyToOne(type => User, user => user.createdLikes)
  creator: User;

  @Column({ type: "text", nullable: true })
  receiverId: number;

  @ManyToOne(type => User, user => user.receivedLikes)
  receiver: User;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

export default Like;
