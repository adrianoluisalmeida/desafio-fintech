import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AddMovementService } from 'src/domain/services/add-movement.service';
import { RemoveMovementService } from 'src/domain/services/remove-movement.service';
import { AddMovementRequest } from './requests/add-movement.request';

@Controller('movement')
export class MovementController {
  constructor(
    @Inject('AddMovementServiceInterface')
    private readonly addMovementService: AddMovementService,

    @Inject('RemoveMovementServiceInterface')
    private readonly removeMovementService: RemoveMovementService,
  ) {}

  @Post('add')
  add(@Body() addMovementRequest: AddMovementRequest): Promise<any> {
    return this.addMovementService.execute(addMovementRequest);
  }

  @Post('remove')
  remove(@Body() addMovementRequest: AddMovementRequest): Promise<any> {
    return this.removeMovementService.execute(addMovementRequest);
  }
}
