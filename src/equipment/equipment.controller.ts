import { Controller, Get, Param } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

@Controller('equipment')
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) {}

  @ApiOperation({ summary: 'All equipment' })
  @ApiOkResponse({ description: 'Get all equipment' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get()
  findAll() {
    return this.equipmentService.findAll();
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
