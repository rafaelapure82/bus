import prisma from '../../config/prisma';

export class TripsService {
  async findAll() {
    return prisma.trips.findMany();
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
