import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configure CORS
  app.use(cors()); // Allow all origins for development, you can specify options as needed

  // Set JSON request size limit (adjust the limit as needed)
  app.use(express.json({ limit: '10mb' }));

  // Set URL-encoded request size limit (adjust the limit as needed)
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  
  await app.listen(3000);
}
bootstrap();
