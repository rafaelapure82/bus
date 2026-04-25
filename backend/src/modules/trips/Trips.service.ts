import prisma from '../../config/prisma';

export class TripsService {
  async findAll() {
    return prisma.trips.findMany({
      include: {
        fleets: true,
        schedules: true,
        locations_trips_pick_location_idTolocations: true,
        locations_trips_drop_location_idTolocations: true,
        vehicles: true,
        employees: true
      }
    });
  }

  async findById(id: number) {
    return prisma.trips.findUnique({ where: { id } });
  }

  async create(data: any) {
    return prisma.trips.create({ data });
  }

  async update(id: number, data: any) {
    return prisma.trips.update({ where: { id }, data });
  }

  async remove(id: number) {
    return prisma.trips.delete({ where: { id } });
  }
}
