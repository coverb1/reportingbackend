import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller.js';
import { UploadService } from './upload.service.js';
import { PrismaService } from '../prisma.service.js';

@Module({
  controllers: [UploadController],
  providers: [UploadService,PrismaService],
})
export class UploadModule {}