import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EQUIPMENTSTATE__REPOSITORY } from './provider/equipment-state.provider';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class EquipmentStateService {
  constructor(
    @Inject(EQUIPMENTSTATE__REPOSITORY)
    private readonly equipmentStateRepository: PrismaClient['equipmentState'],
  ) {}

  async findAll() {
    return await this.equipmentStateRepository.findMany({
      include: {
        histories: true,
        hourlyEarnings: true,
      },
    });
  }

  async findOne(id: string) {
    const equipmentState = await this.equipmentStateRepository.findUnique({
      where: { id },
    });
    if (!equipmentState) {
      throw new NotFoundException('Equipment state not found');
    }
    return equipmentState;
  }
}
