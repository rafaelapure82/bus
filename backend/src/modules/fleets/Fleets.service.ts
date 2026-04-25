import prisma from '../../config/prisma';

export class FleetsService {
  async findAll() {
    return prisma.fleets.findMany();
  }

  async findById(id: number) {
    return prisma.fleets.findUnique({ where: { id } });
  }

  async create(data: any) {
    return prisma.fleets.create({ data });
  }

  async update(id: number, data: any) {
    return prisma.fleets.update({ where: { id }, data });
  }

  async remove(id: number) {
    return prisma.fleets.delete({ where: { id } });
  }
}
