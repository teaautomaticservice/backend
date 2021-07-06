import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserRepository } from './repository/user.repository';
import { SingUpDTO } from './dto/signUp.dto';
import { SignInDTO } from './dto/signIn.dto';
import { UserDTO } from './dto/user.dto';
import { SaveRefreshToken } from './dto/saveRefreshToken.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository,
    ) {}

    public async userSingIn(data: SignInDTO): Promise<UserDTO> {
        return await this.userRepository.getUserByEmail(data);
    }

    public async userSingUp(data: SingUpDTO): Promise<UserDTO> {
        return await this.userRepository.createUser(data);
    }

    public async saveRefreshToken(data: SaveRefreshToken): Promise<void> {
        await this.userRepository.saveRefreshToken(data);
    }
}
