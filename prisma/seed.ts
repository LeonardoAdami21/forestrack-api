import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Equipment States
  const operating = await prisma.equipmentState.create({
    data: { id: '0808344c-454b-4c36-89e8-d7687e692d57', name: 'Operando' },
  });

  const stopped = await prisma.equipmentState.create({
    data: { id: 'baff9783-84e8-4e01-874b-6fd743b875ad', name: 'Parado' },
  });

  const maintenance = await prisma.equipmentState.create({
    data: { id: '03b2d446-e3ba-4c82-8dc2-a5611fea6e1f', name: 'Manutenção' },
  });

  // Equipment Models
  const truckModel = await prisma.equipmentModel.create({
    data: {
      id: 'a3540227-2f0e-4362-9517-92f41dabbfdf',
      name: 'Caminhão de carga',
      hourlyEarnings: {
        create: [
          { equipmentStateId: operating.id, value: 100 },
          { equipmentStateId: stopped.id, value: -5 },
          { equipmentStateId: maintenance.id, value: -20 },
        ],
      },
    },
  });

  const harvesterModel = await prisma.equipmentModel.create({
    data: {
      id: 'a4b0c114-acd8-4151-9449-7d12ab9bf40f',
      name: 'Harvester',
      hourlyEarnings: {
        create: [
          { equipmentStateId: operating.id, value: 200 },
          { equipmentStateId: stopped.id, value: -10 },
          { equipmentStateId: maintenance.id, value: -50 },
        ],
      },
    },
  });

  const garraModel = await prisma.equipmentModel.create({
    data: {
      id: '9c3d009e-0d42-4a6e-9036-193e9bca3199',
      name: 'Garra traçadora',
      hourlyEarnings: {
        create: [
          { equipmentStateId: operating.id, value: 70 },
          { equipmentStateId: stopped.id, value: 0 },
          { equipmentStateId: maintenance.id, value: -10 },
        ],
      },
    },
  });

  // Equipamentos
  const equipments = await prisma.equipment.createMany({
    data: [
      {
        id: 'a7c53eb1-4f5e-4eba-9764-ad205d0891f9',
        name: 'CA-0001',
        equipmentModelId: truckModel.id,
      },
      {
        id: '1c7e9615-cc1c-4d72-8496-190fe5791c8b',
        name: 'CA-0002',
        equipmentModelId: truckModel.id,
      },
      {
        id: '2b5796cb-21c1-480e-8886-4498ea593a65',
        name: 'CA-0003',
        equipmentModelId: truckModel.id,
      },
      {
        id: '1d222cdc-01dd-4caa-8934-5351d3995cfb',
        name: 'CA-0004',
        equipmentModelId: truckModel.id,
      },

      {
        id: '491b983b-950c-4a88-942d-487e99b92540',
        name: 'HV-1001',
        equipmentModelId: harvesterModel.id,
      },
      {
        id: '39317fcb-79e7-4e7e-83dc-723a9b63633c',
        name: 'HV-1002',
        equipmentModelId: harvesterModel.id,
      },

      {
        id: 'c79ef1de-92f3-4edd-bd55-553056640449',
        name: 'GT-2001',
        equipmentModelId: garraModel.id,
      },
      {
        id: 'b7aaba00-13f7-44a0-8bf1-bc163afcf9d8',
        name: 'GT-2002',
        equipmentModelId: garraModel.id,
      },
      {
        id: 'fe2a2e11-bfa6-46b6-990b-fd8175946b7e',
        name: 'GT-2003',
        equipmentModelId: garraModel.id,
      },
    ],
  });

  // Estado e posição iniciais
  const initialDate = new Date('2024-01-01T08:00:00.000Z');

  const allEquipments = await prisma.equipment.findMany();

  for (let i = 0; i < allEquipments.length; i++) {
    const eq = allEquipments[i];

    await prisma.equipmentStateHistory.create({
      data: {
        equipmentId: eq.id,
        equipmentStateId: operating.id,
        date: initialDate,
      },
    });

    await prisma.equipmentPositionHistory.create({
      data: {
        equipmentId: eq.id,
        lat: -23.5 + i * 0.01,
        lon: -46.6 + i * 0.01,
        date: initialDate,
      },
    });
  }

  console.log('Seed finalizado com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
