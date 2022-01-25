import { CreateAccountRequest } from 'src/presentation/account/requests/create-account.request';

export interface CreateAccountServiceInterface {
  execute(createAccount: CreateAccountRequest): Promise<any>;
}
