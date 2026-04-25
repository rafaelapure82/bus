import prisma from '../../config/prisma';

export class TaxesService {
  async findAll() {
    return prisma.taxes.findMany();
  }

  async findById(id: number) {
    return prisma.taxes.findUnique({ where: { id } });
  }

  async create(data: any) {
    return prisma.taxes.create({ data });
  }

  async update(id: number, data: any) {
    return prisma.taxes.update({ where: { id }, data });
  }

  async remove(id: number) {
    return prisma.taxes.delete({ where: { id } });
  }
}
