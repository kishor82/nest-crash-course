import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';

class Main {
  async bootstrap() {
    const logger = new Logger(Main.name);

    const port = 3000;

    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe());

    const config = new DocumentBuilder()
      .setTitle('Nest API')
      .setDescription('the description of the API')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('/doc', app, document);

    logger.log(`Listening on port ${port}`);
    await app.listen(3000);
  }
}

new Main().bootstrap();
