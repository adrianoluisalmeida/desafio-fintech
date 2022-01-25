import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AddMovementService } from 'src/domain/services/add-movement.service';
import { BalanceMovementService } from 'src/domain/services/balance-movement.service';
import { CreateAccountService } from 'src/domain/services/create-account.service';
import { RemoveMovementService } from 'src/domain/services/remove-movement.service';
import { TransferAccountService } from 'src/domain/services/transfer-account.service';
import { AccountRepository } from 'src/infra/repositories/account.repository';
import { MovementRepository } from 'src/infra/repositories/movement.repository';
import { Account, AccountSchema } from 'src/infra/schemas/account.schema';
import { Movement, MovementSchema } from 'src/infra/schemas/movement.schema';
import { AccountController } from './account.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Account.name,
        schema: AccountSchema,
      },
      {
        name: Movement.name,
        schema: MovementSchema,
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
    {
      provide: 'MovementRepositoryInterface',
      useClass: MovementRepository,
    },
    {
      provide: 'BalanceMovementServiceInterface',
      useClass: BalanceMovementService,
    },
    {
      provide: 'TransferAccountServiceInterface',
      useClass: TransferAccountService,
    },
    {
      provide: 'RemoveMovementServiceInterface',
      useClass: RemoveMovementService,
    },
    {
      provide: 'AddMovementServiceInterface',
      useClass: AddMovementService,
    },
  ],
})
export class AccountModule {}
