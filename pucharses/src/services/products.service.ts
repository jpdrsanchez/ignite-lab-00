import { Injectable } from '@nestjs/common';
import slugify from 'slugify';
import { PrismaService } from 'src/database/prisma/prisma.service';

interface CreateProductParams {
  title: string;
}

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async listAllProducts() {
    return this.prisma.product.findMany();
  }

  async getProductById(id: string) {
    return this.prisma.product.findUnique({ where: { id } });
  }

  async createProduct(params: CreateProductParams) {
    const slug = slugify(params.title, { lower: true });

    const productWithSameSlug = await this.prisma.product.findUnique({
      where: {
        slug,
      },
    });
    if (productWithSameSlug)
      return new Error('A product with same slug already exists');

    return this.prisma.product.create({
      data: {
        title: params.title,
        slug,
      },
    });
  }
}
