import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  OneToOne,
  JoinColumn,
  UpdateDateColumn
} from "typeorm";
import User from "./User";

@Entity()
class Like extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", nullable: true })
  content: string;

  @Column({ type: "text", nullable: true })
  recommenderId: number;

  @OneToOne(type => User)
  @JoinColumn()
  recommender: User;

  @Column({ type: "text", nullable: true })
  recommendeeId: number;

  @OneToOne(type => User)
  @JoinColumn()
  recommendee: User;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

export default Like;
