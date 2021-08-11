import { Module } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';

import { ConfigService } from 'gateway/config/config.service';
import { AuthModule } from 'gateway/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [],
  providers: [
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
export class AppModule {}
