import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './entity/user.entity';
import { UserRepository } from './repository/user.repository';
import { SingUpDTO } from './dto/signUp.dto';
import { SignInDTO } from './dto/signIn.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository,
    ) {}

    public async userSingIn(data: SignInDTO): Promise<User> {
        return await this.userRepository.getUserByEmail(data);
    }

    public async userSingUp(data: SingUpDTO): Promise<User> {
        return await this.userRepository.createUser(data);
    }
}
