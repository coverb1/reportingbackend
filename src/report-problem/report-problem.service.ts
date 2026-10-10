import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
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
  ){}
   async Myreport(userId:string,dto:CreateReportProblemDto){
    //here we ar finding loggedIn user
    const citizen=await this.prisma.user.findUnique(
      {
        where:{id:userId}
      }
    )

    if (!citizen) {
throw new UnauthorizedException("Citizen Not Found")
    }

if (!citizen.districtId ||citizen.sectorId|| citizen.cellId|| !citizen.villageId) {
  throw new BadRequestException(
    'Please complete your location before submitting a report',
  )
}

// 3. Create the report// 3. Create the report
const report = await this.prisma.report.create({
      data: {
        title: dto.title,
        description: dto.description,
        category: dto.category,
        specificLocation: dto.specificLocation,
        isPublic: dto.isPublic ?? true,
        photoUrl: dto.photoUrl,

        // Get the citizen's identity and location from the database
        citizenId: citizen.id,
        districtId: citizen.districtId,
        sectorId: citizen.sectorId,
        cellId: citizen.cellId,
        villageId: citizen.villageId,

        // Initial priority
        priority: 'MEDIUM',
      },
    });
   }
}
