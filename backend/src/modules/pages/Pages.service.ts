import prisma from '../../config/prisma';

export class PagesService {
  async findAll() {
    // Assuming 'adds' or 'abouts' maps to CMS pages based on legacy structure. We'll leave it as an empty mock for now until mapping is verified.
    return [];
  }

  async findById(id: number) {
    return null;
  }

  async create(data: any) {
    return {};
  }

  async update(id: number, data: any) {
    return {};
  }

  async remove(id: number) {
    return true;
  }
}
