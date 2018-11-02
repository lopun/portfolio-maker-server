import bcrypt from "bcrypt";
import { IsEmail } from "class-validator";
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
  JoinColumn
} from "typeorm";
import Resume from "./Resume";
import Project from "./Project";
import Like from "./Like";
import Recommend from "./Recommend";
const BCRYPT_ROUNDS = 10;

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", nullable: true })
  @IsEmail()
  email: string | null;

  @Column({ type: "text" })
  firstName: string;

  @Column({ type: "text" })
  lastName: string;

  @Column({ type: "int", nullable: true })
  age: number;

  @Column({ type: "text" })
  password: string;

  @Column({ type: "text", nullable: true })
  profilePhoto: string;

  @Column({ nullable: true })
  resumeId: number;

  @OneToOne(type => Resume, resume => resume.author, { nullable: true })
  @JoinColumn()
  resume: Resume;

  @OneToMany(type => Recommend, recommend => recommend.creator)
  recommendAsCreator: Recommend[];

  @OneToMany(type => Recommend, recommend => recommend.receiver)
  recommendAsReceiver: Recommend[];

  @OneToMany(type => Project, project => project.author, { nullable: true })
  projects: Project[];

  @OneToMany(type => Like, like => like.creator)
  likeAsCreator: Like[];

  @OneToMany(type => Like, like => like.receiver)
  likeAsReceiver: Like[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  public comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  @BeforeInsert()
  @BeforeUpdate()
  async savePassword(): Promise<void> {
    if (this.password) {
      const hashedPassword = await this.hashPassword(this.password);
      this.password = hashedPassword;
      console.log(this.password);
    }
  }

  private hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, BCRYPT_ROUNDS);
  }
}

export default User;
