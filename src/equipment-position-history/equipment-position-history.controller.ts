import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { EquipmentPositionHistoryService } from './equipment-position-history.service';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger';
import { FilterEquipmentPositionHistoryDto } from './dto/filter-equipment-position-history.dto';

@Controller('equipment-position-history')
export class EquipmentPositionHistoryController {
  constructor(
    private readonly equipmentPositionHistoryService: EquipmentPositionHistoryService,
  ) {}

  @ApiOperation({ summary: 'Get all equipment position history records' })
  @ApiOkResponse({ description: 'List of equipment position history records' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get()
  findAll(@Query() filters?: FilterEquipmentPositionHistoryDto) {
    const fromDate = filters.from
      ? new Date(filters.from).toDateString()
      : undefined;
    const toDate = filters.to ? new Date(filters.to).toDateString() : undefined;
    if (fromDate && toDate && fromDate > toDate) {
      throw new BadRequestException('From date must be before to date');
    }

    const parseCoord = (
      value: string | number | undefined,
    ): number | undefined => {
      if (value === undefined || value === null) return undefined;

      const stringValue = value.toString().replace(',', '.');
      const numberValue = Number(stringValue);

      return isNaN(numberValue) ? undefined : numberValue;
    };

    const formattedMinLat = parseCoord(filters.latMin);
    const formattedMaxLat = parseCoord(filters.latMax);
    const formattedMinLon = parseCoord(filters.lonMin);
    const formattedMaxLon = parseCoord(filters.lonMax);
    if (
      (filters.latMin && !formattedMinLat) ||
      (filters.latMax && !formattedMaxLat) ||
      (filters.lonMin && !formattedMinLon) ||
      (filters.lonMax && !formattedMaxLon)
    ) {
      throw new BadRequestException(
        'Latitude and longitude values must be numbers',
      );
    }
    return this.equipmentPositionHistoryService.findAll({
      from: fromDate,
      to: toDate,
      latMin: formattedMinLat,
      latMax: formattedMaxLat,
      lonMin: formattedMinLon,
      lonMax: formattedMaxLon,
    });
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
