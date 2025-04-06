import { Controller, Get } from '@nestjs/common';
import { EquipmentStateHistoryService } from './equipment-state-history.service';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

@Controller('equipment-state-history')
export class EquipmentStateHistoryController {
  constructor(
    private readonly equipmentStateHistoryService: EquipmentStateHistoryService,
  ) {}

  @ApiOperation({ summary: 'Get all equipment state history records' })
  @ApiOkResponse({ description: 'List of equipment state history records' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get()
  findAll() {
    return this.equipmentStateHistoryService.findAll();
  }

  @ApiOperation({ summary: 'Get equipment state history record by id' })
  @ApiOkResponse({ description: 'Equipment state history record found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get(':id')
  findOne(id: string) {
    return this.equipmentStateHistoryService.findOne(id);
  }
}
