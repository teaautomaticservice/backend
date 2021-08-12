import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';

import { AppModule } from 'auth/app.module';
import { ConfigService } from 'auth/config/config.service';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: new ConfigService().get('app').host,
      port: new ConfigService().get('app').port,
    },
  });
  await app.listen();
}
bootstrap();
