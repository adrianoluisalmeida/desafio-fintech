import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AddMovementService } from 'src/domain/services/add-movement.service';
import { RemoveMovementService } from 'src/domain/services/remove-movement.service';
import { AccountRepository } from 'src/infra/repositories/account.repository';
import { MovementRepository } from 'src/infra/repositories/movement.repository';
import { Account, AccountSchema } from 'src/infra/schemas/account.schema';
import { Movement, MovementSchema } from 'src/infra/schemas/movement.schema';
import { MovementController } from './movement.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Movement.name,
        schema: MovementSchema,
      },
      {
        name: Account.name,
        schema: AccountSchema,
      },
    ]),
  ],
  controllers: [MovementController],
  providers: [
    {
      provide: 'RemoveMovementServiceInterface',
      useClass: RemoveMovementService,
    },
    {
      provide: 'AddMovementServiceInterface',
      useClass: AddMovementService,
    },
    {
      provide: 'MovementRepositoryInterface',
      useClass: MovementRepository,
    },
    {
      provide: 'AccountRepositoryInterface',
      useClass: AccountRepository,
    },
  ],
})
export class MovementModule {}
