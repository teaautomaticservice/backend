import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { ConfigService } from 'auth/config/config.service';
import { JwtDataType } from 'auth/token/types/token.type';
import { UserDTO } from 'auth/user/dto/user.dto';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public createAccessToken(user: UserDTO): string {
    const options = this.configService.get('accessConfig');
    return this.jwtService.sign(user, options);
  }

  public validateAccessToken(token: string): JwtDataType {
    const options = this.configService.get('accessConfig');
    return this.jwtService.verify<JwtDataType>(token, options);
  }

  public createRefreshToken(user: UserDTO): string {
    const options = this.configService.get('refreshConfig');
    return this.jwtService.sign(user, options);
  }

  public validateRefreshToken(token: string): JwtDataType {
    const options = this.configService.get('refreshConfig');
    return this.jwtService.verify<JwtDataType>(token, options);
  }
}
