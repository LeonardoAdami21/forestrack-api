import { Controller, Get } from '@nestjs/common';
import { EquipmentPositionHistoryService } from './equipment-position-history.service';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

@Controller('equipment-position-history')
export class EquipmentPositionHistoryController {
  constructor(
    private readonly equipmentPositionHistoryService: EquipmentPositionHistoryService,
  ) {}

  @ApiOperation({ summary: 'Get all equipment position history records' })
  @ApiOkResponse({ description: 'List of equipment position history records' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get()
  findAll() {
    return this.equipmentPositionHistoryService.findAll();
  }

  @ApiOperation({ summary: 'Get equipment position history record by id' })
  @ApiOkResponse({ description: 'Equipment position history record found' })
  @ApiNotFoundResponse({
    description: 'Equipment position history record not found',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get(':id')
  findOne(id: string) {
    return this.equipmentPositionHistoryService.findOne(id);
  }
}
