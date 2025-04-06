import { Module } from '@nestjs/common';
import { EquipmentModule } from './equipment/equipment.module';
import { ConfigModule } from '@nestjs/config';
import { EquipmentModelModule } from './equipment-model/equipment-model.module';
import { EquipmentStateModule } from './equipment-state/equipment-state.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),EquipmentModule, EquipmentModelModule, EquipmentStateModule],
})
export class AppModule {}
