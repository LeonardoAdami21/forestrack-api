import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class FilterEquipmentDto {
  @IsOptional()
  @ApiProperty({ required: false, description: 'Name of the equipment' })
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, description: 'Id of the equipment model' })
  equipmentModelId?: string;

  @IsOptional()
  @ApiProperty({ required: false, description: 'Id of the current state' })
  @IsString()
  currentStateId?: string;

  @IsOptional()
  @ApiProperty({ required: false, description: 'Include location if exists', type: Boolean })
  @IsBoolean()
  includeLocation?: boolean;
}
