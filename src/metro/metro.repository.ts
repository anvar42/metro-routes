import { Injectable } from '@nestjs/common';
import { Language, PrismaService } from 'src/base';

@Injectable()
export class MetroRepository {
  constructor(private prisma: PrismaService) {}

  public async findAllStations(lang: Language = Language.UZ) {
    const routes = await this.prisma.metroRoute.findMany({
      include: {
        translation: {
          where: { lang },
        },
        stations: {
          include: {
            translation: {
              where: { lang },
            },
          },
          orderBy: {
            station_order: 'asc',
          },
        },
      },
    });

    return routes;
  }

  public async getStationsByIds(ids: string[], lang: Language) {
    return this.prisma.station.findMany({
        where: {
            id: {
                in: ids,
            },
        },
        include: {
            translation: {
                where: {
                    lang: lang,
                },
            },
            transferFrom: {
                include: {
                    toStation: {
                        include: {
                            translation: {
                                where: {
                                    lang: lang,
                                },
                            },
                        },
                    },
                },
            },
            transferTo: true,
        },
    });
}

  public async findStation(station_id: string, lang: Language) {
    return this.prisma.station.findUnique({
      where: { id: station_id },
      include: { translation: { where: { lang } } },
    });
  }

  public async getSameLineDirections(fromStationId: string, lang: Language) {
    const fromStation = await this.prisma.station.findUnique({
      where: { id: fromStationId },
      include: { metroRoute: true },
    });

    const stations = await this.prisma.station.findMany({
      where: { metro_route_id: fromStation?.metro_route_id },
      include: {
        translation: { where: { lang } },
        transferFrom: {
          include: {
            toStation: {
              include: {
                translation: { where: { lang } },
              },
            },
          },
        },
      },
      orderBy: { station_order: 'asc' },
    });

    return stations;
  }

  public async findRoutes() {
    return this.prisma.metroRoute.findMany({
      include: {
        stations: {
          include: {
            transferFrom: true,
            transferTo: true,
          },
          orderBy: { station_order: 'asc' },
        },
      },
    });
  }
}
