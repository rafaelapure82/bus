import prisma from '../../config/prisma';

export class SchedulesService {
  async findAll() {
    return prisma.schedules.findMany();
  }

  async findById(id: number) {
    return prisma.schedules.findUnique({ where: { id } });
  }

  async create(data: any) {
    return prisma.schedules.create({ data });
  }

  async update(id: number, data: any) {
    return prisma.schedules.update({ where: { id }, data });
  }

  async remove(id: number) {
    return prisma.schedules.delete({ where: { id } });
  }
}
