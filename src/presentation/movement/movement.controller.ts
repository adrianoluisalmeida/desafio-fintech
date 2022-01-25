import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AddMovementService } from 'src/domain/services/add-movement.service';
import { AddMovementRequest } from './requests/add-movement.request';

@Controller('movement')
export class MovementController {
  constructor(
    @Inject('AddMovementServiceInterface')
    private readonly addMovementService: AddMovementService,
  ) {}

  @Post('add')
  create(@Body() addMovementRequest: AddMovementRequest): Promise<any> {
    return this.addMovementService.execute(addMovementRequest);
  }
}
