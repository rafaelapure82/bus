import prisma from '../../config/prisma';

export class BlogsService {
  async findAll() {
    return prisma.blogs.findMany();
  }

  async findById(id: number) {
    return prisma.blogs.findUnique({ where: { id } });
  }

  async create(data: any) {
    return prisma.blogs.create({ data });
  }

  async update(id: number, data: any) {
    return prisma.blogs.update({ where: { id }, data });
  }

  async remove(id: number) {
    return prisma.blogs.delete({ where: { id } });
  }
}
