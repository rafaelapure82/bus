import prisma from '../../config/prisma';

export class RatingsService {
  async findAll() {
    return prisma.ratings.findMany();
  }

  async findById(id: number) {
    return prisma.ratings.findUnique({ where: { id } });
  }

  async create(data: any) {
    return prisma.ratings.create({ data });
  }

  async update(id: number, data: any) {
    return prisma.ratings.update({ where: { id }, data });
  }

  async remove(id: number) {
    return prisma.ratings.delete({ where: { id } });
  }
}
