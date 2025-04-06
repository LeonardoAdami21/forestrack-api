import { PrismaClient } from '@prisma/client';

import { DATA_SOURCE } from '../../config/data.source';
import { IProvider } from '../../interface/IProvide';

export const EQUIPMENT__REPOSITORY = 'EQUIPMENT__REPOSITORY';

export const equipmentProviders: IProvider<PrismaClient['equipment']>[] = [
  {
    provide: EQUIPMENT__REPOSITORY,
    useFactory: (prisma: PrismaClient) => prisma.equipment,
    inject: [DATA_SOURCE],
  },
];
