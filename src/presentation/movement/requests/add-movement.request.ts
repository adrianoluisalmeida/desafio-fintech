import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class AddMovementRequest {
  @ApiProperty({
    description: 'AccountId to deposit',
    example: 'hash-uuid',
  })
  @IsNotEmpty()
  @IsMongoId()
  accountId: string;

  @ApiProperty({
    description: 'Value to deposit',
    example: 10000,
  })
  @IsNotEmpty()
  value: number;
}
