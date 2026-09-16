import { Controller, Get, Param } from '@nestjs/common';
import { LocationService } from './location.service.js';

@Controller('location')
export class LocationController {
    constructor(private readonly locationservice:LocationService){}

@Get('districts')
getDistricts(){
    return this.locationservice.getDistrict();
}

@Get('districts/:districtId/sectors')
getCellSector(@Param('districtId')sectorId:string){
    return this.locationservice.getSectorByDistrict(sectorId)
}

@Get('sectors/:sectorId/cells')
getCellsBySector(@Param('sectorId') sectorId: string) {
  return this.locationservice.getCellBysector(sectorId);
}

@Get('cells/:cellId/villages')
getVillagebycell(@Param('cellId') cellId:string){
    return this.locationservice.getVillagesbyCell(cellId)
}

}
