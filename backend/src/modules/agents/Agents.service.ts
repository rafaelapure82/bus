import prisma from '../../config/prisma';

export class AgentsService {
  async findAll() {
    return prisma.agents.findMany();
  }

  async findById(id: number) {
    return prisma.agents.findUnique({ where: { id } });
  }

  async create(data: any) {
    return prisma.agents.create({ data });
  }

  async update(id: number, data: any) {
    return prisma.agents.update({ where: { id }, data });
  }

  async remove(id: number) {
    return prisma.agents.delete({ where: { id } });
  }
}
