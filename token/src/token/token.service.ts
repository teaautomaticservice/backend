import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';

import { ConfigService } from 'src/config/config.service';
import { JwtDataType } from 'src/token/types/token.types';

@Injectable()
export class TokenService {
    constructor(private readonly jwtService: JwtService, private readonly configService: ConfigService) {}

    public createAccessToken(data: JwtDataType): string {
        const options = this.configService.get<JwtSignOptions>('accessConfig');
        return this.jwtService.sign(data, options);
    }

    public validateAccessToken(token: string): JwtDataType {
        const options = this.configService.get<JwtVerifyOptions>('accessConfig');
        return this.jwtService.verify<JwtDataType>(token, options);
    }

    public createRefreshToken(data: JwtDataType): string {
        const options = this.configService.get<JwtSignOptions>('refreshConfig');
        return this.jwtService.sign(data, options);
    }

    public validateRefreshToken(token: string): JwtDataType {
        const options = this.configService.get<JwtSignOptions>('refreshConfig');
        return this.jwtService.verify<JwtDataType>(token, options);
    }
}
