import prisma from '../../config/prisma';

export class VehiclesService {
  async findAll() {
    return prisma.vehicles.findMany({
      include: {
        fleets: true
      }
    });
  }

  async findById(id: number) {
    return prisma.vehicles.findUnique({ where: { id }, include: { fleets: true } });
  }

  async create(data: any) {
    return prisma.vehicles.create({ data });
  }

  async update(id: number, data: any) {
    return prisma.vehicles.update({ where: { id }, data });
  }

  async remove(id: number) {
    return prisma.vehicles.delete({ where: { id } });
  }
}
