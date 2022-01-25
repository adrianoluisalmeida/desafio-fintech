import {
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AccountRepository } from '../../infra/repositories/account.repository';
import { TransferAccountRequest } from '../../presentation/account/requests/transfer-account.request';
import { AddMovementService } from './add-movement.service';
import { BalanceMovementService } from './balance-movement.service';
import { RemoveMovementService } from './remove-movement.service';

@Injectable()
export class TransferAccountService {
  constructor(
    @Inject('AccountRepositoryInterface')
    private readonly accountRepository: AccountRepository,

    @Inject('AddMovementServiceInterface')
    private readonly addMovementService: AddMovementService,

    @Inject('RemoveMovementServiceInterface')
    private readonly removeMovementService: RemoveMovementService,

    @Inject('BalanceMovementServiceInterface')
    private readonly balanceMovementService: BalanceMovementService,
  ) {}

  async execute(
    accountId: string,
    transferAccountRequest: TransferAccountRequest,
  ): Promise<boolean> {
    const { accountId: destinationAccountId, value } = transferAccountRequest;

    if (!accountId)
      throw new UnprocessableEntityException('Account number not informed');

    const accountExists = await this.accountRepository.getById(accountId);

    if (!accountExists)
      throw new UnprocessableEntityException('Origin account does not exist');

    const destinationExists = await this.accountRepository.getById(
      destinationAccountId,
    );

    if (!destinationExists)
      throw new UnprocessableEntityException(
        'Destination account does not exist',
      );

    const balanceAccount = await this.balanceMovementService.execute(accountId);

    if (balanceAccount < value) {
      throw new UnprocessableEntityException(
        'Insufficient funds for the transaction',
      );
    }

    try {
      this.removeMovementService.execute({ accountId, value });
      this.addMovementService.execute({
        accountId: destinationAccountId,
        value,
      });
    } catch (error) {
      throw new NotFoundException(error);
    }

    return true;
  }
}
