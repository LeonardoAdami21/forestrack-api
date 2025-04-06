import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EQUIPMENTMODEL__REPOSITORY } from './provider/equipment-model.provider';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class EquipmentModelService {
  constructor(
    @Inject(EQUIPMENTMODEL__REPOSITORY)
    private readonly equipmentModelRepository: PrismaClient['equipmentModel'],
  ) {}

  async findAll() {
    return await this.equipmentModelRepository.findMany({
      include: {
        equipments: true,
        hourlyEarnings: true,
      },
    });
  }

  async findOne(id: string) {
    const equipmentModel = await this.equipmentModelRepository.findUnique({
      where: { id },
    });
    if (!equipmentModel) {
      throw new NotFoundException('Equipment model not found');
    }
    return equipmentModel;
  }
  
}
