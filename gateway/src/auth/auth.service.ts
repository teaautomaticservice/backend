import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { SignInDTO } from 'gateway/auth/dto/signIn.dto';
import { SignUpDTO } from 'gateway/auth/dto/signUp.dto';
import { CreateToken } from 'gateway/auth/interfaces/createToken.interface';
import { Tokens } from 'gateway/auth/interfaces/tokens.interface';

@Injectable()
export class AuthService {
    constructor(@Inject('AUTH_SERVICE') private readonly authServiceClient: ClientProxy,) {
    }

    async onApplicationBootstrap() {
        await this.authServiceClient.connect();
    }

    public async signIn(userData: SignInDTO): Promise<Tokens> {
        try {
            return await this.authServiceClient.send('user-sign-in', userData).toPromise();
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }

    public async signUp(userData: SignUpDTO): Promise<Tokens> {
        try {
            return await this.authServiceClient.send('user-sign-up', userData).toPromise();

        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }

    public async createAccessToken(user: CreateToken): Promise<string> {
        return await this.authServiceClient.send('create-access-token', user).toPromise();
    }

    public async createRefreshToken(user: CreateToken): Promise<string> {
        return await this.authServiceClient.send('create-refresh-token', user).toPromise();
    }
}
