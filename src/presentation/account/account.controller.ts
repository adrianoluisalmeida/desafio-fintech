import { Body, Controller, Post } from '@nestjs/common';
import { CreateAccountRequest } from './requests/create-account.request';

@Controller('account')
export class AccountController {
  @Post()
  create(@Body() createAccountRequest: CreateAccountRequest): Promise<any> {
    console.log(createAccountRequest);
    return Promise.resolve(null);
  }
}
