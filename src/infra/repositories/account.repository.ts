import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from './base.repository';
import { Account, AccountDocument } from '../schemas/account.schema';
import { AccountRepositoryInterface } from 'src/domain/repositories/account-repository.interface';

@Injectable()
export class AccountRepository
  extends BaseRepository<AccountDocument>
  implements AccountRepositoryInterface
{
  constructor(
    @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
  ) {
    super(accountModel);
  }

  async getByCPF(cpf: string): Promise<Account> {
    return this.accountModel.findOne({ cpf }).exec();
  }

  async getById(id: string): Promise<Account> {
    return this.accountModel.findById(id).exec();
  }
}
