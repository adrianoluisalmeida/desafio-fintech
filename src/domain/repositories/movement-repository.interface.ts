import { AddMovementRequest } from 'src/presentation/movement/requests/add-movement.request';
import { MovementInterface } from '../entities/movement.interface';

export interface MovementRepositoryInterface {
  create(movement: AddMovementRequest): Promise<MovementInterface>;
  balanceByAccountId(accountId: string): Promise<number>;
}
