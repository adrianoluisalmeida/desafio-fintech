import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MovementRepositoryInterface } from 'src/domain/repositories/movement-repository.interface';
import { AddMovementRequest } from 'src/presentation/movement/requests/add-movement.request';
import { Movement, MovementDocument } from '../schemas/movement.schema';

@Injectable()
export class MovementRepository implements MovementRepositoryInterface {
  constructor(
    @InjectModel(Movement.name) private movementModel: Model<MovementDocument>,
  ) {}

  async create(movement: AddMovementRequest): Promise<Movement> {
    return this.movementModel.create(movement);
  }

  async balanceByAccountId(accountId: string): Promise<number> {
    const amountResult = await this.movementModel
      .aggregate([
        { $match: { accountId } },
        {
          $group: {
            _id: null,
            balance: { $sum: '$value' },
          },
        },
      ])
      .exec();

    return amountResult[0]?.balance || 0;
  }
}
