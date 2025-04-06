import { Module } from '@nestjs/common';
import { EquipmentStateHistoryService } from './equipment-state-history.service';
import { EquipmentStateHistoryController } from './equipment-state-history.controller';
import { PrismaModule } from '../config/prisma.module';
import { equipmentStateHistoryProviders } from './provider/equipment-state-history.provider';

@Module({
  imports: [PrismaModule],
  controllers: [EquipmentStateHistoryController],
  providers: [EquipmentStateHistoryService, ...equipmentStateHistoryProviders],
})
export class EquipmentStateHistoryModule {}
