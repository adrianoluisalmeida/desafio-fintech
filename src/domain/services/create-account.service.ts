import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { AccountRepository } from '../../infra/repositories/account.repository';
import { CreateAccountRequest } from '../../presentation/account/requests/create-account.request';

@Injectable()
export class CreateAccountService {
  constructor(
    @Inject('AccountRepositoryInterface')
    private readonly accountRepository: AccountRepository,
  ) {}

  async execute(createAccount: CreateAccountRequest): Promise<any> {
    const account = new CreateAccountRequest();
    account.cpf = createAccount.cpf;
    account.name = createAccount.name;

    const errors = await validate(account);

    if (errors.length > 0)
      throw new UnprocessableEntityException('Invalid input data');

    const accountExists = await this.accountRepository.getByCPF(
      createAccount.cpf,
    );

    if (accountExists)
      throw new UnprocessableEntityException('Account already exists');

    return await this.accountRepository.create(createAccount);
  }
}
