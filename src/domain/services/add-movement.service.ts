import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { AccountRepository } from '../../infra/repositories/account.repository';
import { MovementRepository } from '../../infra/repositories/movement.repository';
import { AddMovementRequest } from '../../presentation/movement/requests/add-movement.request';

@Injectable()
export class AddMovementService {
  constructor(
    @Inject('MovementRepositoryInterface')
    private readonly movementRepository: MovementRepository,

    @Inject('AccountRepositoryInterface')
    private readonly accountRepository: AccountRepository,
  ) {}

  async execute(movementRequest: AddMovementRequest): Promise<any> {
    const { accountId, value } = movementRequest;
    const movement = new AddMovementRequest();
    movement.accountId = accountId;
    movement.value = value;

    const errors = await validate(movement);

    if (errors.length > 0)
      throw new UnprocessableEntityException('Invalid input data');

    const accountExists = await this.accountRepository.getById(accountId);

    if (!accountExists)
      throw new UnprocessableEntityException('account does not exist');

    return await this.movementRepository.create(movement);
  }
}
