import 'dotenv/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { ValidationPipe } from './shared/validation.pipe';

const { PORT = 3000 } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT);
}
bootstrap();
