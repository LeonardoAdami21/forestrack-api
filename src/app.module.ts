import { Module } from '@nestjs/common';
import { EquipmentModule } from './equipment/equipment.module';
import { ConfigModule } from '@nestjs/config';
import { EquipmentModelModule } from './equipment-model/equipment-model.module';
import { EquipmentStateModule } from './equipment-state/equipment-state.module';
import { EquipmentStateHistoryModule } from './equipment-state-history/equipment-state-history.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),EquipmentModule, EquipmentModelModule, EquipmentStateModule, EquipmentStateHistoryModule],
})
export class AppModule {}
