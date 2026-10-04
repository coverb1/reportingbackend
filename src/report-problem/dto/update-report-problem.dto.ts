import { PartialType } from '@nestjs/mapped-types';
import { CreateReportProblemDto } from './create-report-problem.dto.js';

export class UpdateReportProblemDto extends PartialType(CreateReportProblemDto) {}
