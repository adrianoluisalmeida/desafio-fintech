import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Account, AccountDocument } from '../schemas/account.schema';
import { AccountRepositoryInterface } from 'src/domain/repositories/account-repository.interface';
import { CreateAccountRequest } from 'src/presentation/account/requests/create-account.request';

@Injectable()
export class AccountRepository implements AccountRepositoryInterface {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
  ) {}

  async getByCPF(cpf: string): Promise<Account> {
    return this.accountModel.findOne({ cpf }).exec();
  }

  async getById(id: string): Promise<Account> {
    return this.accountModel.findById(id).exec();
  }

  async create(account: CreateAccountRequest): Promise<Account> {
    return this.accountModel.create(account);
  }
}
