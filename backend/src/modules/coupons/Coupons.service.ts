import prisma from '../../config/prisma';

export class CouponsService {
  async findAll() {
    return prisma.coupons.findMany();
  }

  async findById(id: number) {
    return prisma.coupons.findUnique({ where: { id } });
  }

  async create(data: any) {
    return prisma.coupons.create({ data });
  }

  async update(id: number, data: any) {
    return prisma.coupons.update({ where: { id }, data });
  }

  async remove(id: number) {
    return prisma.coupons.delete({ where: { id } });
  }
}
