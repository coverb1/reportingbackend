import { Injectable } from '@nestjs/common';
import { CreateReportProblemDto } from './dto/create-report-problem.dto.js';
import { UpdateReportProblemDto } from './dto/update-report-problem.dto.js';

@Injectable()
export class ReportProblemService {
  create(createReportProblemDto: CreateReportProblemDto) {
    return 'This action adds a new reportProblem';
  }

  findAll() {
    return `This action returns all reportProblem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reportProblem`;
  }

  update(id: number, updateReportProblemDto: UpdateReportProblemDto) {
    return `This action updates a #${id} reportProblem`;
  }

  remove(id: number) {
    return `This action removes a #${id} reportProblem`;
  }
}
