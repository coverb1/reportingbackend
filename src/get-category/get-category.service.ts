import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import { ReportCategory } from '@prisma/client';

@Injectable()
export class GetCategoryService{
findAll(){
    return Object.values(ReportCategory)
}
}
