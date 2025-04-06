import { Module } from '@nestjs/common';
import { EquipmentStateService } from './equipment-state.service';
import { EquipmentStateController } from './equipment-state.controller';
import { PrismaModule } from '../config/prisma.module';
import { equipmentStateProviders } from './provider/equipment-state.provider';

@Module({
  imports: [PrismaModule],
  controllers: [EquipmentStateController],
  providers: [EquipmentStateService, ...equipmentStateProviders],
})
export class EquipmentStateModule {}
