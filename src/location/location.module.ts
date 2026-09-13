import { Module } from '@nestjs/common';
import { LocationController } from './location.controller.js';
import { LocationService } from './location.service.js';
import { PrismaService } from '../prisma.service.js';

@Module({
  controllers: [LocationController],
  providers: [LocationService,PrismaService]
})
export class LocationModule {}
