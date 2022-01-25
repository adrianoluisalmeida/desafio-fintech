import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { AccountRepository } from 'src/infra/repositories/account.repository';
import { MovementRepository } from 'src/infra/repositories/movement.repository';
import { AddMovementRequest } from 'src/presentation/movement/requests/add-movement.request';
import { BalanceMovementService } from './balance-movement.service';

@Injectable()
export class RemoveMovementService {
  constructor(
    @Inject('MovementRepositoryInterface')
    private readonly movementRepository: MovementRepository,

    @Inject('AccountRepositoryInterface')
    private readonly accountRepository: AccountRepository,

    @Inject('BalanceMovementServiceInterface')
    private readonly balanceMovementService: BalanceMovementService,
  ) {}

  async execute(movementRequest: AddMovementRequest): Promise<any> {
    const { accountId, value } = movementRequest;
    const movement = new AddMovementRequest();
    movement.accountId = accountId;
    movement.value = value * -1;

    const errors = await validate(movement);

    if (errors.length > 0)
      throw new UnprocessableEntityException('Invalid input data');

    const accountExists = await this.accountRepository.getById(accountId);

    if (!accountExists)
      throw new UnprocessableEntityException('account does not exist');

    const balanceAccount = await this.balanceMovementService.execute(accountId);

    if (balanceAccount - value < 0) {
      throw new UnprocessableEntityException(
        'Insufficient funds for the transaction',
      );
    }

    return await this.movementRepository.create(movement);
  }
}
