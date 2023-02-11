import { UseGuards } from '@nestjs/common';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { AuthUser, CurrentUser } from 'src/http/auth/current-user';
import { CustomersService } from 'src/services/customers.service';
import { PurchasesService } from 'src/services/purchases.service';
import { Customer } from '../models/customer.model';

@Resolver(() => Customer)
export class CustomersResolver {
  constructor(
    private readonly pucharsesService: PurchasesService,
    private readonly cusrtomersService: CustomersService,
  ) {}

  @Query(() => Customer)
  @UseGuards(AuthorizationGuard)
  me(@CurrentUser() user: AuthUser) {
    return this.cusrtomersService.getCustomerByAuthUserId(user.sub);
  }

  @ResolveField()
  purchases(@Parent() me: Customer) {
    return this.pucharsesService.listAllPurchasesFromCustomer(me.id);
  }
}
