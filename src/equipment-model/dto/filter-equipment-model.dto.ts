import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class FilterEquipmentModelDto {
  @IsOptional()
  @ApiProperty({ required: false, description: 'Name of the equipment' })
  @IsString()
  name?: string;

}
