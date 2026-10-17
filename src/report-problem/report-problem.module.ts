
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { ReportProblemService } from './report-problem.service.js';
import { ReportProblemController } from './report-problem.controller.js';
import { PrismaService } from '../prisma.service.js';

import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    JwtModule.register({}),
    PassportModule.register({}),
  ],
  controllers: [ReportProblemController],
  providers: [
    ReportProblemService,
    PrismaService,

  ],
})
export class ReportProblemModule {}

// jwtAuthGuard checks if a user has a valid login token.
// PassportModule helps NestJS work with Passport.
// Passport helps your NestJS application check who a user is.
