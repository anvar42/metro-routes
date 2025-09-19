import { Injectable, NotFoundException } from '@nestjs/common';
import { MetroRepository } from './metro.repository';
import { Language } from 'src/base';
import { DirectionResponse } from './metro.types';

@Injectable()
export class MetroService {
  constructor(private readonly metroRepository: MetroRepository) {}

  public async findAllStations(lang: Language) {
    const routeStations = await this.metroRepository.findAllStations(lang);

    return routeStations.map((route) => ({
      id: route.id,
      name: route.translation[0]?.name || route.name,
      stations: route.Stations.map((station) => ({
        id: station.id,
        name: station.translation[0]?.name,
        isTransfer: station.isTransfer,
      })),
    }));
  }

  public async findDirections(from: string, to: string, lang: Language) {
    const [fromStation, toStation] = await Promise.all([
      this.metroRepository.findStation(from, lang),
      this.metroRepository.findStation(to, lang),
    ]);

    if (!fromStation) {
      throw new NotFoundException('From station not found');
    }

    if (!toStation) {
      throw new NotFoundException('To station not found');
    }

    if (fromStation.metro_route_id === toStation.metro_route_id) {
      return this.findSameRoute(from, to, lang);
    }

    const graph = await this.buildGraph();

    const path = await this.findShortestPathBFS(graph, from, to);

    if (!path || path.length === 0) {
      throw new NotFoundException('Path not found between stations');
    }
  }

  private async findSameRoute(from_id: string, to_id: string, lang: Language) {
    const stations = await this.metroRepository.getSameLineDirections(
      from_id,
      lang,
    );

    const fromIndex = stations.findIndex((s) => s.id === from_id);
    const toIndex = stations.findIndex((s) => s.id === to_id);

    if (fromIndex === -1 || toIndex === -1) {
      throw new NotFoundException('Stations not found in the same line');
    }

    const directionStations =
      fromIndex < toIndex
        ? stations.slice(fromIndex, toIndex + 1)
        : stations.slice(toIndex, fromIndex + 1).reverse();

    const directions: DirectionResponse[] = directionStations.map(
      (station, index) => ({
        id: station.id,
        name: station.translation[0]?.name,
        forwarding: station.transferFrom.length > 0,
        forward:
          station.transferFrom.length > 0
            ? station.transferFrom[0]?.toStation.translation[0]?.name
            : '',
        in: index === 0,
        out: index === directionStations.length - 1,
      }),
    );

    return { directions };
  }

  private async findShortestPathBFS(
    graph: Map<string, string[]>,
    from: string,
    to: string,
  ) {
    if (!graph.has(from) || !graph.has(to)) {
      return [];
    }

    const queue: string[] = [from];
    const visited = new Set<string>([from]);
    const parent = new Map<string, string>();

    while (queue.length > 0) {
      const current = queue.shift()!;

      if (current === to) {
        return this.reconstructPath(parent, from, to);
      }

      const neighbors = graph.get(current) || [];
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          parent.set(neighbor, current);
          queue.push(neighbor);
        }
      }
    }

    return [];
  }

  private async buildGraph(): Promise<Map<string, string[]>> {
    const graph = new Map<string, string[]>();

    const routes = await this.metroRepository.findRoutes();

    for (const route of routes) {
      const stations = route.Stations;

      for (let i = 0; i < stations.length; i++) {
        const station = stations[i];
        const neighbors: string[] = [];

        if (i > 0) {
          neighbors.push(stations[i - 1].id);
        }

        if (i < stations.length - 1) {
          neighbors.push(stations[i + 1].id);
        }

        for (const transfer of station.transferFrom) {
          neighbors.push(transfer.to_station_id);
        }

        for (const transfer of station.transferTo) {
          neighbors.push(transfer.from_station_id);
        }

        graph.set(station.id, neighbors);
      }
    }
    return graph;
  }

  private reconstructPath(
    parent: Map<string, string>,
    start: string,
    end: string,
  ): string[] {
    const path: string[] = [];
    let current = end;

    while (current !== start) {
      path.unshift(current);
      current = parent.get(current)!;

      if (path.length > 100) {
        return [];
      }
    }

    path.unshift(start);
    return path;
  }
}
