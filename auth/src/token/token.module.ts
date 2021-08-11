import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { ConfigService } from 'auth/config/config.service';
import { TokenController } from 'auth/token/token.controller';
import { TokenService } from 'auth/token/token.service';

@Module({
  imports: [JwtModule.register({})],
  controllers: [TokenController],
  providers: [TokenService, ConfigService],
  exports: [TokenService],
})
export class TokenModule {}
