import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AccountRepository } from '../../infra/repositories/account.repository';
import { MovementRepository } from '../../infra/repositories/movement.repository';

@Injectable()
export class BalanceMovementService {
  constructor(
    @Inject('AccountRepositoryInterface')
    private readonly accountRepository: AccountRepository,

    @Inject('MovementRepositoryInterface')
    private readonly movementRepository: MovementRepository,
  ) {}

  async execute(accountId: string): Promise<number> {
    if (!accountId)
      throw new UnprocessableEntityException('Account number not informed');

    const accountExists = await this.accountRepository.getById(accountId);

    if (!accountExists)
      throw new UnprocessableEntityException('Account does not exist');

    return await this.movementRepository.balanceByAccountId(accountId);
  }
}
