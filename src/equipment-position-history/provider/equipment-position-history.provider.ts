import { PrismaClient } from '@prisma/client';

import { DATA_SOURCE } from '../../config/data.source';
import { IProvider } from '../../interface/IProvide';

export const EQUIPMENT__POSITION__HISTORY__REPOSITORY =
  'EQUIPMENT__POSITION__HISTORY__REPOSITORY';

export const equipmentPositionHistoryProviders: IProvider<
  PrismaClient['equipmentPositionHistory']
>[] = [
  {
    provide: EQUIPMENT__POSITION__HISTORY__REPOSITORY,
    useFactory: (prisma: PrismaClient) => prisma.equipmentPositionHistory,
    inject: [DATA_SOURCE],
  },
];
