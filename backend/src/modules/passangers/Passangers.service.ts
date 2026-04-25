import prisma from '../../config/prisma';

export class PassangersService {
  async findAll() {
    return prisma.passangers.findMany();
  }

  async findById(id: number) {
    return prisma.passangers.findUnique({ where: { id } });
  }

  async create(data: any) {
    return prisma.passangers.create({ data });
  }
}
