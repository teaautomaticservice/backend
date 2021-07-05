import {
    ConflictException,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException,
    UnprocessableEntityException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { SignInDTO } from '../dto/signIn.dto';

import { SingUpDTO } from '../dto/signUp.dto';
import { User } from './../entity/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    public async createUser(singUpDTO: SingUpDTO): Promise<User> {
        if (!(singUpDTO.password === singUpDTO.passwordRepeat)) {
            throw new UnprocessableEntityException('Passwords do not match');
        }

        const user = this.create(singUpDTO);
        await this.createQueryBuilder()
            .insert()
            .into(User)
            .values(user)
            .execute()
            .catch((error) => {
                if (error.code.toString() === '23505') {
                    throw new ConflictException('Email address already in use');
                } else {
                    throw new InternalServerErrorException('Error while saving user to database');
                }
            });

        delete user.password;
        delete user.salt;

        return user;
    }

    public async getUserByEmail(signInDTO: SignInDTO): Promise<User> {
        const user = await this.createQueryBuilder()
            .select(['u.id', 'u.firstName', 'u.lastName', 'u.email', 'u.isActive', 'u.salt', 'u.password'])
            .from(User, 'u')
            .where('u.email = :email', { email: signInDTO.email })
            .andWhere('u.isActive = :isActive', { isActive: true })
            .getOne()
            .catch(() => {
                throw new InternalServerErrorException('Error while saving user to database');
            });

        console.log(user);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const isCheckPassword = await user.checkPassword(signInDTO.password);
        if (!isCheckPassword) {
            throw new UnauthorizedException('Invalid credentials');
        }

        delete user.password;
        delete user.salt;

        return user;
    }
}
