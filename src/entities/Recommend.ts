import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  UpdateDateColumn,
  ManyToOne
} from "typeorm";
import User from "./User";

@Entity()
class Like extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", nullable: true })
  content: string;

  @Column({ nullable: true })
  creatorId: number;

  @ManyToOne(type => User, user => user.recommendAsCreator)
  creator: User;

  @Column({ nullable: true })
  receiverId: number;

  @ManyToOne(type => User, user => user.recommendAsReceiver)
  receiver: User;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

export default Like;
