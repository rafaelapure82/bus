import prisma from '../../config/prisma';

export class PaymethodsService {
  async findAll() {
    return prisma.paymethods.findMany();
  }

  async findById(id: number) {
    return prisma.paymethods.findUnique({ where: { id } });
  }

  async create(data: any) {
    return prisma.paymethods.create({ data });
  }

  async update(id: number, data: any) {
    return prisma.paymethods.update({ where: { id }, data });
  }

  async remove(id: number) {
    return prisma.paymethods.delete({ where: { id } });
  }
}
