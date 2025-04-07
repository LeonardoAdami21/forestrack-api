import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EQUIPMENT__POSITION__HISTORY__REPOSITORY } from './provider/equipment-position-history.provider';
import { PrismaClient } from '@prisma/client';
import { FilterEquipmentPositionHistoryDto } from './dto/filter-equipment-position-history.dto';

@Injectable()
export class EquipmentPositionHistoryService {
  constructor(
    @Inject(EQUIPMENT__POSITION__HISTORY__REPOSITORY)
    private readonly equipmentPositionHistoryRepository: PrismaClient['equipmentPositionHistory'],
  ) {}

  async findAll(filter?: FilterEquipmentPositionHistoryDto) {
    const fromDate = filter.from ? new Date(filter.from) : undefined;
    const toDate = filter.to ? new Date(filter.to) : undefined;
    const equipmentPositionHistory =
      await this.equipmentPositionHistoryRepository.findMany({
        where: {
          date: {
            gte: fromDate,
            lte: toDate,
          },
          lat: {
            gte: filter.latMin ?? undefined,
            lte: filter.latMax ?? undefined,
          },
          lon: {
            gte: filter.lonMin ?? undefined,
            lte: filter.lonMax ?? undefined,
          },
        },
        include: {
          equipment: true,
        },
      });
    return equipmentPositionHistory;
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
