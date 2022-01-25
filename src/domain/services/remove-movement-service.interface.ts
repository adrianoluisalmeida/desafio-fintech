import { AddMovementRequest } from '../../presentation/movement/requests/add-movement.request';

export interface RemoveMovementServiceInterface {
  execute(addMovementRequest: AddMovementRequest): Promise<any>;
}
