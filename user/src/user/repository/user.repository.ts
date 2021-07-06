import { NotFoundException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { EntityRepository, Repository } from 'typeorm';
import { SaveRefreshToken } from '../dto/saveRefreshToken.dto';

import { SignInDTO } from '../dto/signIn.dto';
import { SingUpDTO } from '../dto/signUp.dto';
import { UserDTO } from '../dto/user.dto';
import { UserWrapper } from '../wrapper/user.wrapper';
import { User } from './../entity/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    public async createUser(singUpDTO: SingUpDTO): Promise<UserDTO> {
        if (!(singUpDTO.password === singUpDTO.passwordRepeat)) {
            throw new RpcException('Passwords do not match');
        }

        const user = this.create(singUpDTO);
        await this.createQueryBuilder()
            .insert()
            .into(User)
            .values(user)
            .execute()
            .catch((error) => {
                if (error.code.toString() === '23505') {
                    throw new RpcException('Email address already in use');
                } else {
                    throw new RpcException('Error while saving user to database');
                }
            });

        return new UserWrapper(user);
    }

    public async getUserByEmail(signInDTO: SignInDTO): Promise<UserDTO> {
        const user = await this.createQueryBuilder()
            .select(['u.id', 'u.firstName', 'u.lastName', 'u.email', 'u.isActive', 'u.salt', 'u.password', 'u.refreshToken'])
            .from(User, 'u')
            .where('u.email = :email', { email: signInDTO.email })
            .andWhere('u.isActive = :isActive', { isActive: true })
            .getOne()
            .catch(() => {
                throw new RpcException('Error while saving user to database');
            });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const isCheckPassword = await user.checkPassword(signInDTO.password);
        if (!isCheckPassword) {
            throw new RpcException('Invalid credentials');
        }

        return new UserWrapper(user);
    }

    public async saveRefreshToken({ userId, refreshToken }: SaveRefreshToken): Promise<void> {
        await this.createQueryBuilder()
            .update(User)
            .set({ refreshToken })
            .where('id = :userId', { userId })
            .execute()
            .catch(() => {
                throw new RpcException('Error while saving user to database');
            });
    }
}
