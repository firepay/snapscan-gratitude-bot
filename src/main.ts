import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(config.server.port);
  console.log(`Server running on PORT: ${config.server.port}`)
}
bootstrap();
