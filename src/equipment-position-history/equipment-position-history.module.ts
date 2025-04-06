import { Module } from '@nestjs/common';
import { EquipmentPositionHistoryService } from './equipment-position-history.service';
import { EquipmentPositionHistoryController } from './equipment-position-history.controller';
import { PrismaModule } from '../config/prisma.module';
import { equipmentPositionHistoryProviders } from './provider/equipment-position-history.provider';

@Module({
  imports: [PrismaModule],
  controllers: [EquipmentPositionHistoryController],
  providers: [
    EquipmentPositionHistoryService,
    ...equipmentPositionHistoryProviders,
  ],
})
export class EquipmentPositionHistoryModule {}
