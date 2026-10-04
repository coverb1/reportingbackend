import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReportProblemService } from './report-problem.service.js';
import { CreateReportProblemDto } from './dto/create-report-problem.dto.js';
import { UpdateReportProblemDto } from './dto/update-report-problem.dto.js';

@Controller('report-problem')
export class ReportProblemController {
  constructor(private readonly reportProblemService: ReportProblemService) {}

  @Post()
  create(@Body() createReportProblemDto: CreateReportProblemDto) {
    return this.reportProblemService.create(createReportProblemDto);
  }

  @Get()
  findAll() {
    return this.reportProblemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reportProblemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReportProblemDto: UpdateReportProblemDto) {
    return this.reportProblemService.update(+id, updateReportProblemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reportProblemService.remove(+id);
  }
}
