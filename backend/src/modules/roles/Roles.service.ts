import prisma from '../../config/prisma';

export class RolesService {
  async findAll() {
    return prisma.roles.findMany();
  }

  async findById(id: number) {
    return prisma.roles.findUnique({ where: { id } });
  }

  async create(data: any) {
    return prisma.roles.create({ data });
  }

  async update(id: number, data: any) {
    return prisma.roles.update({ where: { id }, data });
  }

  async remove(id: number) {
    return prisma.roles.delete({ where: { id } });
  }
}
