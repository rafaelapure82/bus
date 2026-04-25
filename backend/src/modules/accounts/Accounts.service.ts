import prisma from '../../config/prisma';

export class AccountsService {
  async findAll() {
    return prisma.accounts.findMany();
  }

  async findById(id: number) {
    return prisma.accounts.findUnique({ where: { id } });
  }

  async create(data: any) {
    return prisma.accounts.create({ data });
  }

  async update(id: number, data: any) {
    return prisma.accounts.update({ where: { id }, data });
  }

  async remove(id: number) {
    return prisma.accounts.delete({ where: { id } });
  }
}
