import { Controller, Get } from '@nestjs/common';
import { EquipmentStateService } from './equipment-state.service';
import { ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller('equipment-state')
export class EquipmentStateController {
  constructor(private readonly equipmentStateService: EquipmentStateService) {}

  @ApiOperation ({ summary: 'Get all equipment states' })
  @ApiOkResponse({
    description: 'List of equipment states',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Get()
  findAll() {
    return this.equipmentStateService.findAll();
  }

  @ApiOperation({ summary: 'Get equipment state by id' })
  @ApiOkResponse({
    description: 'Equipment state found',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Get(':id')
  findOne(id: string) {
    return this.equipmentStateService.findOne(id);
  }
}
