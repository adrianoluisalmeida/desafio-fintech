import { AccountInterface } from '../entities/account.interface';
export interface AccountRepositoryInterface {
  getByCPF(cpf: string): Promise<AccountInterface>;
  getById(id: string): Promise<AccountInterface>;
}
