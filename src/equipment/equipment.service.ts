import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EQUIPMENT__REPOSITORY } from './provider/equipment.provider';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class EquipmentService {
  constructor(
    @Inject(EQUIPMENT__REPOSITORY)
    private readonly equipmentRepository: PrismaClient['equipment'],
  ) {}

  async findAll() {
    return this.equipmentRepository.findMany({
      include: {
        equipmentModel: true,
        stateHistories: true,
        positionHistory: true,
      },
    });
  }

  async findOne(id: string) {
    const equipment = await this.equipmentRepository.findUnique({
      where: { id },
    });
    if (!equipment) {
      throw new NotFoundException('Equipment not found');
    }
    return equipment;
  }

  async findByEquipmentModelId(equipmentModelId: string) {
    const equipment = await this.equipmentRepository.findMany({
      where: { equipmentModelId },
    });
    if (!equipment) {
      throw new NotFoundException('Equipment not found');
    }
    return equipment;
  }
}
