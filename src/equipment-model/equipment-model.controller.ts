import { Controller, Get } from '@nestjs/common';
import { EquipmentModelService } from './equipment-model.service';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

@Controller('equipment-model')
export class EquipmentModelController {
  constructor(private readonly equipmentModelService: EquipmentModelService) {}

  @ApiOperation({ summary: 'Get all equipment models' })
  @ApiOkResponse({
    description: 'List of equipment models',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Get()
  findAll() {
    return this.equipmentModelService.findAll();
  }

  @ApiOperation({ summary: 'Get equipment model by id' })
  @ApiOkResponse({
    description: 'Equipment model found',
  })
  @ApiNotFoundResponse({
    description: 'Equipment model not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Get(':id')
  findOne(id: string) {
    return this.equipmentModelService.findOne(id);
  }
}
