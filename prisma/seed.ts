import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';


const adapter=new PrismaPg({
connectionString:process.env.DATABASE_URL
});

const prisma=new PrismaClient({
  adapter
})



async function main() {
  const gasabo = await prisma.district.upsert({
    where: {
      name: 'Gasabo',
    },
    update: {},
    create: {
      name: 'Gasabo',
    },
  });
  const sectors = [
    'Bumbogo',
    'Gatsata',
    'Gikomero',
    'Gisozi',
    'Jabana',
    'Jali',
    'Kacyiru',
    'Kimihurura',
    'Kimironko',
    'Kinyinya',
    'Ndera',
    'Nduba',
    'Remera',
    'Rusororo',
    'Rutunga',
  ];

  const sectorRecords: Record<string,any> = {}; //This creates an empty object.

  for (const sectorName of sectors) {
    const sector = await prisma.sectors.upsert({
      where: {
        name_districtId: {
          name: sectorName,
          districtId: gasabo.id,
        },
      },
      update: {},
      create: {
        name: sectorName,
        districtId: gasabo.id,
      },
    });

    sectorRecords[sectorName] = sector;

    console.log(` Sector: ${sectorName}`);
  }

  const locations = [
    {
      sector: 'Bumbogo',
      cells: [
        {
          name: 'Kinyaga',
          villages: ['Kinyaga'],
        },
        {
          name: 'Nkuzuzu',
          villages: ['Nkuzuzu'],
        },
        {
          name: 'Nyabikenke',
          villages: ['Nyabikenke'],
        },
        {
          name: 'Musave',
          villages: ['Rugando'],
        },
        {
          name: 'Nyagasozi',
          villages: ['Nyagasozi'],
        },
        {
          name: 'Ngara',
          villages: ['Ngara'],
        },
        {
          name: 'Mvuzo',
          villages: ['Mvuzo'],
        },
      ],
    },

    {
      sector: 'Gatsata',
      cells: [
        {
          name: 'Nyamabuye',
          villages: ['Nyamabuye'],
        },
        {
          name: 'Nyamugari',
          villages: ['Nyamugari'],
        },
        {
          name: 'Karuruma',
          villages: ['Karuruma'],
        },
      ],
    },

    {
      sector: 'Ndera',
      cells: [
        {
          name: 'Bwiza',
          villages: ['Ruhangare'],
        },
      ],
    },

    {
      sector: 'Nduba',
      cells: [
        {
          name: 'Gasange',
          villages: ['Kagarama'],
        },
      ],
    },

    {
      sector: 'Rusororo',
      cells: [
        {
          name: 'Gasagara',
          villages: ['Ryabazana'],
        },
      ],
    },
  ];

  for (const location of locations) {
    const sector = sectorRecords[location.sector];

    for (const cellData of location.cells) {
      const cell = await prisma.cell.upsert({
        where: {
          name_SectorId: {
            name: cellData.name,
            SectorId: sector.id,
          },
        },
        update: {},
        create: {
          name: cellData.name,
          SectorId: sector.id,
        },
      });

      console.log(
        `Cell: ${cellData.name} (${location.sector})`,
      );

      for (const villageName of cellData.villages) {
        await prisma.village.upsert({
          where: {
            name_cellId: {
              name: villageName,
              cellId: cell.id,
            },
          },
          update: {},
          create: {
            name: villageName,
            cellId: cell.id,
          },
        });

        console.log(`Village: ${villageName}`);
      }
    }
  }

  const hashedPassword = await bcrypt.hash('Admin@12345', 10);
  const admin = await prisma.user.upsert({
    where: {
      email: 'admin@civicreporting.com',
    },
    update: {},
    create: {
      name: 'System Administrator',
      email: 'admin@civicreporting.com',
      password: hashedPassword,
      role: Role.SUPER_ADMIN,
    },
  });

  console.log(`Super Admin: ${admin.email}`);

  const village = await prisma.village.findFirst({
    where: {
      name: 'Ruhangare',
    },
  });

  if (village) {
    const citizenPassword = await bcrypt.hash('Citizen@12345', 10);

    const citizen = await prisma.user.upsert({
      where: {
        email: 'citizen@civicreporting.com',
      },
      update: {},
      create: {
        name: 'Test Citizen',
        email: 'citizen@civicreporting.com',
        password: citizenPassword,
        role: Role.CITIZEN,
        villageId: village.id,
      },
    });

    console.log(`Test Citizen: ${citizen.email}`);
  }

  console.log('Database seed completed successfully!');
}

main()
.catch((error) => {console.error('Seed failed:', error);process.exit(1);}).finally(async () => {await prisma.$disconnect();});