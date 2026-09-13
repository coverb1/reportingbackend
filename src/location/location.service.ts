import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';

@Injectable()
export class LocationService {
    constructor(private readonly prisma:PrismaService){}

async getDistrict (){
    return this.prisma.district.findMany({
        orderBy:{
            name:'asc'
        },
        select:{
            id:true,
            name:true
        },
    });
}

async getSectorByDistrict(districtId:string){
    return this.prisma.sectors.findMany({
        where:{
            districtId
        },
        select:{
            id:true,
            name:true
        }
    })
}

async getCellBysector(sectorId:string){
    return this.prisma.cell.findMany({
        where:{
            SectorId:sectorId
        },
        orderBy:{
            name:'asc'
        },
        select:{
            id:true,
            name:true
        }
    })
}

async getVillagesbyCell(cellId:string){
    return this.prisma.village.findMany({
        where:{
            cellId
        },
        orderBy:{
            name:'asc'
        },
        select:{
            id:true,
            name:true
        }
    })
}

}
