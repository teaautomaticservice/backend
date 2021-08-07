import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from 'gateway/app.module';
import { ConfigService } from "gateway/config/config.service";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');
    const port = new ConfigService().get('app').port;
    const config = new DocumentBuilder()
        .setTitle('Gateway')
        .setDescription('The Gateway API description')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    await app.listen(8000, () => console.log(`Gateway working on port ${port}`));
}
bootstrap();
