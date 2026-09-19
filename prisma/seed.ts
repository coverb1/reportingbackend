import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter, });


const districtData = [
  {
    name: 'Gasabo',

    sectors: [
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
    ],
    locations: [
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
    ],
  },

  // 
  {
    name: 'Kicukiro',
    sectors: [
      'Gahanga',
      'Gatenga',
      'Gikondo',
      'Kagarama',
      'Kanombe',
      'Kicukiro',
      'Kigarama',
      'Masaka',
      'Niboye',
      'Nyarugunga',
    ],

    locations: [],
  },

  {
    name: 'Nyarugenge',

    sectors: [
      'Gitega',
      'Kanyinya',
      'Kigali',
      'Kimisagara',
      'Mageragere',
      'Muhima',
      'Nyakabanda',
      'Nyamirambo',
      'Nyarugenge',
      'Rwezamenyo',
    ],

    locations: [
      {
        sector: 'Kigali',

        cells: [
          {
            name: 'Kigali',
            villages: [],
          },
          {
            name: 'Mwendo',
            villages: [],
          },
          {
            name: 'Nyabugogo',
            villages: [],
          },
          {
            name: 'Ruriba',
            villages: [],
          },
          {
            name: 'Rwesero',
            villages: [],
          },
        ],
      },
      {
        sector: 'Kimisagara',

        cells: [
          {
            name: 'Kamuhoza',
            villages: [],
          },
          {
            name: 'Katabaro',
            villages: [],
          },
          {
            name: 'Kimisagara',
            villages: [],
          },
        ],
      },

      {
        sector: 'Mageragere',

        cells: [
          {
            name: 'Kankuba',
            villages: [],
          },
          {
            name: 'Kavumu',
            villages: [],
          },
          {
            name: 'Mataba',
            villages: [],
          },
          {
            name: 'Ntungamo',
            villages: [],
          },
          {
            name: 'Nyarufunzo',
            villages: [],
          },
          {
            name: 'Nyarurenzi',
            villages: [],
          },
          {
            name: 'Runzenze',
            villages: [],
          },
        ],
      },


      {
        sector: 'Muhima',

        cells: [
          {
            name: 'Amahoro',
            villages: [],
          },
          {
            name: 'Kabasengerezi',
            villages: [],
          },
          {
            name: 'Kabeza',
            villages: [],
          },
          {
            name: 'Nyabugogo',
            villages: [],
          },
          {
            name: 'Rugenge',
            villages: [],
          },
          {
            name: 'Tetero',
            villages: [],
          },
          {
            name: 'Ubumwe',
            villages: [],
          },
        ],
      },

      {
        sector: 'Nyakabanda',

        cells: [
          {
            name: 'Munanira I',
            villages: [],
          },
          {
            name: 'Munanira II',
            villages: [],
          },
          {
            name: 'Nyakabanda I',
            villages: [],
          },
          {
            name: 'Nyakabanda II',
            villages: [],
          },
        ],
      },
    ],
  },
];


async function main() {

  const districtRecords: Record<string, any> = {};


  for (const districtDataItem of districtData) {

    const district = await prisma.district.upsert({

      where: {
        name: districtDataItem.name,
      },

      update: {},

      create: {
        name: districtDataItem.name,
      },
    });


    districtRecords[districtDataItem.name] = district;


    console.log(`District: ${districtDataItem.name}`);

    const sectorRecords: Record<string, any> = {};


    for (const sectorName of districtDataItem.sectors) {

      const sector = await prisma.sectors.upsert({

        where: {
          name_districtId: {
            name: sectorName,
            districtId: district.id,
          },
        },

        update: {},

        create: {
          name: sectorName,
          districtId: district.id,
        },
      });


      sectorRecords[sectorName] = sector;


      console.log(
        `  Sector: ${sectorName}`,
      );
    }
    for (const location of districtDataItem.locations) {

      const sector = sectorRecords[location.sector];


      if (!sector) {

        console.log(
          `WARNING: Sector "${location.sector}" not found`,
        );

        continue;
      }


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
          `    Cell: ${cellData.name}`,
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


          console.log(
            `      Village: ${villageName}`,
          );
        }
      }
    }
  }


  console.log('');
  console.log('Creating Super Admin...');


  const hashedPassword = await bcrypt.hash(
    'Admin@12345',
    10,
  );


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


  console.log(
    `Super Admin: ${admin.email}`,
  );

  const village = await prisma.village.findFirst({

    where: {
      name: 'Ruhangare',
    },
  });


  if (village) {

    const citizenPassword = await bcrypt.hash(
      'Citizen@12345',
      10,
    );


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


    console.log(
      `Test Citizen: ${citizen.email}`,
    );

  } else {

    console.log(
      'Test Citizen village "Ruhangare" was not found.',
    );
  }

}


main()

  .catch((error) => {

    console.error('');
    console.error('Seed failed:');
    console.error(error);

    process.exit(1);
  })

  .finally(async () => {

    await prisma.$disconnect();
  });