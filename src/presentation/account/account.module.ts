import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateAccountService } from 'src/domain/services/createAccountService';
import { AccountRepository } from 'src/infra/repositories/accountRepository';
import { Account, AccountSchema } from 'src/infra/schemas/account.schema';
import { AccountController } from './account.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Account.name,
        schema: AccountSchema,
      },
    ]),
  ],
  controllers: [AccountController],
  providers: [
    {
      provide: 'ICreateAccountService',
      useClass: CreateAccountService,
    },
    {
      provide: 'IAccountRepository',
      useClass: AccountRepository,
    },
  ],
})
export class AccountModule {}
