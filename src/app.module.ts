import { Module } from '@nestjs/common';
import { EquipmentModule } from './equipment/equipment.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),EquipmentModule],
})
export class AppModule {}
