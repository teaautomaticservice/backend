import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { SignInDTO } from 'gateway/auth/dto/signIn.dto';
import { SignUpDTO } from 'gateway/auth/dto/signUp.dto';
import { AccessTokensDTO } from 'gateway/auth/dto/accessTokens.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authServiceClient: ClientProxy,
  ) {}

  async onApplicationBootstrap() {
    await this.authServiceClient.connect();
  }

  public async signIn(userData: SignInDTO): Promise<AccessTokensDTO> {
    try {
      return await this.authServiceClient
        .send('user-sign-in', userData)
        .toPromise();
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async signUp(userData: SignUpDTO): Promise<AccessTokensDTO> {
    try {
      return await this.authServiceClient
        .send('user-sign-up', userData)
        .toPromise();
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
