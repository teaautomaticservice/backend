import {
    BaseEntity,
    Entity,
    Unique,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    BeforeInsert,
} from 'typeorm';
import { hash, genSalt } from 'bcryptjs';
import { randomBytes } from 'crypto';

const size = 32;
const encodin = 'hex';

@Entity('users')
@Unique(['email'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    public readonly id: string;

    @Column({ nullable: false, type: 'varchar', length: 200 })
    public readonly email: string;

    @Column({ nullable: false, type: 'varchar', length: 200 })
    public readonly firstName: string;

    @Column({ nullable: false, type: 'varchar', length: 200 })
    public readonly lastName: string;

    @Column({ nullable: false, type: 'boolean', default: true }) // TODO it have to switch then will be logic for users activation
    public readonly isActive: boolean;

    @Column({ nullable: false, type: 'varchar', length: 64 })
    public password: string;

    @Column({ nullable: false, type: 'varchar', length: 64 })
    public salt: string;

    @CreateDateColumn()
    public readonly createdAt: Date;

    @UpdateDateColumn()
    public readonly updatedAt: Date;

    @DeleteDateColumn()
    public readonly deletedAt: Date;

    @BeforeInsert()
    private async setHashPasswordAndSalt(): Promise<void> {
        const salt = await genSalt();
        this.salt = salt;
        this.password = await hash(this.password, salt);
    }

    public getRandomStringBytes(): string {
        return randomBytes(size).toString(encodin);
    }

    public async getPasswordAndSalt(newPassword: string): Promise<{ salt: string; password: string }> {
        const salt = await genSalt();
        const password = await hash(newPassword, salt);

        return { salt, password };
    }

    public async checkPassword(password: string): Promise<boolean> {
        const newHash = await hash(password, this.salt);
        return newHash === this.password;
    }
}
