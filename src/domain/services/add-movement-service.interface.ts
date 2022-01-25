import { AddMovementRequest } from 'src/presentation/movement/requests/add-movement.request';

export interface AddMovementServiceInterface {
  execute(addMovementRequest: AddMovementRequest): Promise<any>;
}
