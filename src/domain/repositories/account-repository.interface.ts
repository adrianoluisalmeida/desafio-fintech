import { CreateAccountRequest } from 'src/presentation/account/requests/create-account.request';
import { AccountInterface } from '../entities/account.interface';
export interface AccountRepositoryInterface {
  getByCPF(cpf: string): Promise<AccountInterface>;
  getById(id: string): Promise<AccountInterface>;
  create(account: CreateAccountRequest): Promise<AccountInterface>;
}
