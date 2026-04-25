import prisma from '../../config/prisma';

export class LocationsService {
  async findAll() {
    return prisma.locations.findMany();
  }

  async findById(id: number) {
    return prisma.locations.findUnique({ where: { id } });
  }

  async create(data: any) {
    return prisma.locations.create({ data });
  }

  async update(id: number, data: any) {
    return prisma.locations.update({ where: { id }, data });
  }

  async remove(id: number) {
    return prisma.locations.delete({ where: { id } });
  }
}
