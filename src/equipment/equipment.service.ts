import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EQUIPMENT__REPOSITORY } from './provider/equipment.provider';
import { PrismaClient } from '@prisma/client';
import { FilterEquipmentDto } from './dto/filter-equipment.dto';

@Injectable()
export class EquipmentService {
  constructor(
    @Inject(EQUIPMENT__REPOSITORY)
    private readonly equipmentRepository: PrismaClient['equipment'],
  ) {}

  async findAll(flters?: FilterEquipmentDto) {
    const { name, equipmentModelId, currentStateId, includeLocation } =
      flters || {};
    if (name && typeof name !== 'string') {
      throw new BadRequestException('Name must be a string');
    }
    const equipments = await this.equipmentRepository.findMany({
      where: {
        name: name ? { contains: name } : undefined,
        equipmentModelId: equipmentModelId || undefined,
      },
      include: {
        equipmentModel: true,
        positionHistory: includeLocation,
        stateHistories: currentStateId
          ? {
              where: { equipmentStateId: currentStateId },
              orderBy: { date: 'desc' },
              take: 1,
            }
          : false,
      },
    });
    return equipments;
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
