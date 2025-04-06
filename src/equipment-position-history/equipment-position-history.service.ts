import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EQUIPMENT__POSITION__HISTORY__REPOSITORY } from './provider/equipment-position-history.provider';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class EquipmentPositionHistoryService {
  constructor(
    @Inject(EQUIPMENT__POSITION__HISTORY__REPOSITORY)
    private readonly equipmentPositionHistoryRepository: PrismaClient['equipmentPositionHistory'],
  ) {}

  async findAll() {
    return await this.equipmentPositionHistoryRepository.findMany({
      include: {
        equipment: true,
      },
    });
  }

  async findOne(id: string) {
    const equipmentPositionHistory =
      await this.equipmentPositionHistoryRepository.findUnique({
        where: { id },
        include: {
          equipment: true,
        },
      });
    if (!equipmentPositionHistory) {
      throw new NotFoundException('Equipment position history not found');
    }
    return equipmentPositionHistory;
  }
}
