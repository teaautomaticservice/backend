import { Module } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';

import { ConfigService } from './config/config.service';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [AuthModule],
    controllers: [],
    providers: [
        ConfigService,
        {
            provide: 'TOKEN_SERVICE',
            useFactory: (configService: ConfigService) => {
                const tokenServiceOptions = configService.get('tokenService');
                return ClientProxyFactory.create(tokenServiceOptions);
            },
            inject: [ConfigService],
        },
        {
            provide: 'USER_SERVICE',
            useFactory: (configService: ConfigService) => {
                const userServiceOptions = configService.get('userService');
                return ClientProxyFactory.create(userServiceOptions);
            },
            inject: [ConfigService],
        },
    ],
})
export class AppModule {}
