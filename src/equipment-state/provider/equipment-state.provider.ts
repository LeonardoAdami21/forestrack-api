import { PrismaClient } from '@prisma/client';

import { DATA_SOURCE } from '../../config/data.source';
import { IProvider } from '../../interface/IProvide';

export const EQUIPMENTSTATE__REPOSITORY = 'EQUIPMENTSTATE__REPOSITORY';

export const equipmentStateProviders: IProvider<
  PrismaClient['equipmentState']
>[] = [
  {
    provide: EQUIPMENTSTATE__REPOSITORY,
    useFactory: (prisma: PrismaClient) => prisma.equipmentState,
    inject: [DATA_SOURCE],
  },
];
