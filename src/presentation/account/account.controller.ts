import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { BalanceMovementService } from 'src/domain/services/balance-movement.service';
import { CreateAccountService } from 'src/domain/services/create-account.service';
import { TransferAccountService } from 'src/domain/services/transfer-account.service';
import { CreateAccountRequest } from './requests/create-account.request';
import { TransferAccountRequest } from './requests/transfer-account.request';

@Controller('account')
export class AccountController {
  constructor(
    @Inject('CreateAccountServiceInterface')
    private readonly createAcountService: CreateAccountService,

    @Inject('BalanceMovementServiceInterface')
    private readonly balanceMovementService: BalanceMovementService,

    @Inject('TransferAccountServiceInterface')
    private readonly transferAccountService: TransferAccountService,
  ) {}

  @Post()
  create(@Body() createAccountRequest: CreateAccountRequest): Promise<any> {
    return this.createAcountService.execute(createAccountRequest);
  }

  @Get(':id/balance')
  getBalance(@Param() { id }: any): Promise<number> {
    return this.balanceMovementService.execute(id);
  }

  @Post(':id/transfer')
  transfer(
    @Param() { id }: any,
    @Body() transferAccountRequest: TransferAccountRequest,
  ): Promise<boolean> {
    return this.transferAccountService.execute(id, transferAccountRequest);
  }
}
