import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateAccountService } from 'src/domain/services/create-account.service';
import { AccountRepository } from 'src/infra/repositories/account.repository';
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
      provide: 'CreateAccountServiceInterface',
      useClass: CreateAccountService,
    },
    {
      provide: 'AccountRepositoryInterface',
      useClass: AccountRepository,
    },
  ],
})
export class AccountModule {}
