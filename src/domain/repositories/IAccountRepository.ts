import { IAccount } from '../entities/IAccount';

export interface IAccountRepository {
  getByCPF(cpf: string): Promise<IAccount>;
  getById(id: string): Promise<IAccount>;
}
