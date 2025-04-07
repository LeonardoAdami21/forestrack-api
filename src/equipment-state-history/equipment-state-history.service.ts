import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EQUIPMENT__STATE__HISTORY__REPOSITORY } from './provider/equipment-state-history.provider';
import { PrismaClient } from '@prisma/client';
import { FilterEquipmentStateHistoryDto } from './dto/filter-equipment-state-history.dto';

@Injectable()
export class EquipmentStateHistoryService {
  constructor(
    @Inject(EQUIPMENT__STATE__HISTORY__REPOSITORY)
    private readonly equipmentStateHistoryRepository: PrismaClient['equipmentStateHistory'],
  ) {}

  async findAll(filter?: FilterEquipmentStateHistoryDto) {
    const equipmentStateHistory = await this.equipmentStateHistoryRepository.findMany({
      where: {
        equipmentStateId: filter.equipmentStateId || undefined,
        date: {
          gte: filter.from ? new Date(filter.from) : undefined,
          lte: filter.to ? new Date(filter.to) : undefined,
        },
      },
      include: {
        state: true,
        equipment: true,
      },
    });
    return equipmentStateHistory;
  }

  async findOne(id: string) {
    const equipmentStateHistory =
      await this.equipmentStateHistoryRepository.findUnique({
        where: { id },
        include: {
          equipment: true,
          state: true,
        },
      });
    if (!equipmentStateHistory) {
      throw new NotFoundException('Equipment state history not found');
    }
    return equipmentStateHistory;
  }
}
