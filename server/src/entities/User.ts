import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", nullable: true })
    name?: string;

    @Column({ type: "varchar", unique: true, nullable: true })
    email?: string;

    @Column({ type: "varchar", nullable: true })
    address?: string;

    @Column({ type: "date", nullable: true })
    birthdate?: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at!: Date;
}