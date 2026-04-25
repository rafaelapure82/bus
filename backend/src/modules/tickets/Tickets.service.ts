import prisma from '../../config/prisma';

export class TicketsService {
  async findAll() {
    return prisma.tickets.findMany();
  }

  async findById(id: number) {
    return prisma.tickets.findUnique({ where: { id } });
  }

  async create(data: any) {
    return prisma.tickets.create({ data });
  }

  async update(id: number, data: any) {
    return prisma.tickets.update({ where: { id }, data });
  }

  async remove(id: number) {
    return prisma.tickets.delete({ where: { id } });
  }
}
