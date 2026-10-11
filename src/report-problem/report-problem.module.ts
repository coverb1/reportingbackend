
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { ReportProblemService } from './report-problem.service.js';
import { ReportProblemController } from './report-problem.controller.js';
import { PrismaService } from '../prisma.service.js';

@Module({
  imports: [
    JwtModule.register({}),
  ],
  controllers: [ReportProblemController],
  providers: [
    ReportProblemService,
    PrismaService,
  ],
})
export class ReportProblemModule {}
