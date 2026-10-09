import { Injectable } from '@nestjs/common';
import { CreateReportProblemDto } from './dto/create-report-problem.dto.js';
import { UpdateReportProblemDto } from './dto/update-report-problem.dto.js';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service.js';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class ReportProblemService {
  constructor(
     private jwtservice: JwtService,
        private prisma: PrismaService,
        private mailerservice: MailerService,
  ) {
   

    //send report
   
  }

}
