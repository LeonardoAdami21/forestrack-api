import { PrismaClient } from '@prisma/client';

import { DATA_SOURCE } from '../../config/data.source';
import { IProvider } from '../../interface/IProvide';

export const EQUIPMENT__STATE__HISTORY__REPOSITORY =
  'EQUIPMENTSTATE__REPOSITORY';

export const equipmentStateHistoryProviders: IProvider<
  PrismaClient['equipmentStateHistory']
>[] = [
  {
    provide: EQUIPMENT__STATE__HISTORY__REPOSITORY,
    useFactory: (prisma: PrismaClient) => prisma.equipmentStateHistory,
    inject: [DATA_SOURCE],
  },
];
