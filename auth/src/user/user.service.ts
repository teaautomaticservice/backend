import { Injectable } from '@nestjs/common';
import { RpcException } from "@nestjs/microservices";
import { InjectRepository } from '@nestjs/typeorm';

import { UserRepository } from 'auth/user/repository/user.repository';
import { SingUpDTO } from 'auth/user/dto/signUp.dto';
import { SignInDTO } from 'auth/user/dto/signIn.dto';
import { TokenService } from "auth/token/token.service";
import { AccessTokenDTO } from "auth/user/dto/accessToken.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository,
        private readonly tokenService: TokenService,
    ) {
    }

    public async userSingIn(data: SignInDTO): Promise<AccessTokenDTO> {
        try {
            const user = await this.userRepository.getUserByEmail(data);
            const accessToken = this.tokenService.createAccessToken(user);
            const refreshToken = this.tokenService.createRefreshToken(user);

            return {accessToken, refreshToken};
        } catch (error) {
            throw new RpcException(error);
        }
    }

    public async userSingUp(data: SingUpDTO): Promise<AccessTokenDTO> {
        try {
            const user = await this.userRepository.createUser(data)
            const accessToken = this.tokenService.createAccessToken(user);
            const refreshToken = this.tokenService.createRefreshToken(user);

            return {accessToken, refreshToken};
        } catch (error) {
            throw new RpcException(error);
        }
    }
}
