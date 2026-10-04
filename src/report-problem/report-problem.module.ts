import { Module } from '@nestjs/common';
import { ReportProblemService } from './report-problem.service.js';
import { ReportProblemController } from './report-problem.controller.js';

@Module({
  controllers: [ReportProblemController],
  providers: [ReportProblemService],
})
export class ReportProblemModule {}
