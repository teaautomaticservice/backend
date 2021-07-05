import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

import { TokenService } from 'src/token/token.service';
import { JwtDataType } from 'src/token/types/token.types';

@Controller('token')
export class TokenController {
    constructor(private readonly tokenService: TokenService) {}

    @EventPattern('create-access-token')
    handleCreateAccessToken(data: JwtDataType): string {
        return this.tokenService.createAccessToken(data);
    }

    @EventPattern('validate-access-token')
    handleValidateAccessToken(token: string): JwtDataType {
        return this.tokenService.validateAccessToken(token);
    }

    @EventPattern('create-refresh-token')
    handleCreateRefreshToken(data: JwtDataType): string {
        return this.tokenService.createRefreshToken(data);
    }

    @EventPattern('validate-refresh-token')
    handleValidateRefreshToken(token: string): JwtDataType {
        return this.tokenService.validateRefreshToken(token);
    }
}
