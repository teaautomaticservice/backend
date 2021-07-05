import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { SignInDTO } from './dto/signIn.dto';
import { SignUpDTO } from './dto/signUp.dto';

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

    public async signIn(data: SignInDTO): Promise<any> {
        const user = await this.userServiceClient.send('user-sign-in', data).toPromise();
        const accessToken = await this.tokenServiceClient.send('create-access-token', user).toPromise();
        const refreshToken = await this.tokenServiceClient.send('create-refresh-token', user).toPromise();

        return { accessToken, refreshToken };
    }

    public async signUp(data: SignUpDTO): Promise<any> {
        const user = await this.userServiceClient.send('user-sign-up', data).toPromise();
        const accessToken = await this.tokenServiceClient.send('create-access-token', user).toPromise();
        const refreshToken = await this.tokenServiceClient.send('create-refresh-token', user).toPromise();

        return { accessToken, refreshToken };
    }
}
