import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const PORT = await app.get('ConfigService').get('port');
    const config = new DocumentBuilder()
        .setTitle('Gateway')
        .setDescription('The Gateway API description')
        .setVersion('1.0')
        .addTag('gateway')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    app.setGlobalPrefix('api');
    await app.listen(PORT, () => console.log(`Gateway working on port ${PORT}`));
}
bootstrap();
