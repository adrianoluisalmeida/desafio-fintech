import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreateAccountService } from 'src/domain/services/createAccountService';
import { CreateAccountRequest } from './requests/createAccountRequest';

@Controller('account')
export class AccountController {
  constructor(
    @Inject('ICreateAccountService')
    private readonly createAcountService: CreateAccountService,
  ) {}

  @Post()
  create(@Body() createAccountRequest: CreateAccountRequest): Promise<any> {
    return this.createAcountService.execute(createAccountRequest);
  }
}
