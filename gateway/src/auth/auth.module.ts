import { Module } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';

import { ConfigService } from 'gateway/config/config.service';
import { AuthController } from 'gateway/auth/auth.controller';
import { AuthService } from 'gateway/auth/auth.service';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    ConfigService,
    {
      provide: 'AUTH_SERVICE',
      useFactory: (configService: ConfigService) => {
        const authServiceOptions = configService.get('authService');
        return ClientProxyFactory.create(authServiceOptions);
      },
      inject: [ConfigService],
    },
  ],
})
export class AuthModule {}
