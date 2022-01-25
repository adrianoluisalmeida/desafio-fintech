import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreateAccountService } from 'src/domain/services/create-account.service';
import { CreateAccountRequest } from './requests/create-account.request';

@Controller('account')
export class AccountController {
  constructor(
    @Inject('CreateAccountServiceInterface')
    private readonly createAcountService: CreateAccountService,
  ) {}

  @Post()
  create(@Body() createAccountRequest: CreateAccountRequest): Promise<any> {
    return this.createAcountService.execute(createAccountRequest);
  }
}
