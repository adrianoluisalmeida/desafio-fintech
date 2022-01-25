import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { BalanceMovementService } from 'src/domain/services/balance-movement.service';
import { CreateAccountService } from 'src/domain/services/create-account.service';
import { CreateAccountRequest } from './requests/create-account.request';

@Controller('account')
export class AccountController {
  constructor(
    @Inject('CreateAccountServiceInterface')
    private readonly createAcountService: CreateAccountService,

    @Inject('BalanceMovementServiceInterface')
    private readonly balanceMovementService: BalanceMovementService,
  ) {}

  @Post()
  create(@Body() createAccountRequest: CreateAccountRequest): Promise<any> {
    return this.createAcountService.execute(createAccountRequest);
  }

  @Get(':id/balance')
  getBalance(@Param() { id }: any): Promise<number> {
    return this.balanceMovementService.execute(id);
  }
}
