import { CreateAccountRequest } from 'src/presentation/account/requests/createAccountRequest';

export interface ICreateAccountService {
  execute(createAccount: CreateAccountRequest): Promise<any>;
}
