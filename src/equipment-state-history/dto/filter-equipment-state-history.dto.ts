import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsDateString } from 'class-validator';

export class FilterEquipmentStateHistoryDto {
  @IsOptional()
  @ApiProperty({ required: false, description: 'Id of the equipment' })
  @IsString()
  equipmentStateId?: string;

  @IsOptional()
  @ApiProperty({ required: false, description: 'From date' })
  @IsDateString()
  from?: string;

  @IsOptional()
  @ApiProperty({ required: false, description: 'To date' })
  @IsDateString()
  to?: string;
}
