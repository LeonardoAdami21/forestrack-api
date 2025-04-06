import { PrismaClient } from '@prisma/client';

import { DATA_SOURCE } from '../../config/data.source';
import { IProvider } from '../../interface/IProvide';

export const EQUIPMENTMODEL__REPOSITORY = 'EQUIPMENTMODEL__REPOSITORY';

export const equipmentModelProviders: IProvider<PrismaClient['equipmentModel']>[] = [
  {
    provide: EQUIPMENTMODEL__REPOSITORY,
    useFactory: (prisma: PrismaClient) => prisma.equipmentModel,
    inject: [DATA_SOURCE],
  },
];
