
import {Controller,Post,Body,UseGuards,UseInterceptors,UploadedFile,BadRequestException,} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { randomUUID } from 'crypto';

import { ReportProblemService } from './report-problem.service.js';
import { CreateReportProblemDto } from './dto/create-report-problem.dto.js';
import { currentUser } from '../auth/me/current-user.decorator.js';
import { jwtAuthGuard } from '../auth/jwt-guard.js';

@Controller('report-problem')
export class ReportProblemController {
  constructor(
    private readonly reportProblemService: ReportProblemService,
  ) {}

  @UseGuards(jwtAuthGuard)
  @Post('/ReportProblem')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueName = randomUUID() + extname(file.originalname);
          callback(null, uniqueName);
        },
      }),
      limits: {
        fileSize: 5 * 1024 * 1024,
      },
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.startsWith('image/')) {
          return callback(
            new BadRequestException('Only image files are allowed'),
            false,
          );
        }

        callback(null, true);
      },
    }),
  )
  Myreport(
    @Body() createReportProblemDto: CreateReportProblemDto,
    @UploadedFile() file: Express.Multer.File,
    @currentUser() user: { userId: string },
  ) {
    return this.reportProblemService.Myreport(
      user.userId,
      createReportProblemDto,
      file,
    );
  }
}
