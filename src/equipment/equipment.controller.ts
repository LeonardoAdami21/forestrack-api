import { Controller, Get, Param, Query } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger';
import { FilterEquipmentDto } from './dto/filter-equipment.dto';

@Controller('equipment')
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) {}

  @ApiOperation({ summary: 'All equipment' })
  @ApiOkResponse({ description: 'Get all equipment' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get()
  findAll(@Query() filters?: FilterEquipmentDto) {
    const formattedLocale = filters?.includeLocation
      ? { includeLocation: true }
      : { includeLocation: false };
    return this.equipmentService.findAll({
      ...filters,
      ...formattedLocale,
    });
  }

  @ApiOperation({ summary: 'Find equipment by id' })
  @ApiOkResponse({ description: 'Get equipment by id' })
  @ApiNotFoundResponse({ description: 'Equipment not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.equipmentService.findOne(id);
  }

  @ApiOperation({ summary: 'Find equipment by equipment model id' })
  @ApiOkResponse({ description: 'Get equipment by equipment model id' })
  @ApiNotFoundResponse({ description: 'Equipment not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get(':equipmentModelId')
  findByEquipmentModelId(@Param('equipmentModelId') equipmentModelId: string) {
    return this.equipmentService.findByEquipmentModelId(equipmentModelId);
  }
}
