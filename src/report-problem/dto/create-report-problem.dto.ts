
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,} from 'class-validator';
import { ReportCategory } from '@prisma/client';

export class CreateReportProblemDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  description: string;

  @IsEnum(ReportCategory)
  category: ReportCategory;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  specificLocation?: string;

  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;

  @IsOptional()
  @IsString()
  photoUrl?: string;
}
