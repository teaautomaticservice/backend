import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { ConfigService } from 'src/config/config.service';
import { TokenController } from 'src/token/token.controller';
import { TokenService } from 'src/token/token.service';

@Module({
    imports: [JwtModule.register({})],
    controllers: [TokenController],
    providers: [TokenService, ConfigService],
})
export class TokenModule {}
