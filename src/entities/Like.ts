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

  @Column({ type: "text", nullable: true })
  state: string;

  @Column({ nullable: true })
  creatorId: number;

  @ManyToOne(type => User, user => user.likeAsCreator)
  creator: User;

  @Column({ nullable: true })
  receiverId: number;

  @ManyToOne(type => User, user => user.likeAsReceiver)
  receiver: User;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

export default Like;
