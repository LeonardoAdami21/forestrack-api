import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EQUIPMENTMODEL__REPOSITORY } from './provider/equipment-model.provider';
import { PrismaClient } from '@prisma/client';
import { FilterEquipmentModelDto } from './dto/filter-equipment-model.dto';

@Injectable()
export class EquipmentModelService {
  constructor(
    @Inject(EQUIPMENTMODEL__REPOSITORY)
    private readonly equipmentModelRepository: PrismaClient['equipmentModel'],
  ) {}

  async findAll(filters?: FilterEquipmentModelDto) {
    const { name } = filters || {};
    if (name && typeof name !== 'string') {
      throw new BadRequestException('Name must be a string');
    }
    const equipmentModels = await this.equipmentModelRepository.findMany({
      where: {
        name: name ? { contains: name } : undefined,
      },
      include: {
        equipments: true,
      },
    });
    return equipmentModels;
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
