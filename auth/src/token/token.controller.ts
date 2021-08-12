import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

import { TokenService } from 'auth/token/token.service';
import { JwtDataType } from 'auth/token/types/token.type';
import { UserDTO } from 'auth/user/dto/user.dto';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @EventPattern('create-access-token')
  public handleCreateAccessToken(data: UserDTO): string {
    return this.tokenService.createAccessToken(data);
  }

  @EventPattern('validate-access-token')
  public handleValidateAccessToken(token: string): JwtDataType {
    return this.tokenService.validateAccessToken(token);
  }

  @EventPattern('create-refresh-token')
  public handleCreateRefreshToken(data: UserDTO): string {
    return this.tokenService.createRefreshToken(data);
  }

  @EventPattern('validate-refresh-token')
  public handleValidateRefreshToken(token: string): JwtDataType {
    return this.tokenService.validateRefreshToken(token);
  }
}
