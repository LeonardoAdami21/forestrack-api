import { Module } from '@nestjs/common';
import { EquipmentModelService } from './equipment-model.service';
import { EquipmentModelController } from './equipment-model.controller';
import { PrismaModule } from '../config/prisma.module';
import { equipmentModelProviders } from './provider/equipment-model.provider';

@Module({
  imports: [PrismaModule],
  controllers: [EquipmentModelController],
  providers: [EquipmentModelService, ...equipmentModelProviders],
})
export class EquipmentModelModule {}
