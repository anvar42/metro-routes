import { PrismaClient } from "@prisma/client";
import { allRoutesData, allTransfersData } from "./mock/mock.data";

const prisma = new PrismaClient();

async function main() {
  const stationMap = new Map<string, string>();

  for (const routeData of allRoutesData) {
    const createdRoute = await prisma.metroRoute.create({
      data: {
        name: routeData.name_uz,
        translation: {
          createMany: {
            data: [
              { name: routeData.name_uz, lang: "uz" },
              { name: routeData.name_ru, lang: "ru" },
            ],
          },
        },
      },
    });

    for (const [index, stationData] of routeData.stations.entries()) {
      const createdStation = await prisma.station.create({
        data: {
          metro_route_id: createdRoute.id,
          isTransfer: stationData.isTransfer,
          station_order: index,
          translation: {
            createMany: {
              data: [
                { name: stationData.name_uz, lang: "uz" },
                { name: stationData.name_ru, lang: "ru" },
              ],
            },
          },
        },
      });
      stationMap.set(stationData.name_uz, createdStation.id);
    }
  }

  for (const transfer of allTransfersData) {
    const fromId = stationMap.get(transfer.from_uz);
    const toId = stationMap.get(transfer.to_uz);

    if (fromId && toId) {
      await prisma.transfers.create({
        data: {
          from_station_id: fromId,
          to_station_id: toId,
        },
      });
    
      await prisma.transfers.create({
        data: {
          from_station_id: toId,
          to_station_id: fromId,
        },
      });
    }
  }

  console.log("Successfully completed seed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });