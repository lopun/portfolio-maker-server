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

  @Column({ type: "text", nullable: true })
  recommenderId: number;

  @ManyToOne(type => User, user => user.gaveRecommends)
  recommender: User;

  @Column({ type: "text", nullable: true })
  recommendeeId: number;

  @ManyToOne(type => User, user => user.gotRecommends)
  recommendee: User;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

export default Like;
