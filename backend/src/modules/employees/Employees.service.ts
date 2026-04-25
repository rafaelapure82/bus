import prisma from '../../config/prisma';

export class EmployeesService {
  async findAll() {
    return prisma.employees.findMany({
      include: {
        country: true,
        employeetypes: true
      }
    });
  }

  async findById(id: number) {
    return prisma.employees.findUnique({ where: { id } });
  }

  async create(data: any) {
    return prisma.employees.create({ data });
  }

  async update(id: number, data: any) {
    return prisma.employees.update({ where: { id }, data });
  }

  async remove(id: number) {
    return prisma.employees.delete({ where: { id } });
  }
}
