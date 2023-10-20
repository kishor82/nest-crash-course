import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import RedisStore from 'connect-redis';
import { default as Redis } from 'ioredis';
import * as session from 'express-session';
import * as passport from 'passport';

class Main {
  async bootstrap() {
    const logger = new Logger(Main.name);
    const redisStore = new RedisStore({
      client: Redis,
      prefix: 'myapp:',
    });
    const port = 3000;

    const app = await NestFactory.create(AppModule);

    app.use(
      session({
        store: redisStore,
        secret: 'keyboard cat', // TODO : get it from env
        resave: false,
        saveUninitialized: false,
        cookie: {
          maxAge: 360000,
        },
      }),
    );

    app.use(passport.initialize());
    app.use(passport.session());

    app.useGlobalPipes(new ValidationPipe());

    const config = new DocumentBuilder()
      .setTitle('Nest API')
      .setDescription('the description of the API')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('/doc', app, document);

    logger.log(`Listening on port ${port}`);
    await app.listen(3000);
  }
}

new Main().bootstrap();
