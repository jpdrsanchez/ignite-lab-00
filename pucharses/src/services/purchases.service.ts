import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

interface CreatePurchaseParams {
  curstomerId: string;
  productId: string;
}

@Injectable()
export class PurchasesService {
  constructor(private readonly prisma: PrismaService) {}

  async listAllPurchases() {
    return this.prisma.purchase.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async listAllPurchasesFromCustomer(customerId: string) {
    return this.prisma.purchase.findMany({
      where: {
        customerId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async createPurchases(params: CreatePurchaseParams) {
    await this.prisma.product.findUniqueOrThrow({
      where: { id: params.productId },
    });

    return this.prisma.purchase.create({
      data: {
        customerId: params.curstomerId,
        productId: params.productId,
      },
    });
  }
}
