import prisma from '../../config/prisma';

export class InquiriesService {
  async findAll() {
    return prisma.inquiries.findMany();
  }

  async findById(id: number) {
    return prisma.inquiries.findUnique({ where: { id } });
  }

  async create(data: any) {
    return prisma.inquiries.create({ data });
  }

  async update(id: number, data: any) {
    return prisma.inquiries.update({ where: { id }, data });
  }

  async remove(id: number) {
    return prisma.inquiries.delete({ where: { id } });
  }
}
