import { RpcException } from '@nestjs/microservices';
import { EntityRepository, Repository } from 'typeorm';

import { SignInDTO } from 'auth/user/dto/signIn.dto';
import { SingUpDTO } from 'auth/user/dto/signUp.dto';
import { UserDTO } from 'auth/user/dto/user.dto';
import { UserWrapper } from 'auth/user/wrapper/user.wrapper';
import { User } from 'auth/user/entity/user.entity';

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
          throw new RpcException(error);
        }
      });

    // todo: create ClassSerializerInterceptor
    const userSerializer = new UserWrapper(user);
    return { ...userSerializer };
  }

  public async getUserByEmail(signInDTO: SignInDTO): Promise<UserDTO> {
    const user = await this.createQueryBuilder()
      .select([
        'u.id',
        'u.firstName',
        'u.lastName',
        'u.email',
        'u.isActive',
        'u.salt',
        'u.password',
        'u.createdAt',
        'u.updatedAt',
        'u.deletedAt',
      ])
      .from(User, 'u')
      .where('u.email = :email', { email: signInDTO.email })
      .andWhere('u.isActive = :isActive', { isActive: true })
      .getOne()
      .catch((error) => {
        throw new RpcException(error);
      });

    if (!user) {
      throw new RpcException('User not found');
    }

    const isCheckPassword = await user.checkPassword(signInDTO.password);
    if (!isCheckPassword) {
      throw new RpcException('Invalid credentials');
    }

    // todo: create ClassSerializerInterceptor
    const userSerializer = new UserWrapper(user);
    return { ...userSerializer };
  }
}
