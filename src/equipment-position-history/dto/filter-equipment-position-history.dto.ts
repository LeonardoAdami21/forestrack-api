import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsDateString, IsNumber } from 'class-validator';

export class FilterEquipmentPositionHistoryDto {
  @IsOptional()
  @ApiProperty({
    required: false,
    description: 'From date',
    type: 'string',
    format: 'date-time',
    example: '2023-10-01T00:00:00Z',
  })
  from?: string;

  @IsOptional()
  @ApiProperty({
    required: false,
    description: 'To date',
    type: 'string',
    format: 'date-time',
    example: '2023-10-01T00:00:00Z',
  })
  to?: string;

  @IsOptional()
  @ApiProperty({ required: false, description: 'Latitude min', example: -90 })
  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
    maxDecimalPlaces: 6,
  })
  latMin?: number;

  @IsOptional()
  @ApiProperty({ required: false, description: 'Latitude max', example: -46 })
  @IsNumber()
  latMax?: number;

  @IsOptional()
  @ApiProperty({ required: false, description: 'Longitude min', example: -180 })
  @IsNumber()
  lonMin?: number;

  @IsOptional()
  @ApiProperty({ required: false, description: 'Longitude max', example: 180 })
  @IsNumber()
  lonMax?: number;
}
