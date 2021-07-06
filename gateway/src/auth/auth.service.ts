import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { SignInDTO } from './dto/signIn.dto';
import { SignUpDTO } from './dto/signUp.dto';
import { CreateToken } from './interfaces/createToken.interface';
import { Tokens } from './interfaces/tokens.interface';
import { DataWrapper } from './wrapper/data.wrapper';

@Injectable()
export class AuthService {
    constructor(
        @Inject('TOKEN_SERVICE') private readonly tokenServiceClient: ClientProxy,
        @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
    ) {}

    async onApplicationBootstrap() {
        await this.tokenServiceClient.connect();
        await this.userServiceClient.connect();
    }

    public async signIn(userData: SignInDTO): Promise<Tokens> {
        try {
            const user = await this.userServiceClient.send('user-sign-in', userData).toPromise();
            const accessToken = await this.createAccessToken(user);

            return { accessToken, refreshToken: user.refreshToken };
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }

    public async signUp(userData: SignUpDTO): Promise<Tokens> {
        try {
            const tokenData = new DataWrapper(userData);
            const accessToken = await this.createAccessToken(tokenData);
            const refreshToken = await this.createRefresgToken(tokenData);
            await this.userServiceClient.send('user-sign-up', { ...userData, refreshToken }).toPromise();

            return { accessToken, refreshToken };
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }

    private async createAccessToken(user: CreateToken): Promise<string> {
        return await this.tokenServiceClient.send('create-access-token', user).toPromise();
    }

    private async createRefresgToken(user: CreateToken): Promise<string> {
        return await this.tokenServiceClient.send('create-refresh-token', user).toPromise();
    }
}
