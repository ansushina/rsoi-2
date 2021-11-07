import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const path = require('path');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  require('dotenv').config({
    path: path.resolve(
        process.cwd(),
        process.env.NODE_ENV === 'production' ? '.env' : '.development.env',
    ),
});
  await app.listen(process.env.PORT);
}
bootstrap();
