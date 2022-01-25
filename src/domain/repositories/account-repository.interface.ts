import { AccountInterface } from '../entities/IAccount';

export interface AccountRepositoryInterface {
  getByCPF(cpf: string): Promise<AccountInterface>;
  getById(id: string): Promise<AccountInterface>;
}
