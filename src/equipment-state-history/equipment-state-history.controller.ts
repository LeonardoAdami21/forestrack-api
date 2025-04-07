import { Controller, Get, Query } from '@nestjs/common';
import { EquipmentStateHistoryService } from './equipment-state-history.service';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger';
import { FilterEquipmentStateHistoryDto } from './dto/filter-equipment-state-history.dto';

@Controller('equipment-state-history')
export class EquipmentStateHistoryController {
  constructor(
    private readonly equipmentStateHistoryService: EquipmentStateHistoryService,
  ) {}

  @ApiOperation({ summary: 'Get all equipment state history records' })
  @ApiOkResponse({ description: 'List of equipment state history records' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get()
  findAll(@Query() filters?: FilterEquipmentStateHistoryDto) {
    const formattedFromDate = filters.from
      ? new Date(filters.from).toDateString()
      : undefined;
    const formattedToDate = filters.to
      ? new Date(filters.to).toDateString()
      : undefined;
    return this.equipmentStateHistoryService.findAll({
      from: formattedFromDate,
      to: formattedToDate,
      equipmentStateId: filters.equipmentStateId,
    });
  }

  @ApiOperation({ summary: 'Get equipment state history record by id' })
  @ApiOkResponse({ description: 'Equipment state history record found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get(':id')
  findOne(id: string) {
    return this.equipmentStateHistoryService.findOne(id);
  }
}
