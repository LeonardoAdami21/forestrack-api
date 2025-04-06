import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EQUIPMENT__STATE__HISTORY__REPOSITORY } from './provider/equipment-state-history.provider';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class EquipmentStateHistoryService {
  constructor(
    @Inject(EQUIPMENT__STATE__HISTORY__REPOSITORY)
    private readonly equipmentStateHistoryRepository: PrismaClient['equipmentStateHistory'],
  ) {}

  async findAll() {
    return await this.equipmentStateHistoryRepository.findMany({
      include: {
        equipment: true,
        state: true,
      },
    });
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
