import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';

async function bootstrap() {
    const app = await NestFactory.createMicroservice(AppModule, {
        transport: Transport.TCP,
        options: {
            host: new ConfigService().get('host'),
            port: new ConfigService().get('port'),
        },
    });
    app.listen(() => console.log('Microservice user is listening'));
}
bootstrap();
