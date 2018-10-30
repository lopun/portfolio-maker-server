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

  @Column({ type: "text" })
  content: string;

  @Column({ type: "text" })
  recommenderId: number;

  @OneToOne(type => User)
  @JoinColumn()
  recommender: User;

  @Column({ type: "text" })
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
